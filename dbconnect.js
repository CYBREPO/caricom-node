import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connrctionstring = process.env.mongodb
console.log(process.env.mongodb);
const dbconnect = mongoose.connect(connrctionstring).then(() => {
    console.log('connected db');
})

export default dbconnect;