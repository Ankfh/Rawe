import { getBookById } from "../../uploadFile/services/bookMetadataService.js";

const PYTHON_BACKEND_URL =
  process.env.PYTHON_BACKEND_URL || "http://python-backend:8000";

export const aiChatController = async (req, res) => {
  const { bookId } = req.params;
  const { question } = req.body;
  const userId = req.user.id;
  console.log(question, "question");
  console.log(userId, "userId");
  if (!question) {
    return res.status(400).json({
      success: false,
      message: "Question is required.",
    });
  }

  try {
    // 1. Verify book existence and ownership
    const book = await getBookById(bookId);
    console.log(book, "book");
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    if (String(book.userId) !== String(userId)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to query this book.",
      });
    }
    console.log(
      String(book.userId) !== String(userId),
      "String(book.userId) !== String(userId)",
    );

    if (book.processingStatus !== "completed") {
      return res.status(400).json({
        success: false,
        message:
          "Book is not ready for AI chat yet. Current status: " +
          book.processingStatus,
      });
    }
    console.log(book.processingStatus, "book.processingStatus");
    // 2. Call the Python AI service
    const pythonUrl = `${PYTHON_BACKEND_URL}/api/vectorization/ask`;
    const response = await fetch(pythonUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId,
        question,
      }),
    });
    console.log(response.ok, "response.ok");

    if (!response.ok) {
      throw new Error("AI Engine responded with an error.");
    }

    const data = await response.json();

    // 3. Return the AI results
    return res.status(200).json({
      success: true,
      answer: data.answer,
      context: data.context,
    });
  } catch (error) {
    console.error("[AI][CHAT] Error in AI Proxy:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to get an answer from the AI engine.",
    });
  }
};
