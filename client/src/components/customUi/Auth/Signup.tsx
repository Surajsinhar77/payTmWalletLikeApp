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

export function Signup() {
    return (
        <Card className="w-[350px] m-auto">
        <CardHeader className="flex flex-col items-center gap-3">
            <CardTitle >SignUp</CardTitle>
            <CardDescription className="text-md text-slate-50">Enter yours infomation to create an account.</CardDescription>
        </CardHeader>
        <CardContent>
            <form>
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
                    <Button className="text-base font-semibold">SignUp</Button>
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="gap-2">
            <p>Already have an account </p> <Link to="/signin" className="underline font-lg"> Login </Link>
        </CardFooter>
        </Card>
    );
}
