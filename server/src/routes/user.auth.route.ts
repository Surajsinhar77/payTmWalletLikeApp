import { Router } from "express";
import {userRegister, userLogin, updateUserInfo} from '../controller/user.controller'

const route = Router();

route.post('/signup', userRegister);
route.post('/signin', userLogin);
route.post("/update_profile", updateUserInfo);

export default route;