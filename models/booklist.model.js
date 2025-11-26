const mongoose = require("mongoose");

//hämta aktuell år
const currentYear = new Date().getFullYear();

    //Model
    const BooklistSchema = mongoose.Schema( {
        isbn: {
        type: String,
        required: [true, "ISBN is required"],
        unique: [true, "ISBN is unique"],
        minlength: [5, "ISBN must be at least 5 characters"],
        maxlength: [20, "ISBN must be at most 20 characters"]
        },
        title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [5, "Title must be at least 5 characters"],
        maxlength: [80, "Title must be at most 80 characters"]
        },
        author: {
        type: String,
        required: [true, "Author is required"],
        minlength: [3, "Author must be at least 3 characters"]
        },
        year: {
        type: Number,
        required: [true, "Year is required"],
        min: [1800, "Year cannot be before 1800"],
        max: [currentYear, `Year cannot be after ${currentYear}`]
        },
        readStatus: {
        type: Boolean,
        default: false
        }
    });

const Booklist =mongoose.model("Booklist", BooklistSchema);
module.exports = Booklist;

