import { useState } from 'react'

import { TabMenu } from 'primereact/tabmenu';

import Delegaciones from './Delegaciones';
import Usuarios from './Usuarios';
import Reportes from './Reportes'
import DelegacionesAgente from './DelegacionesAgente';

function Main() {
   const [activeIndex, setActiveIndex] = useState(0)
   const user = JSON.parse(localStorage.getItem('user'));
   const items = () => {
      if (user.tipo == "Agente") {
         return [
            { label: 'Agente', icon: 'pi pi-fw pi-file' }
         ]
      }
      if (user.tipo == "Secretario") {
         return [
            { label: 'Registro', icon: 'pi pi-fw pi-home' }
         ]
      }
      if (user.tipo == "Administrador") {
         return [
            { label: 'Registro', icon: 'pi pi-fw pi-home' },
            { label: 'Usuarios', icon: 'pi pi-fw pi-users' },
            { label: 'Agente', icon: 'pi pi-fw pi-file' },
            { label: 'Reportes', icon: 'pi pi-fw pi-cog' }
         ]
      }
   };

   const tabs = () => {
      if (user.tipo == "Agente") {
         return activeIndex == 0 && <DelegacionesAgente />
      }
      if (user.tipo == "Secretario") {
         return activeIndex == 0 && <Delegaciones />
      }
      if (user.tipo == "Administrador") {

         return (
            <>
               {activeIndex == 0 && <Delegaciones />}
               {activeIndex == 1 && <Usuarios />}
               {activeIndex == 2 && <DelegacionesAgente />}
               {activeIndex == 3 && <Reportes />}
            </>
         )
      }
   }

   return (
      <>
         <div className="card navbar">
            <div className="flex card-container blue-container overflow-hidden">
               <div className="flex-grow-1  m-0 px-0 py-0 border-round">
                  <TabMenu model={items()} activeIndex={activeIndex} end={<div>Hola</div>}
                     onTabChange={(e) => {
                        setActiveIndex(e.index);
                     }} />
               </div>
            </div>
         </div>
         {tabs()}
      </>
   );
}

export default Main
