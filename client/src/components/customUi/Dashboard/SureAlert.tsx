import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSetRecoilState } from "recoil";
import { accountBalance } from "@/common/Store/authStore";
import api from "@/common/api/userBaseAxios";
import { useState } from "react";

export function ButtonLoading() {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  )
}


export function SureAlert(props: any) {
  const { toast } = useToast();
  const setBalance = useSetRecoilState<number>(accountBalance);
  const [displayMsg, setDisplayMsg] = useState("This action cannot be undone. Money will be Transfer to the other account.");
  const [inValid, validAmount] = useState(true);
  const [loading, setLoading] = useState(false);

  async function sendMoneyTo() {
    setLoading(true);
    try {
      const response = await api.post('/account/transfer', { amount: props.money, to: props.id });
      setLoading(false);
      if (response.status == 200) {
        setBalance(response.data.leftBalance);
        toast({
          title: response.data.message,
          description: "Check yours balance Once",
          action: (
            <Link to="/dashboard">Signup</Link>
          ),
        })
      }
    } catch (err) {
      console.log(err);
      toast({
        title: err.message,
        description: "try agian after sometime",
        action: (
          <Link to="/dashboard">Signup</Link>
        ),
      })
    }
  }

  function checkAmountValid() {
    if (props.money < 1) {
      validAmount(true);
      setDisplayMsg("You have Enter inValid Amount");
    } else {
      setDisplayMsg("This action cannot be undone. Money will be Transfer to the other account.");
      validAmount(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {
          loading ?
            <ButtonLoading />
            :
            <Button onClick={checkAmountValid} variant="destructive">Send</Button>
        }
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-red-500 text-lg">
            {displayMsg}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          {
            loading ?
              <ButtonLoading />
              :
              <AlertDialogAction disabled={inValid} onClick={sendMoneyTo}>
                Continue
              </AlertDialogAction>
          }

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
