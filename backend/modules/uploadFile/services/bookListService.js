import mongoose from 'mongoose';
import BookModel from '../model/bookModel.js';

const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 50;

const encodeCursor = ({ uploadedAt, id }) => {
  return Buffer.from(
    JSON.stringify({
      uploadedAt,
      id,
    })
  ).toString('base64');
};

const decodeCursor = cursor => {
  try {
    const decoded = Buffer.from(cursor, 'base64').toString('utf8');
    const parsed = JSON.parse(decoded);

    if (!parsed?.uploadedAt || !parsed?.id) {
      throw new Error('Invalid cursor payload');
    }

    const uploadedAtDate = new Date(parsed.uploadedAt);

    if (Number.isNaN(uploadedAtDate.getTime())) {
      throw new Error('Invalid uploadedAt in cursor');
    }

    if (!mongoose.Types.ObjectId.isValid(parsed.id)) {
      throw new Error('Invalid id in cursor');
    }

    return {
      uploadedAt: uploadedAtDate,
      id: parsed.id,
    };
  } catch (_error) {
    throw new Error('Invalid cursor');
  }
};

export const getBooksCursorPaginated = async ({ userId, limit, cursor }) => {
  const parsedLimit = Math.min(Math.max(Number(limit) || DEFAULT_LIMIT, 1), MAX_LIMIT);
  const query = { userId };

  if (cursor) {
    const decodedCursor = decodeCursor(cursor);

    query.$or = [
      {
        userId,
        uploadedAt: { $lt: decodedCursor.uploadedAt },
      },
      {
        userId,
        uploadedAt: decodedCursor.uploadedAt,
        _id: { $lt: decodedCursor.id },
      },
    ];
    delete query.userId;
  }

  const records = await BookModel.find(query)
    .sort({ uploadedAt: -1, _id: -1 })
    .limit(parsedLimit + 1)
    .lean();

  const hasMore = records.length > parsedLimit;
  const books = hasMore ? records.slice(0, parsedLimit) : records;

  const nextCursor = hasMore
    ? encodeCursor({
        uploadedAt: books[books.length - 1].uploadedAt,
        id: books[books.length - 1]._id,
      })
    : null;

  return {
    books,
    pagination: {
      limit: parsedLimit,
      hasMore,
      nextCursor,
    },
  };
};
