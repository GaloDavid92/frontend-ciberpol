import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { UbicacionesService } from '../services/UbicacionesService';

const Ubicacion = ({ ubicacion }) => {
    const [zonas, setZonas] = useState(null);
    const [provincias, setProvincias] = useState(null);
    const [cantones, setCantones] = useState(null);
    const [distritos, setDistritos] = useState(null);

    const [zona, setZona] = useState(null);
    const [provincia, setProvincia] = useState(null);
    const [canton, setCanton] = useState(null);
    const [distrito, setDistrito] = useState(null);


    const ubicZones = new UbicacionesService();

    useEffect(() => {
        ubicZones.getZonas().then((data) => {
            setZonas(data)
        });
    }, []);

    return (
        <>
            <div className="field col-12 md:col-3">
                <span className="p-float-label">
                    <Dropdown inputId="ddlZona" value={zona} options={zonas} className={!zona && 'p-invalid'}
                        onChange={(e) => {
                            setZona(e.value)
                            ubicZones.getPovincias(e.value.id).then((data) => {
                                setProvincia(null)
                                setCanton(null)
                                setDistrito(null)
                                setProvincias(data)
                            })
                        }}
                        optionLabel="nombre" />
                    <label htmlFor="ddlZona">ZONA</label>
                </span>
            </div>
            <div className="field col-12 md:col-3">
                <span className="p-float-label">
                    <Dropdown inputId="ddlProvincia" value={provincia} options={provincias} className={!provincia && 'p-invalid'}
                        onChange={(e) => {
                            setProvincia(e.value)
                            ubicZones.getCantones(e.value.id).then((data) => {
                                setCanton(null)
                                setDistrito(null)
                                setCantones(data)
                            })
                        }}
                        optionLabel="nombre" />
                    <label htmlFor="ddlProvincia">PROVINCIA</label>
                </span>
            </div>
            <div className="field col-12 md:col-3">
                <span className="p-float-label">
                    <Dropdown inputId="ddlCanton" value={canton} options={cantones} className={!canton && 'p-invalid'}
                        onChange={(e) => {
                            setCanton(e.value)
                            ubicZones.getDistritos(e.value.id).then((data) => {
                                setDistrito(null)
                                setDistritos(data)
                            })
                        }}
                        optionLabel="nombre" />
                    <label htmlFor="ddlCanton">CANTÓN</label>
                </span>
            </div>
            <div className="field col-12 md:col-3">
                <span className="p-float-label">
                    <Dropdown inputId="ddlDistrito" value={distrito} options={distritos} className={!distrito && 'p-invalid'}
                        onChange={(e) => {
                            setDistrito(e.value)
                            e.value ? ubicacion(e.value.id) : ubicacion(null)
                        }}
                        optionLabel="nombre" />
                    <label htmlFor="ddlDistrito">DISTRITO</label>
                </span>
            </div>
        </>
    )
}

export default Ubicacion