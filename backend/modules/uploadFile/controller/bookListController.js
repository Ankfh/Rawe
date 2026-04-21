import { getBooksCursorPaginated } from '../services/bookListService.js';

export const getBooksListController = async (req, res) => {
  try {
    const { limit = 5, cursor } = req.query;

    const result = await getBooksCursorPaginated({
      userId: req.user.id,
      limit,
      cursor,
    });

    return res.status(200).json({
      success: true,
      message: 'Books fetched successfully.',
      data: result.books,
      pagination: result.pagination,
    });
  } catch (error) {
    if (error.message === 'Invalid cursor') {
      return res.status(400).json({
        success: false,
        message: 'Invalid cursor value provided.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch books list.',
    });
  }
};
