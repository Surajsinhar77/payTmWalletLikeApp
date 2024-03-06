import { Router } from "express";
import {userRegister, userLogin, updateUserInfo, getAllUsers} from '../controller/user.controller'

const route = Router();

route.post('/signup', userRegister);
route.post('/signin', userLogin);
route.post("/update_profile", updateUserInfo);
route.get('/all_users', getAllUsers)

export default route;