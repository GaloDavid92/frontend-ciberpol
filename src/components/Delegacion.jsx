import React, { useState, useEffect, useRef } from 'react';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import Ubicacion from './Ubicacion';
import Agente from './Agente';
import Delito from './Delito';
import Detenido from './Detenido';
import Art444 from './Art444';
import TipoPeticion from './TipoPeticion';
import Detenidos from './Detenidos';

import { DelegacionService } from '../services/DelegacionService';

const Delegacion = ({abrir}) => {

   const toast = useRef(null);

   const [saving, setSaving] = useState(false)

   const svcDelegacion = new DelegacionService()

   const [mesIngreso, setMesIngreso] = useState(null)
   const [numInvestPrevia, setNumInvestPrevia] = useState("")
   const [numInstFiscal, setNumInstFiscal] = useState("")
   const [idDistrito, setIdDistrito] = useState(null)
   const [idAgente, setIdAgente] = useState(null)
   const [idGrado, setIdGrado] = useState(null)
   const [idDelito, setIdDelito] = useState(null)
   const [idModalidad, setIdModalidad] = useState(null)
   const [fechaInfraccion, setFechaInfraccion] = useState(null)
   const [nombreVictima, setNombreVictima] = useState("")
   const [sexoVictima, setSexoVictima] = useState(null)
   const [edadVictima, setEdadVictima] = useState(0)
   const [nombreDetenido, setNombreDetenido] = useState(null)
   const [idCondicion, setIdCondicion] = useState(null)
   const [idParentesco, setIdParentesco] = useState(null)
   const [nombreFiscal, setNombreFiscal] = useState("")
   const [unidadFiscalia, setUnidadFiscalia] = useState("")
   const [fechaDelegacion, setFechaDelegacion] = useState("")
   const [fechaRecepcionPJ, setFechaRecepcionPJ] = useState("")
   const [fechaRecAgente, setFechaRecAgente] = useState("")
   const [numOficioRecAgente, setNumOficioRecAgente] = useState("")
   const [plazoOtorgado, setPlazoOtorgado] = useState(0)
   const [art444, setArt444] = useState({})
   const [cumplimiento, setCumplimiento] = useState("")
   const [fechaCumplimiento, setFechaCumplimiento] = useState("")
   const [numOficioDescargo, setNumOficioDescargo] = useState("")
   const [numVersiones, setNumVersiones] = useState(0)
   const [recLugarHechos, setRecLugarHechos] = useState(0)
   const [detPosibResp, setDetPosibResp] = useState(false)
   const [compareceSospechoso, setCompareceSospechoso] = useState(false)
   const [peticionFiscalia, setPeticionFiscalia] = useState(false)
   const [tiposPeticiones, setTiposPeticiones] = useState([])
   const [informeODescargo, setInformeODescargo] = useState(null)
   const [causasIncumplimiento, setCausasIncumplimiento] = useState("")
   const [detenidosProdInv, setDetenidosProdInv] = useState([])
   const [observaciones, setObservaciones] = useState("")



   const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
   ];
   const sexos = [
      "Masculino",
      "Femenino"
   ]

   const saveDelegacion = () => {      
      setSaving(true)
      const objDelegacion = {
         mesIngreso,
         numInvestPrevia,
         numInstFiscal,
         idDistrito,
         idAgente,
         idGrado,
         idDelito,
         idModalidad,
         fechaInfraccion,
         nombreVictima,
         sexoVictima,
         edadVictima,
         nombreDetenido,
         idCondicion,
         idParentesco,
         nombreFiscal,
         unidadFiscalia,
         fechaDelegacion,
         fechaRecepcionPJ,
         fechaRecAgente,
         numOficioRecAgente,
         plazoOtorgado,
         art444,
         cumplimiento,
         fechaCumplimiento,
         numOficioDescargo,
         numVersiones,
         recLugarHechos,
         detPosibResp,
         compareceSospechoso,
         peticionFiscalia,
         tiposPeticiones: tiposPeticiones.map(nombre => ({nombre})),
         informeODescargo,
         causasIncumplimiento,
         detenidosProdInv: detenidosProdInv.map(nombre => ({nombre})),
         observaciones
      }
      svcDelegacion.saveDelegacion(objDelegacion).then((data) => {
         console.log("🚀 ~ file: Delegacion.jsx ~ line 123 ~ resp=svcDelegacion.saveDelegacion ~ data", data)
         setSaving(false)
         toast.current.show({ severity: 'success', summary: 'Guardado', detail: 'Delegación actualizada con éxito' });
     });
   }

   return (
      <div className='m-5'>
         <h1>Delegación</h1>
         <br />
         <div className="card">
            <Fieldset legend="Datos Preliminares">
               <br />
               <div className="p-fluid grid">
                  <div className="field col-12 md:col-4">
                     <span className="p-float-label">
                        <InputText id="txtNumInv" value={numInvestPrevia}
                           onChange={(e) => {
                              setNumInvestPrevia(e.target.value)
                           }} />
                        <label htmlFor="txtNumInv">NÚMERO DE INVESTIGACIÓN PREVIA</label>
                     </span>
                  </div>
                  <div className="field col-12 md:col-4">
                     <span className="p-float-label">
                        <InputText id="txtNumInsFis" value={numInstFiscal}
                           onChange={(e) => setNumInstFiscal(e.target.value)} />
                        <label htmlFor="txtNumInsFis">NÚMERO DE INSTRUCCIÓN FISCAL</label>
                     </span>
                  </div>
                  <div className="field col-12 md:col-4">
                     <span className="p-float-label">
                        <Dropdown inputId="ddlMesIngreso" value={mesIngreso} options={meses} showClear
                           onChange={(e) => {
                              setMesIngreso(e.value)
                              console.log("🚀 ~ file: Delegacion.jsx ~ line 171 ~ Delegacion ~ value", cumplimiento)
                           }}
                           />
                        <label htmlFor="ddlMesIngreso">MES DE INGRESO DE DISPOSICIONES FISCALES</label>
                     </span>
                  </div>
                  <Ubicacion ubicacion={setIdDistrito} />
                  <Agente idagente={setIdAgente} idgrado={setIdGrado} />

               </div>
            </Fieldset>
         </div>
         <div className='mt-3'>
            <Fieldset legend="Datos del Delito">
               <br />
               <div className="p-fluid grid">
                  <Delito iddelito={setIdDelito} idmodalidad={setIdModalidad} fechainfraccion={setFechaInfraccion} />
               </div>
            </Fieldset>
         </div>
         <div className='mt-3'>
            <Fieldset legend="Datos de la víctima">
               <br />
               <div className="p-fluid grid">
                  <div className="field col-12 md:col-6">
                     <span className="p-float-label">
                        <InputText id="txtApeNomVictima" value={nombreVictima} onChange={(e) => setNombreVictima(e.target.value)} />
                        <label htmlFor="txtApeNomVictima">APELLIDOS Y NOMBRES DE LA VÍCTIMA</label>
                     </span>
                  </div>
                  <div className="field col-12 md:col-3">
                     <span className="p-float-label">
                        <Dropdown inputId="ddlSexoVictima" value={sexoVictima} options={sexos} onChange={(e) => setSexoVictima(e.value)} />
                        <label htmlFor="ddlSexoVictima">SEXO</label>
                     </span>
                  </div>
                  <div className="field col-12 md:col-3">
                     <span className="p-float-label">
                        <InputNumber inputId="txtNumInsFis" value={edadVictima} onChange={(e) => setEdadVictima(e.value)} />
                        <label htmlFor="txtNumInsFis">EDAD</label>
                     </span>
                  </div>
               </div>
            </Fieldset>
         </div>
         <div className='mt-3'>
            <Fieldset legend="Datos del Detenido">
               <br />
               <div className="p-fluid grid">
                  <Detenido nombredetenido={setNombreDetenido} idcondicion={setIdCondicion} idparentesco={setIdParentesco} />
               </div>
            </Fieldset>
         </div>
         <div className='mt-3'>
            <Fieldset legend="Datos de Fiscalía">
               <br />
               <div className="p-fluid grid">
                  <div className="field col-12 md:col-6">
                     <span className="p-float-label">
                        <InputText id="txtNombreFiscal" value={nombreFiscal} onChange={(e) => setNombreFiscal(e.target.value)} />
                        <label htmlFor="txtNombreFiscal">APELLIDOS Y NOMBRES DEL FISCAL</label>
                     </span>
                  </div>
                  <div className="field col-12 md:col-6">
                     <span className="p-float-label">
                        <InputText id="txtUnidadFiscalia" value={unidadFiscalia} onChange={(e) => setUnidadFiscalia(e.target.value)} />
                        <label htmlFor="txtUnidadFiscalia">UNIDAD ESPECIALIZADA DE FISCALIA</label>
                     </span>
                  </div>
               </div>
            </Fieldset>
         </div>
         <div className='mt-3'>
            <Fieldset legend="Datos de la Delegación">
               <br />
               <div className="p-fluid grid">
                  <div className="field col-12 md:col-4">
                     <span className="p-float-label">
                        <Calendar id="calFechaDelegacion" value={fechaDelegacion} onChange={(e) => setFechaDelegacion(e.value)} />
                        <label htmlFor="calFechaDelegacion">FECHA DE LA DELEGACIÓN</label>
                     </span>
                  </div>
                  <div className="field col-12 md:col-4">
                     <span className="p-float-label">
                        <Calendar id="calFechaRecPJ" value={fechaRecepcionPJ} onChange={(e) => setFechaRecepcionPJ(e.value)} />
                        <label htmlFor="calFechaRecPJ">FECHA DE RECEPCIÓN EN LA PJ</label>
                     </span>
                  </div>
                  <div className="field col-12 md:col-4">
                     <span className="p-float-label">
                        <Calendar id="calFechaRecAgente" value={fechaRecAgente} onChange={(e) => setFechaRecAgente(e.value)} />
                        <label htmlFor="calFechaRecAgente">FECHA DE RECEPCION AGENTE INVESTIGADOR</label>
                     </span>
                  </div>
                  <div className="field col-12 md:col-8">
                     <span className="p-float-label">
                        <InputText id="txtNumOficioRecAgente" value={numOficioRecAgente} onChange={(e) => setNumOficioRecAgente(e.target.value)} />
                        <label htmlFor="txtNumOficioRecAgente">Nº DE OFICIO CON LA QUE RECIBE LA DILIGENCIA EL AGENTE</label>
                     </span>
                  </div>
                  <div className="field col-12 md:col-4">
                     <span className="p-float-label">
                        <InputNumber value={plazoOtorgado}
                           onValueChange={(e) => {
                              setPlazoOtorgado(e.value)
                           }}
                           showButtons buttonLayout="horizontal" decrementButtonClassName="p-button-info" incrementButtonClassName="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" prefix="Plazo otorgado: " suffix=" días" />
                     </span>
                  </div>
               </div>
               <br />
               <div className="p-fluid grid">
                  <Art444 a444={setArt444} />

                  <div className="field col-12 md:col-6">
                     <span className="p-float-label">
                        <Dropdown inputId="ddlCumplimiento" value={cumplimiento} options={["PARCIAL", "TOTAL",]}
                           onChange={(e) => setCumplimiento(e.value)} />
                        <label htmlFor="ddlCumplimiento">CUMPLIMIENTO</label>
                     </span>
                  </div>
                  <div className="field col-12 md:col-6">
                     <span className="p-float-label">
                        <Calendar id="calCumplimiento" value={fechaCumplimiento} onChange={(e) => setFechaCumplimiento(e.value)} />
                        <label htmlFor="calCumplimiento">FECHA CUMPLIMIENTO O DESCARGO DE DELEGACION</label>
                     </span>
                  </div>
                  <div className="field col-12 md:col-8">
                     <span className="p-float-label">
                        <InputText id="txtNumOficioDescargo" value={numOficioDescargo} onChange={(e) => setNumOficioDescargo(e.target.value)} />
                        <label htmlFor="txtNumOficioDescargo">Nº DE OFICIO DE DESCARGO</label>
                     </span>
                  </div>
                  <div className="field col-12 md:col-4">
                     <span className="p-float-label">
                        <InputNumber value={numVersiones} onValueChange={(e) => setNumVersiones(e.value)} showButtons buttonLayout="horizontal" decrementButtonClassName="p-button-info" incrementButtonClassName="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" prefix="Número de versiones: " suffix="" />
                     </span>
                  </div>
                  <div className="field col-12 md:col-4">
                     <span className="p-float-label">
                        <InputNumber value={recLugarHechos} onValueChange={(e) => setRecLugarHechos(e.value)} showButtons buttonLayout="horizontal" decrementButtonClassName="p-button-info" incrementButtonClassName="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" prefix="REC LUGAR DE LOS HECHOS: " suffix="" />
                     </span>
                  </div>
                  <div className="field col-12 md:col-4">
                     <span className="p-label">
                        <ToggleButton checked={detPosibResp} onChange={(e) => setDetPosibResp(e.value)} onIcon="pi pi-check" offIcon="pi pi-times" aria-label="Confirmation" onLabel="DETERMINO POSIBLES RESPONSABLES: SI" offLabel="DETERMINO POSIBLES RESPONSABLES: NO" />
                     </span>
                  </div>
                  <div className="field col-12 md:col-4">
                     <span className="p-label">
                        <ToggleButton checked={compareceSospechoso}
                           onChange={(e) => {
                              setCompareceSospechoso(e.value)
                           }} onIcon="pi pi-check" offIcon="pi pi-times" aria-label="Confirmation" onLabel="COMPARECENCIA DEL SOSPECHOSO: SI" offLabel="COMPARECENCIA DEL SOSPECHOSO: NO" />
                     </span>
                  </div>
                  <div className="field col-12 md:col-4">
                     <span className="p-label">
                        <ToggleButton checked={peticionFiscalia} onChange={(e) => setPeticionFiscalia(e.value)} onIcon="pi pi-check" offIcon="pi pi-times" aria-label="Confirmation" onLabel="PETICIONES A FISCALIA: SI" offLabel="PETICIONES A FISCALIA: NO" />
                     </span>
                  </div>
                  <div className="field col-12 md:col-8">
                     <TipoPeticion peticiones={tiposPeticiones} setPeticiones={setTiposPeticiones} />
                  </div>
                  <div className="field col-12 md:col-4">
                     <span className="p-float-label">
                        <Dropdown inputId="ddlParteDescargo" value={informeODescargo} options={["PARTE INFORMATIVO", "PARTE DE DESCARGO"]} onChange={(e) => setInformeODescargo(e.value)} />
                        <label htmlFor="ddlParteDescargo">INFORME O DESCARGO</label>
                     </span>
                  </div>
                  <div className="field col-12 md:col-8">
                     <span className="p-float-label">
                        <InputText id="txtCausasIncumplimiento" value={causasIncumplimiento} onChange={(e) => setCausasIncumplimiento(e.target.value)} />
                        <label htmlFor="txtCausasIncumplimiento">CAUSAS DEL INCUMPLIMIENTO DE LA INVESTIGACIÓN</label>
                     </span>
                  </div>
                  <div className="field col-12 md:col-6">
                     <Detenidos detenidos={detenidosProdInv} setDetenidos={setDetenidosProdInv} />
                  </div>
                  <div className="field col-12 md:col-6">
                     <span className="p-float-label">
                        <InputTextarea id="txtObservaciones" value={observaciones} onChange={(e) => setObservaciones(e.target.value)} rows={5} />
                        <label htmlFor="txtObservaciones">OBSERVACIONES</label>
                     </span>
                  </div>
               </div>
            </Fieldset>
         </div>
         <div className="card">
            <div className="relative mx-3 my-3 md:my-0 border-round">
               <div className="text-white font-bold flex align-items-center mt-5 justify-content-center border-round">
                  <Button label="Guardar" onClick={(e) => saveDelegacion()} icon={saving ? "pi pi-spin pi-spinner" : "pi pi-save"} disabled={saving} className='m-2 p-button-success' />
                  <Button label="Cerrar" onClick={(e) => abrir(false)} icon="pi pi-times" className='m-2 p-button-danger' />
                  <Toast ref={toast} />
               </div>
            </div>
         </div>
      </div>
   );
}

export default Delegacion