import express from 'express';
import dbconnect from './dbconnect.js';

const app = express();

dbconnect;

app.listen('8000', () => {
    console.log('listening to port 8000')
})