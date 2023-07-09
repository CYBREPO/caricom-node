import mongoose from "mongoose";

const subSidebarSchema = mongoose.Schema(
    {
        title: {type: String,require: true}
    },
    {
        timestamp: true
    }
)

export default mongoose.model('subSidebar',subSidebarSchema)