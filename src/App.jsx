import { useState } from 'react'
import './App.css'

import "primereact/resources/themes/bootstrap4-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';                          //icons

import Main from './components/Main';
import Login from './components/Login';
import Consulta from './components/Consulta';

function App() {

   const [login, setlogin] = useState(false)
   const [isConsulting, setIsConsulting] = useState(true)

   const ciberpolSys = <>
      {login && <Main />}
      {!login && <Login isloged={setlogin} />}
   </>
   return (
      <>
         <Consulta isConsulting={isConsulting} setIsConsulting={setIsConsulting}/>
         {!isConsulting && ciberpolSys}
      </>
   );
}

export default App
