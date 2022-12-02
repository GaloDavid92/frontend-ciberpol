import React, { useRef, useState, useEffect } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
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
    const [selectedDelegacion, setSelectedDelegacion] = useState(null);
    

    useEffect(() => {
        svcDelegacion.getDelegaciones().then(data => {
            setDelegaciones(data)
        })
    }, [visibleFullScreen]);

    const toast = useRef(null);
    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: (e) => {
                toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: (e) => {
                toast.current.show({ severity: 'success', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: (e) => {
                window.location.href = 'https://facebook.github.io/react/'
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: (e) => {
                window.location.hash = "/fileupload"
            }
        }
    ]

    const leftContents = (
        <React.Fragment>
            <Button label="Nueva" icon="pi pi-plus" className="mr-2" onClick={() => setVisibleFullScreen(true)} />
            <Button label="Upload" icon="pi pi-upload" className="p-button-success" />
            <i className="pi pi-bars p-toolbar-separator mr-2" />
            <SplitButton label="Save" icon="pi pi-check" model={items} className="p-button-warning"></SplitButton>
        </React.Fragment>
    );

    const rightContents = (
        <React.Fragment>
            <Button icon="pi pi-search" className="mr-2" />
            <Button icon="pi pi-calendar" className="p-button-success mr-2" />
            <Button icon="pi pi-times" className="p-button-danger" />
        </React.Fragment>
    );


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
            <Sidebar visible={visibleFullScreen} fullScreen onHide={() => setVisibleFullScreen(false)}>
                <DelegacionSecretario abrir={setVisibleFullScreen} />
            </Sidebar>
        </>
    )
}

export default Delegaciones;
