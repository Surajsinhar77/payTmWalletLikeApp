import './App.css'
// import { CardWithForm } from './components/customUi/CardWithForm';
// import { Link } from 'react-router-dom';
import Allroutes from './common/Allroutes';
// import { Button } from './components/ui/button';
function App() {

  return (
    <>
      <div className="mainContainer">
        {/* <nav className='flex gap-2 justify-around'>
          <Link to="/signup">Signup Page</Link>
          <Link to="/signin">Signin Page</Link>  
          <Link to="/dashboard">Dashboard Page</Link>  
          <Link to="/send">send Page</Link>  
          
        </nav> */}
        <div className='Container border min-h-screen flex flex-col items-center'>
          <Allroutes></Allroutes>
        </div>
      </div>
    </>
  )
}

export default App
