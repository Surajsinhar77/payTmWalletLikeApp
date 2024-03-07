import { loginUser } from "@/common/Store/authStore";
import { useRecoilValue } from "recoil";

export function loginUser_LocalStorage_data(){
    const userLoginData  = useRecoilValue(loginUser);
    console.log("This LocalStorage data : ", userLoginData);
    localStorage.setItem('userData', JSON.stringify(userLoginData?  null : userLoginData));
}

export function userLogout_localStorage_data(){
    localStorage.removeItem('userData');
}