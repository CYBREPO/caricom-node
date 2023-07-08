import express from 'express';
import dbconnect from './dbconnect.js';
import banner from './routes/banner.js';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
}))
dbconnect;

app.get('/cat', (req, res) => {
    res.status(200).json('success')
})

app.use('/api/banner', banner)

app.listen('8080', () => {
    console.log('listening to port 8080')
})