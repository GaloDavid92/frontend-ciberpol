import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';

const TipoPeticion = ({ peticiones, setPeticiones }) => {

    // const [peticiones, setPeticiones] = useState([])
    const [peticion, setPeticion] = useState([])

    const addItem = (e) => {
        peticion != "" ? setPeticiones([...peticiones, peticion]) : null
        setPeticion("")
    }

    return (
        <>
            <span className="p-float-label">
                <div className="p-inputgroup">
                    <InputText placeholder="Añadir Petición" value={peticion}
                        onChange={(e) => {
                            setPeticion(e.target.value)
                        }}
                        onKeyPress={(e) => e.key === 'Enter' ? addItem(e) : null}
                    />
                    <Button icon="pi pi-plus" className="p-button-success" label='Agregar'
                        onClick={(e) => addItem(e)}
                    />
                </div>
                <label htmlFor="">TIPO DE PETICIÓN</label>
            </span>
            {peticiones.map((p, i) =>
                <Chip key={i} label={p} className="mr-2 mb-2"
                    onDoubleClick={(e) => {
                        setPeticiones([
                            ...peticiones.slice(0, i),
                            ...peticiones.slice(i + 1)
                        ])
                    }}
                />
            )}
        </>
    );
}

export default TipoPeticion