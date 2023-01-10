import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { AgenteService } from '../services/AgenteService';

const Agente = ({ idagente, idgrado, selAgente, selGrado}) => {

    const [grados, setGrados] = useState(null);
    const [agentes, setAgentes] = useState(null);
    const [grado, setGrado] = useState(null);
    const [agente, setAgente] = useState(null);

    const svcAgente = new AgenteService();

    useEffect(() => {
        svcAgente.getAgentes().then((data) => {
            setAgentes(data)
        });
        svcAgente.getGrados().then((data) => {
            setGrados(data)
        });
    }, []);

    useEffect(() => {
      if(selAgente){
        setAgente(selAgente)
      }
    }, [agentes])

    useEffect(() => {
      if(selGrado){
        setGrado(selGrado)
      }
    }, [agentes])
    


    return (
        <>
            <div className="field col-12 md:col-2">
                <span className="p-float-label">
                    <Dropdown inputId="ddlGrado" value={grado} options={grados} className={!grado && 'p-invalid'}
                        onChange={(e) => {
                            setGrado(e.value)
                            e.value ? idgrado(e.value.id) : idgrado(null)
                        }} optionLabel="nombre" />
                    <label htmlFor="ddlGrado">GRADO</label>
                </span>
            </div>
            <div className="field col-12 md:col-10">
                <span className="p-float-label">
                    <Dropdown inputId="ddlAgente" value={agente} options={agentes} className={!agente && 'p-invalid'}
                        onChange={(e) => {
                            setAgente(e.value)
                            e.value ? idagente(e.value.id) : idagente(null)
                        }} filter showClear optionLabel="nombre" />
                    <label htmlFor="ddlAgente">NOMBRE DEL AGENTE</label>
                </span>
            </div>
        </>
    )
}

export default Agente