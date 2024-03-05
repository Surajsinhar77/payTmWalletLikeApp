import  AvatarDemo  from "@/components/customUi/Avater/Avater";
import UserBar from "./UserBar";
import { Input } from "@/components/ui/input"
import { useRecoilValue } from "recoil";
import { loginUser } from "@/common/Store/authStore";
import { DropdownMenuDemo } from "@/components/customUi/Dashboard/DropdownMenu"

interface AvatarProps {
    Btn: React.ComponentType<any>; // Type for the button component
}

function Dashboard() {
    const userData = useRecoilValue(loginUser);

    console.log("This is from the dashboard here ", userData);
    
    return (
        <div className="w-[85%] text-md">
            <div className="mainbar flex justify-between items-center">
                <h1 className="text-3xl">Payment App</h1>

                <div className="profile flex gap-2 items-center py-5">
                    <span className="text-red-500 text-xl font-semibold">Hello, 
                        {userData?.user?.firstname}
                    </span>
                    
                    <DropdownMenuDemo avater={onclick}/>
                        
                </div>
            </div>
            <hr />

            <div className="innerContainer">
                <div className="balanceContainer py-5">
                    <h1 className="text-2xl font-bold">Yours, Balance &nbsp; <span className="text-green-500"> ${"5000.00"}</span></h1>
                </div>

                <div className="user py-5">
                    <h1 className="text-2xl font-bold">Users</h1>
                    <div className="userSearchInput py-3">
                        <Input className="text-md" type="text" placeholder="username"/>
                    </div>
                </div>

                <div className="userList">

                    <UserBar/>
                    <UserBar/>

                </div>
            </div>
        </div>
    )
}

export default Dashboard