const express = require("express");

const {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteBook,
} = require("./controllers");
const passport = require("passport");

const booksRouter = express.Router();

booksRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllBooks
);

booksRouter.get("/:id", getOneBook);

booksRouter.post("/", createBook);

booksRouter.put("/:id", updateBook);

booksRouter.delete("/:id", deleteBook);

module.exports = booksRouter;
