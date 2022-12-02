import { useState } from 'react'
import './App.css'

import "primereact/resources/themes/bootstrap4-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';                          //icons

import Main from './components/Main';
import Login from './components/Login';

function App() {

   const [login, setlogin] = useState(false)
   return (
      <>
         {login && <Main/> }
         {!login &&<Login isloged={setlogin}/>}
      </>
   );
}

export default App
