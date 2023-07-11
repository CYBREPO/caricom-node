import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { constants } from '../constant/constant.js';

const validateToken = asyncHandler(async (req, res, next) => {
    let token = "";
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(constants.UNAUTHORIZED);
                throw new Error("Unauthorized User");
            }
            req.user = decoded;
            next();
        })
    }
    else{
        res.status(constants.UNAUTHORIZED);
        throw new Error("Unauthorized User");
    }
});

export default validateToken;