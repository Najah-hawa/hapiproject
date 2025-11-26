
const Hapi = require('@hapi/hapi');
const mongoose = require("mongoose");
require("dotenv").config();


const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    });

        //connect to Mongodb
    mongoose.connect(process.env.DATABASE).then(() => {
        console.log("Coonected to MongoDb");
    }).catch((error) => {
        console.error("error connecting to database:" + error);
    });
     

       //Model 
    const Booklist = mongoose.model("Booklist", {
        isbn:String, 
        title: String, 
        author: String, 
        year: Number,
        readStatus:Boolean

    })


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
    },{ 
        //hämta ut alla data
        method: 'POST',
        path: '/booklist',
        handler: async (request, h)  => {
            try {
                const booklist = new Booklist(request.payload);
                return await booklist.save();
            }catch(error){
                return h.response("There was an error" + error).code(500);
            }
        }
    }
]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();