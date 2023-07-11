import user from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { constants } from "../constant/constant.js";
import { encrypt } from './encryption.js';
import email from  './email.js';

const getUserDetails = asyncHandler(async (req, res) => {
    let id = req.query.id;
    if (id > 0) {
        let v = await user.findOne({ id: id }).exec();
        return res.status(constants.OK).json(v);
    }
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Invalid request");
});

const getUsers = asyncHandler(async (req, res) => {
    let { pageSize, pageIndex, searchText } = req.body;
    let query = {};
    if (searchText && searchText != "") {
        query['$text'] = { $search: searchText };
    }

    const totalCount = await user.countDocuments(query);
    if (totalCount > pageSize) {
        const result = await user.find(query).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
        return res.status().json({ success: true, data: result, count: totalCount });
    }
    const result = await user.find(query).exec();
    return res.status(constants.OK).json({ success: true, data: result, count: totalCount });
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, phone, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("All fields are required");
    }

    const userExist = await user.findOne({ email }).exec();
    if (userExist) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("User already registered");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const regUser = await user.create({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        password: hashPassword,
        profile: req.file ? req.file?.path?.split('uploads/')[1] : "",
        isAdmin: req.body.isAdmin ?? false,
    });

    if (regUser) {
        res.status(constants.CREATED).json({ success: true, message: 'Registered Successfully', data: { id: regUser._id, email: regUser.email } });
    }
    else {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("User data not valid");
    }

});

const updateUserStatus = asyncHandler(async (req, res) => {
    if (req.body.id) {
        const user = await user.findByIdAndUpdate(req.body.id, { isActive: req.body.isActive });
        if (user)
            res.status(constants.OK).json({ success: true, message: "User has been blocked" });
        else {
            res.status(constants.VALIDATION_ERROR);
            throw new Error('Record not found');
        }
    }
    res.status(constants.VALIDATION_ERROR);
    throw new Error('Invalid request');
});

const deleteUser = asyncHandler(async (req, res) => {
    if (req.query.id) {
        const user = await user.findByIdAndDelete(req.query.id);
        if (user) {
            if (user.profile)
                fileUploadController.removeFiles([user.profile]);
            return res.status(constants.OK).json({ success: true, message: "User has been deleted" });
        }
        res.status(constants.VALIDATION_ERROR);
        throw new Error('User not deleted');
    }
    res.status(constants.VALIDATION_ERROR);
    throw new Error('Invalid request');
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Email and Password is required");
    }

    const user = await user.findOneAndUpdate({ email: email, isActive: true }, { lastLogin: new Date() }).exec();

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({
            user: {
                email: user.email,
                name: user.name,
                id: user._id,
                admin: user.isAdmin
            }
        },
            process.env.JWT_SECRET,
            { expiresIn: "100m" });

        let param = {
            message: "Logged In Successfully",
            data: {
                email: user.email,
                name: user.name,
                id: user._id,
                profile: user.profile,
                token: token,
                isAdmin: user.isAdmin
            },
            success: true

        }

        res.status(constants.OK).json(param);
    }
    else {
        res.status(constants.UNAUTHORIZED);
        throw new Error("Invalid User Credentials or User has been blocked");
    }

});

const resetPassword = asyncHandler(async (req, res) => {

    const user = await user.findOne({ email: req.body.email }).exec();

    if (user) {
        const now = new Date();

        const year = now.getUTCFullYear();
        const month = now.getUTCMonth() + 1;
        const day = now.getUTCDate();
        const hours = now.getUTCHours();
        const minutes = now.getUTCMinutes();
        const seconds = now.getUTCSeconds();

        const genLink = process.env.AUTOHYRELINK + "/account/reset-passeord/" + encrypt(user._id) +
            "/" + encrypt(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);

        let emailBody = {
            body: {
                name: user.name,
                intro: 'You have received this mail because a password reset request for your account was received',
                action: {
                    instructions: 'Click the button below to reset your password',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Reset your Password',
                        link: process.env.AUTOHYRELINK + "/account/reset-password/" + encrypt(user._id) +
                            "/" + encrypt(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        }

        let info = await email({ mails: req.body.email, email: emailBody });
    }

    res.status(200).json({ success: true, message: "Password reset successful" });
});

const updatePassword = asyncHandler(async (req, res) => {
    if (req.body) {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        if (req.body.oldPassword != null && req.body.oldPassword != "") {
            //check if old password matches
            let userCheck = await user.findById(req.body.id).exec();

            if (!userCheck || userCheck.password != hashPassword) {
                res.status(constants.VALIDATION_ERROR);
                throw new Error("Old password is invalid");
            }

        }

        let user = await user.findOneAndUpdate({ _id: req.body.id }, { password: hashPassword }).exec();

        if (!user) {
            res.status(constants.VALIDATION_ERROR);
            throw new Error('Error in updating the user');
        }

        res.status(constants.OK).json({ success: true, message: "Password reset successfully" });
    }
    else {
        res.status(constants.VALIDATION_ERROR);
        throw new Error('Invalid request');
    }
});

const updateUser = asyncHandler(async (req, res) => {
    if (req.body) {
        let update = {};
        if (req.file) {
            // const usrP = await user.findById(req.body.id);
            // if (usrP && usrP.profile)
            //     fileUploadController.removeFiles([usrP.profile]);

            update['profile'] = req.file.path.replace('\\', '/').split('uploads/')[1]

        }
        update['name'] = req.body.name;
        update['email'] = req.body.email;
        let user;
        if (req.body.id && req.body.id != "") {
            user = await user.findByIdAndUpdate(req.body.id, update).exec();
            if (user && user.profile && req.file)
                fileUploadController.removeFiles([user.profile]);
        }
        else {
            update['password'] = await bcrypt.hash('Pass@123', 10);
            update['isAdmin'] = false
            user = await user.create(update);
        }


        if (user) {
            return res.status(constants.OK).json({ success: true, message: 'User Details Saved successfully', data: user });
        }
        // res.status(constants.VALIDATION_ERROR);
        // throw new Error('user does not exists');
    }
    res.status(constants.VALIDATION_ERROR);
    throw new Error('Invalid request');
})


export { getUserDetails, getUsers, registerUser, updateUserStatus, deleteUser, login, resetPassword, updatePassword, updateUser }