import express from 'express';
import dbConnect from './dbconnect.js';
import cors from 'cors';
import banner from './routes/banner.js';
import gridSixRoute from './routes/gridSixRoute.js';
import accountRoute from './routes/account.js';

import path from 'path';
const __dirname = path.resolve();

const app = express();
const port = process.env.port;

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/account', accountRoute);
app.use('/api/banner', banner);
app.use('/api/grid', gridSixRoute);

dbConnect();

app.listen((port), () => {
    console.log('listening to port ' + port)
})