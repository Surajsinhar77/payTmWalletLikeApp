import {Routes, Route} from 'react-router-dom';
import { Signup } from '@/components/customUi/Auth/Signup';
import { Signin } from '@/components/customUi/Auth/Signin';
import Dashboard from '@/components/customUi/Dashboard/Dashboard';

function Allroutes(){
    return (
        <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/send' element={<> <h1>send </h1> </>}/>
        </Routes>
    )
}

export default Allroutes 