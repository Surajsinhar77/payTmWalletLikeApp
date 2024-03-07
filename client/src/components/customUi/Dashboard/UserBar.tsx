import { Button } from "@/components/ui/button";
import  AvatarDemo  from "../Avater/Avater";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { SureAlert } from "./SureAlert";

function UserBar({item}: any) {
    const [money, setMoney] = useState<number>(0);

    return (
        <div className="user flex justify-between py-2 items-center text-md">
            <div className="flex gap-3">
                <div>
                <AvatarDemo />
                </div>
                <div className="nameOfUser">
                <h1 className="text-2xl">{item.firstname}</h1>
                </div>
            </div>

            <div className="sendPaymentBtn">
                <Dialog>
                <DialogTrigger asChild>
                    <Button className="font-bold">Send Money</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="flex flex-col items-center py-3">
                    <DialogTitle className="text-2xl">Send Money</DialogTitle>
                    <DialogDescription className="text-xl">
                        Transfer money to other user.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="flex py-4 gap-3 text-md items-center">
                        <AvatarDemo/> <span> Friend - {item.firstname}</span>
                    </div>
                    <div className="flex flex-col py-4 gap-3 text-md">
                        <Label htmlFor="Amount">Amount : </Label>
                        <Input 
                            id="sendAmount" 
                            className="col-span-3" 
                            placeholder="$100" 
                            onChange={(e)=>setMoney(parseFloat(e.target.value))} />
                    </div>
                    <div className="flex flex-col space-y-1.5">

                        <SureAlert money={money}  id ={item._id}/>
                    
                    </div>
                    <DialogFooter>

                    </DialogFooter>
                </DialogContent>
            </Dialog>

            </div>
        </div>
    );
}

export default UserBar;
