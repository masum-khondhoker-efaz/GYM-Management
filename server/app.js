import  express from 'express';
import router from './routes/api.js';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from "helmet";

import mongoose from 'mongoose';
import {
    DATABASE_URL,
    MAX_JSON_SIZE,
    PORT,
    REQUEST_NUMBER,
    REQUEST_TIME,
    URL_ENCODE,
    WEB_CACHE
} from "./app/config/config.js";
import * as path from "node:path";
import {DefaultErrorHandler, NotFoundError} from "./app/utilities/errorHandler.js";
import cookieParser from "cookie-parser";



const app = express();


// App use default middlewares
app.use(cors());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());

app.use(cookieParser());

// App use limiter
const limiter = rateLimit({windowMs: REQUEST_TIME, max:REQUEST_NUMBER})
app.use(limiter);

//Cache
app.set('etag', WEB_CACHE);

// Database connection
mongoose.connect(DATABASE_URL, {autoIndex:true}).then(()=>{
    console.log("MongoDB Connected");
}).catch((err)=>{
    console.log('MongoDB Disconnected',err);
})


app.use("/api", router);
app.use( NotFoundError);
app.use( DefaultErrorHandler);

app.use(express.static('client/dist'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client','dist','index.html'));
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})