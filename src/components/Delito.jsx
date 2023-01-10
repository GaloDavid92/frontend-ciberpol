import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { DelitoService } from '../services/DelitoService';

const Delito = ({iddelito, idmodalidad, fechainfraccion, selDelito, selIdModalidad, selFecha}) => {

    const [secciones, setSecciones] = useState(null);
    const [delitos, setDelitos] = useState(null);
    const [modalidades, setModalidades] = useState(null);
    const [seccion, setSeccion] = useState(null);
    const [delito, setDelito] = useState(null);
    const [modalidad, setModalidad] = useState(null);
    const [fecha, setFecha] = useState(null);

    const svcDelito = new DelitoService();

    useEffect(() => {
        svcDelito.getDelitos().then((data) => {
            setSecciones(data)
        });
        svcDelito.getModalidades().then((data) => {
            setModalidades(data)
        });
        if(selFecha){
            setFecha(new Date(selFecha))
        }
    }, []);

    useEffect(() => {
        if (selDelito && secciones) {
                const result = secciones.find(sec => {
                    return sec.id === selDelito.seccion.id
                })
                setSeccion(result)
                setDelitos(result.delitos)
        }
    }, [secciones])

    useEffect(() => {
        if(selDelito && delitos){
            const result = delitos.find(d => {
                return d.id === selDelito.id
            })
            setDelito(result)
        }        
    }, [delitos])

    useEffect(()=>{
        if(selIdModalidad && modalidades){
            const result = modalidades.find( m => {
                return m.id === selIdModalidad
            })
            setModalidad(result)
        }
    }, [modalidades])


    return (
        <>
            <div className="field col-12 md:col-4">
                <span className="p-float-label">
                    <Dropdown inputId="ddlSeccion" value={seccion} options={secciones} className={!seccion && 'p-invalid'}
                        onChange={(e) => {
                            
                            setDelitos(null)
                            setSeccion(e.value)
                            e.value != null ? setDelitos(e.value.delitos): setDelitos(null)
                            setDelito(null)
                        }}
                        filter showClear optionLabel="seccion" />
                    <label htmlFor="ddlSeccion">SECCIÓN</label>
                </span>
            </div>
            <div className="field col-12 md:col-4">
                <span className="p-float-label">
                    <Dropdown inputId="ddlDelito" value={delito} options={delitos} className={!delito && 'p-invalid'}
                        onChange={(e) => {
                            setDelito(e.value)
                            e.value ? iddelito(e.value.id) : iddelito(null)
                        }}
                        filter showClear optionLabel="delito" />
                    <label htmlFor="ddlDelito">DELITO TIPIFICADO</label>
                </span>
            </div>
            <div className="field col-12 md:col-2">
                <span className="p-float-label">
                    <Dropdown inputId="ddlModalidad" value={modalidad} options={modalidades} className={!modalidad && 'p-invalid'}
                        onChange={(e) => {
                            setModalidad(e.value)
                            e.value ? idmodalidad(e.value.id) : idmodalidad(null)
                        }} filter optionLabel="modalidad" />
                    <label htmlFor="ddlModalidad">MODALIDAD</label>
                </span>
            </div>
            <div className="field col-12 md:col-2">
                <span className="p-float-label">
                    <Calendar id="calendar" value={fecha} className={!fecha && 'p-invalid'}
                        onChange={(e) => {
                            setFecha(e.value)
                            fechainfraccion(e.value)
                        }} />
                    <label htmlFor="calendar">FECHA INFRACIÓN</label>
                </span>
            </div>
        </>
    )
}

export default Delito