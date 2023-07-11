import express from 'express';
import upload from "../middleware/multer.js";
import {
    login, deleteUser, getUsers, updateUserStatus, registerUser,
    resetPassword, updatePassword, updateUser
} from '../controller/user.js';
import validateToken from '../middleware/authorization.js';

const router = express.Router();


router.post('/login', login)
    .get('/deleteUser', validateToken, deleteUser)
    .post('/getUsers', getUsers)
    .post('/updateUserStatus', validateToken, updateUserStatus)
    .post('/register', registerUser)
    .post('/updateUser', validateToken, upload.single('profile'), updateUser)
    .post('/reset-password', resetPassword)
    .post('/updatePassword', validateToken, updatePassword);

export default router