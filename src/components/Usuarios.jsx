import React, { useRef, useState, useEffect } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SplitButton } from 'primereact/splitbutton';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';

import { AgenteService } from '../services/AgenteService';

import AgenteData from './AgenteData';
import UsuarioData from './UsuarioData';

const svcAgente = new AgenteService();

function Usuarios() {

    const [mode, setMode] = useState("");
    const [tipoUser, settipoUser] = useState("")
    const [agentes, setAgentes] = useState(null);
    const [selectedAgente, setSelectedAgente] = useState(null);

    const [displayAgenteData, setDisplayAgenteData] = useState(false);

    useEffect(() => {
        svcAgente.getAgentes().then(data => {
            setAgentes(data)
        })
    }, [displayAgenteData, mode]);

    const toast = useRef(null);

    const items = [
        {
            label: 'Agente',
            icon: 'pi pi-users',
            command: () => {
                settipoUser("Agente")
                setMode("C")
                setDisplayAgenteData(true)
            }
        },
        {
            label: 'Secretario',
            icon: 'pi pi-user-edit',
            command: () => {
                settipoUser("Secretario")
                setMode("C")
                setDisplayAgenteData(true)
            }
        },
        {
            label: 'Administrador',
            icon: 'pi pi-user',
            command: () => {
                settipoUser("Administrador")
                setDisplayAgenteData(true)
            }
        }
    ];

    const leftContents = (
        <React.Fragment>
            <Button label="Nuevo" icon="pi pi-plus" className="mr-2 p-button-success"
                onClick={() => {
                    setMode("C")
                    setDisplayAgenteData(true)
                }} />
                <SplitButton label="Save" icon="pi pi-plus" model={items} />
        </React.Fragment>
    );

    const accept = (delAgente) => {
        setMode("D")
        svcAgente.deleteAgente(delAgente).then(data => {
            toast.current.show({ severity: 'info', summary: 'Agente eliminado', detail: 'Se ha eliminado todos los datos', life: 3000 });
            setMode("")
        })        
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirm = (delAgent) => {
        confirmDialog({
            message: '¿Seguro va a eliminar el agente '+ delAgent.nombre + '?',
            header: 'Eliminar Agente',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: () => accept(delAgent),
            reject
        });
    }

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className='p-button-rounded mr-2'
                    onClick={(e) => {
                        settipoUser(rowData.usuario.tipo)
                        setSelectedAgente(rowData)
                        setMode("U")
                        setDisplayAgenteData(true)
                    }} />
                <Button icon="pi pi-times" className='p-button-rounded p-button-danger'
                    onClick={(e) => {
                        confirm(rowData)
                    }} />
            </>
        )
    }

    return (
        <>
            <ConfirmDialog />
            <Toolbar left={leftContents} />
            <Toast ref={toast} />
            <div>
                <div className="card">
                    <DataTable value={agentes} paginator rows={10} selection={selectedAgente}
                        onSelectionChange={e => {
                            setSelectedAgente(e.value)
                        }}
                        selectionMode="single" dataKey="id" responsiveLayout="scroll"
                        stateStorage="session" stateKey="dt-state-demo-session" emptyMessage="No customers found.">
                        <Column field="id" header="ID" sortable filter filterPlaceholder="Search by name"></Column>
                        <Column field="nombre" header="APELLIDOS Y NOMBRES" sortable filter filterPlaceholder="Search by name"></Column>
                        <Column field="usuario.correo" header="CORREO" sortable filter filterPlaceholder="Search by name"></Column>
                        <Column header="ACCIONES" body={statusBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
            <Dialog header={tipoUser} visible={displayAgenteData} style={{ width: '50vw' }}
                footer={(<div><small>Al crear o actualizar se generará una nueva contraseña</small></div>)}
                onHide={() => setDisplayAgenteData(false)}>
                {tipoUser == "Agente" && <AgenteData abrir={setDisplayAgenteData} mode={mode} agente={selectedAgente} />}
                {(tipoUser == "Secretario" || tipoUser=="Administrador") && <UsuarioData abrir={setDisplayAgenteData} mode={mode} agente={selectedAgente} tipoUser={tipoUser}/>}
            </Dialog>
        </>
    )
}

export default Usuarios;
