import { useState } from 'react'
import uncLogo from '../assets/LOGOUNC.png'

import { TabMenu } from 'primereact/tabmenu';

import Delegaciones from './Delegaciones';
import Agentes from './Agentes';
import DelegacionSecretario from './DelegacionSecretario';
import DelegacionAgente from './DelegacionAgente';

function Main() {
   const [activeIndex, setActiveIndex] = useState(0)
   const items = [
      { label: 'Delegaciones',           icon: 'pi pi-fw pi-home' },
      { label: 'Agentes',       icon: 'pi pi-fw pi-users' },
      { label: 'Edit',           icon: 'pi pi-fw pi-pencil' },
      { label: 'Documentation',  icon: 'pi pi-fw pi-file' },
      { label: 'Settings',       icon: 'pi pi-fw pi-cog' }
   ];
   return (
      <>
         <div className="card navbar">
            <div className="flex card-container blue-container overflow-hidden">
               <div className="flex-none flex  justify-content-center font-bold text-white m-2 px-3 py-1 border-round">
                  <img src={uncLogo} height={'50px'} />
                  <p style={{color: 'white'}}>&nbsp;CIBERPOL</p>
               </div>
               <div className="flex-grow-1  m-0 px-0 py-0 border-round">
                  <TabMenu model={items} activeIndex={activeIndex} 
                  onTabChange={(e) => {
                     setActiveIndex(e.index);
                  }} />
               </div>
            </div>
         </div>
         {activeIndex == 0 && <Delegaciones />}
         {activeIndex == 1 && <Agentes/>}
         {activeIndex == 2 && <DelegacionSecretario/>}
         {activeIndex == 3 && <DelegacionAgente idDelegacion={10}/>}
      </>
   );
}

export default Main
