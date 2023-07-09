import { constants } from "../constant/constant.js";
import subSidebar from "../models/subSidebar.js";
import asyncHandler from 'express-async-handler'

const getAllSubSidebar = asyncHandler(async (req, res) => {
    let result = await subSidebar.find({}).exec();

    // let count = await sidebar.countDocuments();
    let count = result.length;

    if (result)
        return res.status(constants.OK).json({ success: true, data: result, count: count })
    res.status(constants.VALIDATION_ERROR);
    throw new Error('Something went wrong');
});

const saveUpdateSubSideBar = asyncHandler(async (req, res) => {
    if (req.body) {
        if (req.body.id) {
            let result = await subSidebar.findByIdAndUpdate(req.body.id, req.body).exec();
            if (result)
                return res.status(constants.OK).json({ success: true, data: result, message: "Updated successfully" });
        }

        let result = await subSidebar.create(req.body);
        if (result)
            return res.status(constants.OK).json({ success: true, data: result, message: "Created successfully" });


    }

    res.status(constants.VALIDATION_ERROR);
    throw new Error('Invalid Request');
});

const deleteSubSidebar = asyncHandler(async (req, res) => {

    if (req.query.id) {
        let result = await subSidebar.findByIdAndDelete(req.body.id).exec();
        if (result)
            return res.status(constants.OK).json({ success: true, data: result, message: "Deleted successfully" });
    }
    res.status(constants.VALIDATION_ERROR);
    throw new Error('Invalid request');
});

export {getAllSubSidebar,saveUpdateSubSideBar,deleteSubSidebar}