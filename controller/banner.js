import banner from "../models/banner.js";
import asyncHandler from 'express-async-handler';
import {constants} from '../constant/constant.js';
import removeFiles from './fileRemove.js';

const getBanner = asyncHandler(async (req, res) => {
    
    let result  = await banner.findOne({}).exec();

    if(result)
        return res.status(constants.OK).json({success: true, data: result});

    res.status(constants.VALIDATION_ERROR);
    throw new Error('something went wrong');
});

const saveUpdateBanner = asyncHandler(async (req, res) => {
    if (req.body) {
        console.log(req.body);
        console.log(req.files);
        //update
        if(req.body.id){
            let result = await banner.findByIdAndDelete(req.body.id);
            let files = result.bannerSlider.map(m => m.image);

            removeFiles([...files, result.bannerTwoSectionImage]);
        }
        let bannerSlider = [];
        for(let i = 0; i< req.body.bannerSlider.length; i++){
            let file = req.files?.find(m => m.fieldname.includes('bannerSlider['+i+']'));
            bannerSlider.push({
                content: req.body.bannerSlider[i]?.content,
                image: file?.filename,
            });
        }
        
        let result = await banner.create({
            bannerSlider: bannerSlider,
            bannerTwoSectionImage: req.files?.find(m => m.fieldname == "bannerTwoSectionImage")?.filename,
            bannerTwoSectionContent: req.body.bannerTwoSectionContent
        });
        if (result) {
            return res.status(constants.OK).json({ success: true, message: 'saved success' })
        }
    }
    res.status(constants.VALIDATION_ERROR);
    throw new Error('Invalid Request');
});

export { getBanner, saveUpdateBanner }
