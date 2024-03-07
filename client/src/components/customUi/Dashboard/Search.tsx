import { Input } from "@/components/ui/input";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchdata, usersData, filterdata} from "@/common/Store/authStore";
import  UserBar  from "./UserBar"

interface users{
    _id : string,
    username : string,
    firstname : string,
    lastname : string,
    password : string
}

// Have to remove the current user from the users data 
export default function Search() {
    const [search, setSearch] = useRecoilState<string>(searchdata);
    const users  = useRecoilValue<any>(usersData);
    const [filteredData, setFilterData]= useRecoilState(filterdata);
    
    
    function searchingUser(value:string){
        setSearch(value);
        setFilterData( users.usersdata.filter((user : users) => user.username.toLowerCase().includes(search.toLowerCase())))
    }

    return (
        <>
            <div className="user py-5">
                <h1 className="text-2xl font-bold">Users</h1>
                <div className="userSearchInput py-3">
                    <Input onChange={(e)=>searchingUser(e.target.value)} className="text-md" type="text" placeholder="username"/>
                </div>
            </div>

            <div className="userList">

                {
                    filteredData.map((item)=>
                        <UserBar item = {item} />
                    )
                }

            </div>
        </>
    )
}
