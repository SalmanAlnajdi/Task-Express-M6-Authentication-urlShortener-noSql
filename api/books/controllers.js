const notFound = require("../../middlewares/notFoundHandler");
const Book = require("../../models/Book");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (error) {
    return next(error);
  }
};

const getOneBook = async (req, res, next) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);
    if (book) {
      return res.status(200).json(book);
    } else {
      return notFound();
    }
  } catch (error) {
    return next(error);
  }
};

const createBook = async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body);
    return res.status(201).json(newBook);
  } catch (error) {
    return next(error);
  }
};

const updateBook = async (req, res, next) => {
  const id = req.params.id;
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);
    return res.status(200).json(updatedBook);
  } catch (error) {
    return next(error);
  }
};

const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Book.findByIdAndDelete(id);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteBook,
};
