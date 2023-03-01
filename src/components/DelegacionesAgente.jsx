import React, { useRef, useState, useEffect } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Sidebar } from 'primereact/sidebar';


import { DelegacionService } from '../services/DelegacionService';
import DelegacionAgente from './DelegacionAgente';

const svcDelegacion = new DelegacionService();

function DelegacionesAgente() {
    const [delegaciones, setDelegaciones] = useState(null);
    const [selectedDelegacion, setSelectedDelegacion] = useState({});
    const [delegacio, setDelegacio] = useState(<>Nada</>)


    useEffect(() => {
        svcDelegacion.getDelegaciones().then(data => {
            setDelegaciones(data)
        })
    }, []);

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    const toast = useRef(null);

    return (
        <>
            <Toast ref={toast} />
            <div>
                <div className="card">
                    <DataTable value={delegaciones} paginator rows={5}
                        selection={selectedDelegacion}
                        onSelectionChange={e => {
                            setSelectedDelegacion(e.value)

                            setDelegacio(<DelegacionAgente delegacionEdit={e.value} />)
                        }}
                        selectionMode="single" dataKey="id" responsiveLayout="scroll"
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
            {delegacio}
        </>
    )
}

export default DelegacionesAgente;
