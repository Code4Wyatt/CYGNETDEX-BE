import express from 'express';
import listEndpoints from 'express-list-endpoints';
import { connectDb } from './utils/db/index.js';
import cors from "cors";

const whiteList = [process.env.FE_LOCAL_URL, process.env.FE_REMOTE_URL];

const corsOptions = {
    origin: function (origin, next) {
        console.log(origin);
        if (!origin || whiteList.indexOf(origin) !== -1) {
            next(null, true);
        } else {
            next(new Error("Not allowed by CORS"));
        }
    },
};

const server = express();
const port = process.env.PORT;

// Middlewares

// Endpoints

server.listen(port, async (req, res, next) => {
    console.log('CYGNETDEX server is live on port: ', port);
    console.log(listEndpoints(server));

    await connectDb();
});

server.on('error', (error) => console.log('Server not running due to the following error: ', error));