import mongoose from "mongoose";

const sidebarSchema = mongoose.Schema(
    {
        title: {type: String,require: true}
    },
    {
        timestamp: true
    }
)

export default mongoose.model('sidebar',sidebarSchema)