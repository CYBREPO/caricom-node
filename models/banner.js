import mongoose from "mongoose";

const bannerSchema = mongoose.Schema({
    bannerSlider: [
        {
            'image': { type: String },
            'content': { type: String }
        }
    ],
    bannerTwoSectionImage: { type: String },
    bannerTwoSectionContent: { type: String }
},
    {
        timestamp: true
    }
)

export default mongoose.model('banner', bannerSchema)