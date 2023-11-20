const express = require("express");
const router = express.Router();
const BookController = require("../controllers/BookController");

router.get("/", BookController.findAll);
router.get("/:id", BookController.getBook);
router.post("/", BookController.addBook);
router.patch("/:id", BookController.updateBook)
router.delete("/:id", BookController.deleteBook)

module.exports = router;
