import React, { useRef, useState, useEffect } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Sidebar } from 'primereact/sidebar';


import { DelegacionService } from '../services/DelegacionService';
import DelegacionSecretario from './DelegacionSecretario';

const svcDelegacion = new DelegacionService();

function Delegaciones() {

    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const [delegaciones, setDelegaciones] = useState(null);
    const [selectedDelegacion, setSelectedDelegacion] = useState({});
    const [mode, setmode] = useState("")
    const [elimado, setelimado] = useState(false)
    

    useEffect(() => {
        svcDelegacion.getDelegaciones().then(data => {
            setDelegaciones(data)
        })
    }, [visibleFullScreen, elimado]);

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    const toast = useRef(null);    

    const leftContents = (
        <React.Fragment>
            <Button label="Nueva" icon="pi pi-plus" className="mr-2"
                onClick={() => {
                    setmode("C")
                    setVisibleFullScreen(true)
                    setSelectedDelegacion({})
                }} />
            <Button label="Editar" icon="pi pi-pencil" className="p-button-success"
                onClick={() => {
                    if(!isEmpty(selectedDelegacion)){                        
                        setmode("U")
                        setVisibleFullScreen(true)
                    }else{
                        toast.current.show({severity: 'warn', summary: 'No seleccionado', detail: 'Seleccione la delegación que desea editar'});
                    }
                }} />
        </React.Fragment>
    );

    const rightContents = (
        <React.Fragment>
            {/* <Button icon="pi pi-search" className="mr-2" />
            <Button icon="pi pi-calendar" className="p-button-success mr-2" /> */}
            <Button icon="pi pi-times" className="p-button-danger" 
            onClick={() => {
                if(!isEmpty(selectedDelegacion)){                        
                    if(confirm("Seguro desea eliminarla delegacion")){
                        // alert("Eliminado" +  JSON.stringify(selectedDelegacion))
                        svcDelegacion.deleteDelegacion(selectedDelegacion).then((resp) =>{
                            alert("Delegacion eliminada")
                            setelimado(true)
                        })
                    }
                }else{
                    toast.current.show({severity: 'warn', summary: 'No seleccionado', detail: 'Seleccione la delegación que desea eliminar'});
                }
            }}
            />
        </React.Fragment>
    );

    const abrir = (x) =>{
        setVisibleFullScreen(x);
        if(!x){            
            setSelectedDelegacion({})
        }

    }

    return (
        <>
            <Toolbar left={leftContents} right={rightContents} />
            <Toast ref={toast} />
            <div>
                <div className="card">
                    <DataTable value={delegaciones} paginator rows={10}
                        selection={selectedDelegacion} onSelectionChange={e => setSelectedDelegacion(e.value)} selectionMode="single" dataKey="id" responsiveLayout="scroll"
                        stateStorage="session" stateKey="dt-state-demo-session" emptyMessage="No customers found.">
                        <Column field="id" header="ÓRDEN" sortable filter filterPlaceholder="Search by name"></Column>
                        <Column field="mesIngreso" header="MES" sortable filter filterPlaceholder="Search by name"></Column>
                        <Column field="numInvestPrevia" header="NÚMERO DE INVESTIGACIÓN PREVIA" sortable filter filterPlaceholder="Search by name"></Column>
                        <Column field="numInstFiscal" header="NÚMERO DE INSTRUCCIÓN FISCAL" sortable filter filterPlaceholder="Search by name"></Column>
                        <Column field="agente.nombre" header="AGENTE" sortable filter filterPlaceholder="Search by name"></Column>
                        <Column field="nombreVictima" header="VÍCTIMA" sortable filter filterPlaceholder="Search by name"></Column>
                        <Column field="distrito.nombre" header="DISTRITO" sortable filter filterPlaceholder="Search by name"></Column>
                    </DataTable>
                </div>
            </div>
            <Sidebar visible={visibleFullScreen} fullScreen
                onHide={() => {
                    setSelectedDelegacion({})
                    setVisibleFullScreen(false)
                    }}>
                <DelegacionSecretario abrir={abrir} mode={mode} selectedDelegacion={selectedDelegacion} />
            </Sidebar>
        </>
    )
}

export default Delegaciones;
