import express from 'express';
import dbConnect from './dbconnect.js';
import  cors from 'cors';
import banner from './routes/banner.js';
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

app.use('/api/banner',banner);

dbConnect();

app.listen((port), () => {
    console.log('listening to port ' + port)
})