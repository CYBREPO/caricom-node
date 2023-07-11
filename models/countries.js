import mongoose from "mongoose";

const countriesSchema = mongoose.Schema(
    {
        countryName: { type: String },
        countryFlag: { type: String },
        date: { type: String },
        isAssociateMembers: { type: Boolean },
    },
    {
        timpstamp: true
    }
);

countriesSchema.index({ "countryName": "text"});

export default mongoose.model('countries', countriesSchema)