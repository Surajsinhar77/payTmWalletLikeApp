import UserBar from "./UserBar";
import { useRecoilValue, useRecoilState } from "recoil";
import { loginUser, usersData } from "@/common/Store/authStore";
import { DropdownMenuDemo } from "@/components/customUi/Dashboard/DropdownMenu";
import Search from "./Search";
import { useEffect } from "react";
import api from "@/common/api/userBaseAxios";

function Dashboard() {
    const userData = useRecoilValue(loginUser);
    const [users, setUsersData]  = useRecoilState<any>(usersData);

    useEffect(()=>{
        api.get('/user/auth/all_users').then((response)=>{
            setUsersData(response.data);
        }).catch((err)=>{
            console.log(err)
        })
    },[]);

    console.log("This is the users Array  ",users);

    return (
        <div className="w-[85%] text-md">
            <div className="mainbar flex justify-between items-center">
                <h1 className="text-3xl">Payment App</h1>

                <div className="profile flex gap-2 items-center py-5">
                    <span className="text-red-500 text-xl font-semibold">Hello, &nbsp; 
                        { ((userData?.user as { firstname: string }).firstname).toUpperCase() }
                    </span>
                    <DropdownMenuDemo avater={onclick}/>
                </div>
            </div>
            <hr />

            <div className="innerContainer">
                <div className="balanceContainer py-5">
                    <h1 className="text-2xl font-bold">Yours, Balance &nbsp; 
                    <span className="text-green-500"> $ &nbsp;
                        {userData?.accountData?.balance.toFixed(4)}
                    </span></h1>
                </div>

                <Search/>
                
            </div>
        </div>
    )
}

export default Dashboard