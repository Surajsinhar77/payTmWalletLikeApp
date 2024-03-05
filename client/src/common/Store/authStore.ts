import {atom} from 'recoil';

interface userdata{
  message : string,
  accessToken: string,
  user : object
}

export const loginUser = atom <userdata | null>({
  key: "loginUser",
  default: JSON.parse(localStorage.getItem('loginUser')),
});



export const coutingData = atom<number>({
  key : "contingData",
  default : 0,
})