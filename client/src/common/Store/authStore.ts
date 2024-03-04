import {atom} from 'recoil';

interface userdata{
  message : string,
  accessToken: string,
  user : object
}

export const loginUser = atom <userdata | null>({
  key: "loginUser",
  default: null,
});