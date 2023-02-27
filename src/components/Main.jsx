import { useState } from 'react'

import { TabMenu } from 'primereact/tabmenu';

import Delegaciones from './Delegaciones';
import Usuarios from './Usuarios';
import Reportes from './Reportes'
import DelegacionesAgente from './DelegacionesAgente';

function Main() {
   const [activeIndex, setActiveIndex] = useState(0)
   const items = [
      { label: 'Registro', icon: 'pi pi-fw pi-home' },
      { label: 'Usuarios', icon: 'pi pi-fw pi-users' },
      { label: 'Agente', icon: 'pi pi-fw pi-file' },
      { label: 'Reportes', icon: 'pi pi-fw pi-cog' }
   ];

   return (
      <>
         <div className="card navbar">
            <div className="flex card-container blue-container overflow-hidden">
               <div className="flex-grow-1  m-0 px-0 py-0 border-round">
                  <TabMenu model={items} activeIndex={activeIndex} end={<div>Hola</div>}
                     onTabChange={(e) => {
                        setActiveIndex(e.index);
                     }} />
               </div>
            </div>
         </div>
         {activeIndex == 0 && <Delegaciones />}
         {activeIndex == 1 && <Usuarios />}
         {activeIndex == 2 && <DelegacionesAgente />}
         {activeIndex == 3 && <Reportes />}
      </>
   );
}

export default Main
