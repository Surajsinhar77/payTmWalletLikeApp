import {Routes, Route} from 'react-router-dom';
import { Signup } from '@/components/customUi/Auth/Signup';
import { Signin } from '@/components/customUi/Auth/Signin';
import Dashboard from '@/components/customUi/Dashboard/Dashboard';
import {loginUser} from "../common/Store/authStore";
import { useRecoilValue } from 'recoil';

function Allroutes(){
    const userData = useRecoilValue(loginUser);
    return (
        <Routes>

            {userData? 
                <>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/send' element={<> <h1>send </h1> </>}/>
                </>
                : 
                <>
                    <Route path='/' element={<Signup/>}/>
                    <Route path='/signin' element={<Signin/>}/>
                </>

            }
                <Route path='*' element={ <p> Page not Found </p> } />
            
        </Routes>
    )
}

export default Allroutes 