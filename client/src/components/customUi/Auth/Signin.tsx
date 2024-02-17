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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import api from '../../../common/api/userBaseAxios';
import { useToast } from "@/components/ui/use-toast";

export function Signin(){
    const {toast} = useToast();

    async function getIt(){
        const email =  document.querySelector('#email_id')?.value;
        const password =  document.querySelector('#userPassword')?.value;

        try{
            console.log("here iam using api call ", email, password);
            const response = await api.post('/user/auth/signin', {username:email, password:password})
            toast({
                title: response.data.message,
                description: "If u dont have an account create one ",
                action: (
                    <Link to="/signup">Signup</Link>
                ),
            })
        }
        catch(err){
            console.log(err);
            toast({
                title: "error while signin",
                description: "If u dont have an account create one ",
                action: (
                    <Link to="/signin">SignIn</Link>
                ),
            })
        }
    }
    
    return (
        <Card className="w-[350px] m-auto">
        <CardHeader className="flex flex-col items-center gap-3">
            <CardTitle >Login</CardTitle>
            <CardDescription className="text-md text-slate-50">Enter yours Credential to login into yours account.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* <form> */}
            <div className="grid w-full items-center gap-4">
                
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email </Label>
                    <Input type="email" id="email_id" name="email" placeholder="abc@gmail.com" required/>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Password </Label>
                    <Input type="password" id="userPassword" placeholder="Set yours account password " required/>
                </div>

                
                <div className="flex flex-col space-y-1.5">
                    <Button className="text-base font-semibold" id='loginbtn' onClick={getIt}>Login</Button>
                </div>
            </div>
            {/* </form> */}
        </CardContent>
        <CardFooter className="gap-2">
            <p>Create an account </p> <Link to="/signup" className="underline font-lg"> SignUp </Link>
        </CardFooter>
        </Card>
    );
}