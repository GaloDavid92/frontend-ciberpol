import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';

const Detenidos = ({ detenidos, setDetenidos }) => {

    // const [peticiones, setPeticiones] = useState([])
    const [detenido, setDetenido] = useState([])

    const addItem = (e) => {
        detenido != "" ? setDetenidos([...detenidos, detenido]) : null
        setDetenido("")
    }

    return (
        <>
            <span className="p-float-label">
                <div className="p-inputgroup">
                    <InputText placeholder="Añadir Petición" value={detenido}
                        onChange={(e) => {
                            setDetenido(e.target.value)
                        }}
                        onKeyPress={(e) => e.key === 'Enter' ? addItem(e) : null}
                    />
                    <Button icon="pi pi-plus" className="p-button-success" label='Agregar'
                        onClick={(e) => addItem(e)}
                    />
                </div>
                <label htmlFor="">DETENIDOS PRODUCTO DE LA INVESTIGACIÓN</label>
            </span>
            {detenidos.map((p, i) =>
                <Chip key={i} label={p} className="mr-2 mb-2"
                    onDoubleClick={(e) => {
                        setDetenidos([
                            ...detenidos.slice(0, i),
                            ...detenidos.slice(i + 1)
                        ])
                    }}
                />
            )}
        </>
    );
}

export default Detenidos