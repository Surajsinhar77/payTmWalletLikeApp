import {atom} from 'recoil';

interface userdata{
  message : string,
  accessToken: string,
  user : object,
  accountData : object
}

export const loginUser = atom<userdata | null>({
  key: "loginUser",
  default: JSON.parse(localStorage.getItem('loginUser') || 'null') as userdata | null,
});

export const searchdata = atom<string>({
  key : "searchdata",
  default : "",
});

interface users{
  usersdata: [],
}

export const usersData = atom<users>({
  key : "usersData",
  default : {usersdata : []} as users,
});

export const filterdata = atom<[]>({
  key :"filterdata",
  default :[],
})

export const coutingData = atom<number>({
  key : "contingData",
  default : 0,
});