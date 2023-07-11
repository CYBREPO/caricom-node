import countries from "../models/countries.js";
import asyncHandler from 'express-async-handler';
import { constants } from "../constant/constant.js";
import removeFiles from './fileRemove.js'

const getAllCountries = asyncHandler(async (req, res) => {
    let { pageSize, pageIndex, searchText } = req.query;
    let query = {};
    if (searchText && searchText != "") {
        query['$text'] = { $search: searchText };
    }

    const totalCount = await countries.countDocuments(query);
    if (totalCount > pageSize) {
        const result = await countries.find(query).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
        return res.status().json({ success: true, data: result, count: totalCount });
    }
    const result = await countries.find(query).exec();
    return res.status(constants.OK).json({ success: true, data: result, count: totalCount });
});

const createUpdateCountries = asyncHandler(async (req, res) => {
    if (req.body) {
        let param = {
            countryFlag: req.file?.filename,
            countryName: req.body?.countryName,
            date: req.body?.date,
            isAssociateMembers: req.body?.isAssociateMembers,
        }
        //update
        if (req.body.id) {
            let result = await countries.findByIdAndUpdate(req.body.id, param);

            if (result) {
                removeFiles([result.countryFlag]);
                return res.status(constants.OK).json({ success: true, message: 'Country updated successfully' })
            }
            res.status(constants.VALIDATION_ERROR);
            throw new Error('Something went wrong');
        }

        let result = await countries.create(param);
        if (result) {
            return res.status(constants.OK).json({ success: true, message: 'Country saved successfully' })
        }
    }
    res.status(constants.VALIDATION_ERROR);
    throw new Error('Invalid Request');
});

const deleteCountries = asyncHandler(async (req, res) => {
    if (req.query.id) {
        let result = await countries.findByIdAndDelete(req.query.id).exec();
        if (result) {
            removeFiles([result.countryFlag]);
            return res.status(constants.OK).json({ success: true, message: 'Deleted successfully' })
        }
        res.status(constants.VALIDATION_ERROR);
        throw new Error('something went wrong');
    }

    res.status(constants.VALIDATION_ERROR);
    throw new Error('Invalid Request');

});

export { getAllCountries, createUpdateCountries, deleteCountries }