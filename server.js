'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require("mongoose");
require("dotenv").config();

const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
        cors: {
            origin: ['*'] // Detta tillåter Vue-appen att prata med API
        }
    }
    });

  // Vänta på att Mongoose faktiskt ansluter innan vi går vidare
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1); // Stoppa om vi inte får kontakt med databasen
    }
    

    
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