const { server } = require("@hapi/hapi");
const Booklist  = require ("../models/booklist.model.js");
const Joi = require("joi");


module.exports = (server) =>{
    
    //definera router
    server.route([{ 
        //hämta ut alla data
        method: 'GET',   
        path: '/booklist',
        handler: async (request, h)  => {
            try {
                return await Booklist.find();
            }catch(error){
                return h.response("There was an error" + error).code(500);
            }
        }
    },
    {
        //hämta ut en en rad från tabellen passerat på ett givet värde  från url
        method: 'GET',
        path: '/booklist/{title}', // vi anger id i URL:en
        handler: async (request, h) => {
        const booklistTitle = request.params.title;

            try {
            const booklistTitle = await Booklist.findOne({ title: booklistTitle });

            if (!booklist) {
                return h.response("Booklist not found").code(404);
              }
 
               return booklist; // skickar tillbaka produkten som JSON
           } catch (error) {
               return h.response("There was an error: " + error).code(500);
           }
        }
    },
    {
        // lägg till data i tabellen
        method: 'POST',
        path: '/booklist',
        options: {
        validate: {
            payload: Joi.object({
                isbn: Joi.string().min(5).max(20).required(),
                title: Joi.string().min(5).max(80).required(),
                author: Joi.string().min(3).required(),
                year: Joi.number().min(1800).max(new Date().getFullYear()).required(),
                readStatus: Joi.boolean().optional()
            }),
            //failAction ger exakt vad som är felet
            failAction: (request, h, err) => {
                throw err;
            }
        }
    },
        handler: async (request, h)  => {
            try {
                const booklist = new Booklist(request.payload);
                return await booklist.save();
            }catch(error){
                return h.response("There was an error" + error).code(500);
            }
        }
    },
    {
        //Uppdatera data för en rad med ett givet id.
        method: 'PUT', 
        path: '/booklist/{title}', // vi skickar namnet i URL:en
        options: {
        validate: {
            payload: Joi.object({
                title: Joi.string().min(5).max(80).required(),
                author: Joi.string().min(3).required(),
                year: Joi.number().min(1800).max(new Date().getFullYear()).required(),
                readStatus: Joi.boolean().optional()
            }),
            failAction: (request, h, err) => {
                throw err;
            }
        }
         },
        handler: async (request, h) => {
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
    }, 
    {
        //radera en rad i tabellen med ett givet id
        method: 'DELETE',
        path: '/booklist/{title}',
        handler: async (request, h) => {
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
}

])
}