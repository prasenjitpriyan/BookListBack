const { response } = require("express");
const Book = require("../models/BookModel");

// = Controller for Get All Books from database.
exports.findAll = async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}

// = Controller for Get One Book from database by id.
exports.getBook = async (request, response) => {
    try {
        const { id } = request.params;
        const books = await Book.findById(id);
        return response.status(200).json(books)
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}

// = Controller for Save a new book
exports.addBook = async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book)
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
};

// = Controller for update a Book
exports.updateBook = async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            })
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body)

        if (!result) {
            return response.status(404).json({ message: "Book not found" })
        }
        return response.status(200).send({ message: "Book updated successfully" })
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}

// = Controller for Delete a Book
exports.deleteBook = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id)
        if (!result) {
            return response.status(404).json({ message: "Book not found" })
        }
        return response.status(200).send({ message: "Book deleted successfully" })
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}