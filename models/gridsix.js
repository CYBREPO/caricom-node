import mongoose from "mongoose";

const gridSixSchema = mongoose.Schema({
    'gridSixImage': { type: String },
    'gridSixContent': { type: String }
},
    {
        timestamp: true
    }
)

export default mongoose.model('gridSix', gridSixSchema)
