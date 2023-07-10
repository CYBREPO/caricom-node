import gridsix from "../models/gridsix.js";
import asyncHandler from 'express-async-handler';
import { constants } from '../constant/constant.js';
import removeFiles from './fileRemove.js';


const getGridSix = asyncHandler(async (req, res) => {

    let result = await gridsix.find({}).exec();

    if (result)
        return res.status(constants.OK).json({ success: true, data: result });

    res.status(constants.VALIDATION_ERROR);
    throw new Error('something went wrong');
});




const saveUpdateGridSix = asyncHandler(async (req, res) => {
    if (req.body) {

        //update
        if (req.body.id) {
            let param = {
                gridSixImage: req.file?.filename,
                gridSixContent: req.body?.gridSixContent
            }

            let result = await gridsix.findByIdAndUpdate(req.body.id, param);

            if (result) {
                removeFiles([result.gridSixImage]);
                return res.status(constants.OK).json({ success: true, message: 'Updated successfully' })
            }
            res.status(constants.VALIDATION_ERROR);
            throw new Error('Something went wrong');
        }

        let result = await gridsix.create({
            gridSixImage: req.file?.filename,
            gridSixContent: req.body?.gridSixContent
        });
        if (result) {
            return res.status(constants.OK).json({ success: true, message: 'Saved successfully' })
        }
    }
    res.status(constants.VALIDATION_ERROR);
    throw new Error('Invalid Request');
});

const deleteGridSix = asyncHandler(async (req, res) => {
    if (req.query.id) {
        let result = await gridsix.findByIdAndDelete(req.query.id).exec();
        if (result) {
            removeFiles([result.gridSixImage]);
            return res.status(constants.OK).json({ success: true, message: 'Deleted successfully' })
        }
        res.status(constants.VALIDATION_ERROR);
        throw new Error('something went wrong');
    }

    res.status(constants.VALIDATION_ERROR);
    throw new Error('Invalid Request');

});

export { getGridSix, saveUpdateGridSix, deleteGridSix }
