import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import api from "@/common/api/userBaseAxios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { loginUser } from '../../../common/Store/authStore';
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";


interface userdata{
    message : string,
    accessToken: string,
    user : object,
    accountData : object
}

export function Signup() {
    const navigate = useNavigate();
    const [userData, setUserData] =  useRecoilState<userdata | null>(loginUser);
    console.log("This is printing here ", userData);

    const {toast} = useToast();

    async function userSignup(){
        try{
            const username  = document.querySelector('#email_id')?.value;
            const firstName  = document.querySelector('#fname')?.value;
            const lastName  = document.querySelector('#lname')?.value;
            const password  = document.querySelector('#userPassword')?.value;

            const response = await api.post("/user/auth/signup", {
                username,
                firstname : firstName,
                lastname : lastName,
                password
            });

            // saving data in the recoil state  and localStore
            setUserData(response.data);
            localStorage.setItem('loginUser', JSON.stringify(response.data));
            //

            toast({
                    title: response.data.message,
                    description: "Now you can login with yours username and password",
                action: (
                    <ToastAction altText = "Goto schedule to undo">Undo</ToastAction>
                ),
            })
            navigate("/dashboard");
        }catch(err){
            console.log("This error is from singup page : ",err);
            toast({
                title: "Error on the signup ",
                description: "Now you can login with yours username and password",
            action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
        })
        }
    }

    return (
        <Card className="w-[350px] m-auto">
        <CardHeader className="flex flex-col items-center gap-3">
            <CardTitle >SignUp</CardTitle>
            <CardDescription className="text-md text-slate-50">Enter yours infomation to create an account.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* <form> */}
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">First Name</Label>
                    <Input id="fname" placeholder="Your First name" required/>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Last Name</Label>
                    <Input id="lname" placeholder="Your Last name" required/>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email </Label>
                    <Input type="email" id="email_id" placeholder="abc@gmail.com" required/>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Password </Label>
                    <Input type="password" id="userPassword" placeholder="Set yours account password " required/>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Button onClick={userSignup} className="text-base font-semibold">SignUp</Button>
                </div>
            </div>
            {/* </form> */}
        </CardContent>
        <CardFooter className="gap-2">
            <p>Already have an account </p> <Link to="/signin" className="underline font-lg"> Login </Link>
        </CardFooter>
        </Card>
    );
}
