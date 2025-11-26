const booklistController = require ("../controllers/booklist.controller")
const Joi = require("joi");
module.exports = (server) =>{
    
    //definera router
    server.route([{ 
        //hämta ut alla data
        method: 'GET',   
        path: '/booklist',
        handler: booklistController.getAllBooklist
    },
    {
        //hämta ut en en rad från tabellen passerat på ett givet värde  från url
        method: 'GET',
        path: '/booklist/{title}', // vi anger id i URL:en
        handler: booklistController.getBookByTitle
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
        handler: booklistController.addBook
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
        handler: booklistController.updateBook
    }, 
    {
        //radera en rad i tabellen med ett givet id
        method: 'DELETE',
        path: '/booklist/{title}',
        handler: booklistController.deleteBook
}

])
}