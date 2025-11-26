'use strict';

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
    

    
    require("./routers/booklist.route") (server);


    // Start the server
    await server.start();
    console.log('Server running at:', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();