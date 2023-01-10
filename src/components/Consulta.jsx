import { useState } from 'react'
import { Menubar } from 'primereact/menubar';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import uncLogo from '../assets/LOGOUNC.png'
import fondo from "../assets/fondo.jpg";
import { DelegacionService } from '../services/DelegacionService';

const Consulta = ({ isConsulting, setIsConsulting }) => {

    const [busqueda, setBusqueda] = useState('');
    const [delegacion, setdelegacion] = useState(null)

    const svcDelegacion = new DelegacionService()

    const start =
        <>
            <div className="flex-none flex  justify-content-center font-bold text-white m-2 px-3 py-1 border-round">
                <img src={uncLogo} height={'50px'} />
                <p style={{ color: 'black' }}>&nbsp;CIBERPOL</p>
            </div>
        </>;


    const end = <Button icon="pi pi-bookmark" className="p-button-text p-button-plain"
        label={isConsulting ? "Ingresar al sistema" : "Consultas"}
        onClick={() => {
            setIsConsulting(!isConsulting)
        }}
    />;

    const header = (
        <img alt="Card" src={fondo} height={'100px'} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
    );

    const deleg = () => {
        if (delegacion)
            return <Card>
                <div className="card">
                    <div class="flex card-container indigo-container">
                        <div className="flex-1 p-4 border-round">
                            <b>Cumplimiento: </b>{delegacion.cumplimiento} <br />
                            <b>Fecha de cumplimiento: </b>{delegacion.fechaCumplimiento} <br />
                            <b>Número de oficio o descargo: </b>{delegacion.numOficioDescargo} <br />
                            <b>Número de Versiones: </b>{delegacion.numVersiones} <br />
                            <b>Reconocimiento del  Lugar de los Hechos: </b>{delegacion.recLugarHechos} <br />
                            <b>Se determinó posibles responsables: </b>{delegacion.detPosibResp ? "Si" : "No"} <br />
                            <b>Comparecencia del Sospechoso: </b>{delegacion.compareceSospechoso ? "Si" : "No"} <br />
                            <b>Peticiones a Fiscalia: </b>{delegacion.peticionFiscalia ? "Si" : "No"} <br />
                        </div>
                        <div className="flex-1 p-4 border-round mx-4">
                            <b>Tipos de Peticiones: </b><br />
                            {delegacion.tiposPeticiones.map((tipo, i) =>
                                <li key={i}>{tipo.nombre}</li>
                            )}
                            <b>Informe o Descargo: </b>{delegacion.informeODescargo} <br />
                            <b>Causas de Incumplimiento: </b>{delegacion.causasIncumplimiento} <br />
                            <b>Detenidos : </b><br />
                            {delegacion.detenidosProdInv.map((detenido, i) =>
                                <li key={i}>{detenido.nombre}</li>
                            )}
                            <b>Peticiones a Fiscalia: </b>{delegacion.observaciones} <br />

                        </div>
                    </div>
                </div>
            </Card>
        else return "Sin datos"
    }

    return (
        <div>
            <div className="card">
                <Menubar start={start} end={end} />
            </div>
            {isConsulting && <Card title="Busqueda" subTitle="Delegaciones" style={{ width: '100%' }} header={header}>
                <h5>Número de Investigación previa o Instrucción Fiscal:</h5>
                <div className="col-12 md:col-4">
                    <div className="p-inputgroup">
                        <InputText placeholder="Búsqueda de delegaciones..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                        <Button icon="pi pi-search" className="p-button-info"
                            onClick={() => {
                                svcDelegacion.consultDelegacion(busqueda).then((resp) => {
                                    console.log("🚀 ~ file: Consulta.jsx:51 ~ svcDelegacion.consultDelegacion ~ resp", resp);
                                    setdelegacion(resp)
                                })
                            }}
                        />
                    </div>
                </div>
                <p className="m-0" style={{ lineHeight: '1.5' }}>
                    {deleg()}
                </p>
            </Card>}
        </div>
    );
}

export default Consulta