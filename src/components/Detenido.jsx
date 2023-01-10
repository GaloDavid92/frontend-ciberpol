import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { DetenidoService } from '../services/DetenidoService';

const Detenido = ({ nombredetenido, idcondicion, idparentesco, selNombreDetenido, selIdCondicion, selIdParentesco }) => {
    const [nombreDetenido, setNombreDetenido] = useState("");
    const [condiciones, setCondiciones] = useState(null);
    const [condicion, setCondicion] = useState(null);
    const [parentescos, setParentescos] = useState(null);
    const [parentesco, setParentesco] = useState(null);

    const svcDetenido = new DetenidoService();

    useEffect(() => {
        svcDetenido.getCondiciones().then((data) => {
            setCondiciones(data)
        });
        svcDetenido.getParentescos().then((data) => {
            setParentescos(data)
        });
        if(selNombreDetenido){
            setNombreDetenido(selNombreDetenido)
        }
    }, []);
    
    useEffect(() => {
        if(condiciones && selIdCondicion){
            const result = condiciones.find( c => {
                return c.id === selIdCondicion
            })
            setCondicion(result)
        }
    }, [condiciones]);
    
    useEffect(() => {
        if(parentescos && selIdParentesco){
            const result = parentescos.find( c => {
                return c.id === selIdParentesco
            })
            setParentesco(result)
        }
    }, [parentescos]);


    return (
        <>
            <div className="field col-12 md:col-5">
                <span className="p-float-label">
                    <InputText id="txtNombreDetenido" value={nombreDetenido} className={!nombreDetenido && 'p-invalid'}
                        onChange={(e) => {
                            setNombreDetenido(e.target.value)
                            nombredetenido(e.target.value)
                        }} />
                    <label htmlFor="txtNombreDetenido">APELLIDOS Y NOMBRES DEL DETENIDO O SOPECHOSO</label>
                </span>
            </div>
            <div className="field col-12 md:col-2">
                <span className="p-float-label">
                    <Dropdown inputId="ddlCondicionDetenido" value={condicion} className={!condicion && 'p-invalid'}
                        options={condiciones}
                        onChange={(e) => {
                            setCondicion(e.value)
                            e.value ? idcondicion(e.value.id) : idcondicion(null)
                        }} filter optionLabel="condicion" />
                    <label htmlFor="ddlCondicionDetenido">CONDICIÓN</label>
                </span>
            </div>
            <div className="field col-12 md:col-5">
                <span className="p-float-label">
                    <Dropdown inputId="ddlParentezcoDetenido" value={parentesco} className={!parentesco && 'p-invalid'}
                        options={parentescos}
                        onChange={(e) => {
                            setParentesco(e.value)
                            e.value ? idparentesco(e.value.id) : idparentesco(null)
                        }} filter optionLabel="nombre" />
                    <label htmlFor="ddlParentezcoDetenido">PARENTESCO DEL DETENIDO O SOPECHOSO CON LA VICTIMA</label>
                </span>
            </div>
        </>
    )
}

export default Detenido