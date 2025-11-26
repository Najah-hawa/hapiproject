const { server } = require("@hapi/hapi");
const Booklist  = require ("../models/booklist.model.js");
const Joi = require("joi");

exports.getAllBooklist = async (request, h)  => {
            try {
                return await Booklist.find();
            }catch(error){
                return h.response("There was an error" + error).code(500);
            }
        }


exports.getBookByTitle = async (request, h) => {
        const booklistTitle = request.params.title;

            try {
            const book = await Booklist.findOne({ title: booklistTitle });

            if (!book) {
                return h.response("Booklist not found").code(404);
              }
 
               return book; // skickar tillbaka produkten som JSON
           } catch (error) {
               return h.response("There was an error: " + error).code(500);
           }
        }

exports.addBook = async (request, h)  => {
            try {
                const booklist = new Booklist(request.payload);
                return await booklist.save();
            }catch(error){
                return h.response("There was an error" + error).code(500);
            }
        }


    
exports.updateBook = async (request, h) => {
        const booklistTitle = request.params.title; //sparar värdet vi fått från url 
        const updateData = request.payload; // det vi vill uppdatera

        try {
            const updatedBooklist = await Booklist.findOneAndUpdate(
                { title: booklistTitle },   // hitta produkten
                updateData,              // uppdatera med nya värden
                { new: true }            // returnera den uppdaterade produkten
            );

            if (!updatedBooklist) {
                return h.response("Booklist not found").code(404);
            }

            return updatedBooklist;
        } catch (error) {
            return h.response("There was an error: " + error).code(500);
        }
    }


exports.deleteBook =  async (request, h) => {
        const booklistTitle = request.params.title;

        try {
            const deletedBooklist = await Booklist.findOneAndDelete({ title: booklistTitle });

            if (!deletedBooklist) {
                return h.response("Booklist not found").code(404);
            }
            return h.response("Booklist deleted successfully").code(200);
        } catch (error) {
            return h.response("There was an error: " + error).code(500);
        }
    }