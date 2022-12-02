import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DelegacionService } from '../services/DelegacionService';

const Tablas = () => {

    const [delegaciones, setDelegaciones] = useState(null);
    const [selectedDelegacion, setSelectedDelegacion] = useState(null);

    const svcDelegacion = new DelegacionService();

    useEffect(() => {
        svcDelegacion.getDelegaciones().then(data => {
            setDelegaciones(data)
        })        
    }, []); 

    return (
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
    );
}

export default Tablas;