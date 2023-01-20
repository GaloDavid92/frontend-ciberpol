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

import TipoPeticion from './TipoPeticion';
import Detenidos from './Detenidos';

import { DelegacionService } from '../services/DelegacionService';

const DelegacionAgente = ({delegacionEdit, abrir}) => {

   const toast = useRef(null);

   const [saving, setSaving] = useState(false)

   const svcDelegacion = new DelegacionService()

   // const [delegacionEdit, setDelegacionEdit] = useState({})

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

   // useEffect(()=>{
   //    if(idDelegacion){
   //    svcDelegacion.getDelegacion(idDelegacion).then((resp)=> {
   //       console.log("🚀 ~ file: DelegacionAgente.jsx:69 ~ svcDelegacion.getDelegacion ~ resp", resp)
   //       setDelegacionEdit(resp)
   //    })
   // }
   // },[])

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
         id: delegacionEdit.id,
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
      svcDelegacion.updDelegacionAgente(objDelegacion).then((data) => {
         setSaving(false)
         toast.current.show({ severity: 'success', summary: 'Guardado', detail: 'Delegación actualizada con éxito' });
     });
   }

   const artic = () => {
      if (delegacionEdit.art444) {

         var articulos = Object.keys(delegacionEdit.art444).map(function (key) {
            if(key.startsWith("no") && delegacionEdit.art444[key])
            return <div className="field col-12 md:col-2">
                     <strong>{key}: </strong>
                     {delegacionEdit.art444[key]}
                  </div>
         });
         return articulos
      }
      else {
         return <did>Sin elementos</did>
      }
   }

   return (
      <div className='m-5'>
         <h1>Delegación</h1>
         <br />
         <div className="card">
            <Fieldset legend="Datos Preliminares">
               <br />
               <div className="p-fluid grid">
                  <div className="field col-12 md:col-6">
                     <strong>NÚMERO DE INVESTIGACIÓN PREVIA: </strong>
                     {delegacionEdit.numInvestPrevia}
                  </div>
                  <div className="field col-12 md:col-4">
                     <strong>NÚMERO DE INSTRUCCIÓN FISCAL: </strong>
                     {delegacionEdit.numInstFiscal}
                  </div>
                  <div className="field col-12 md:col-6">
                     <strong>MES DE INGRESO DE DISPOSICIONES FISCALES: </strong>
                     {delegacionEdit.mesIngreso}
                  </div>
                  <div className="field col-12 md:col-6">
                     <strong>UBICACIÓN: </strong>
                     {delegacionEdit.distrito && `${delegacionEdit.distrito.canton.provincia.zona.nombre} / ${delegacionEdit.distrito.canton.provincia.nombre} / ${delegacionEdit.distrito.canton.nombre} / ${delegacionEdit.distrito.nombre}`}
                  </div>
               </div>
            </Fieldset>
         </div>
         <div className='mt-3'>
            <Fieldset legend="Datos del Delito" toggleable collapsed>
               <div className="p-fluid grid">
                  <br />
                  <div className="field col-12 md:col-12">
                     <strong>SECCIÓN / DELITO: </strong>
                     {delegacionEdit.delito && `${delegacionEdit.delito.seccion.seccion} / ${delegacionEdit.delito.delito}`}
                  </div>
                  <div className="field col-12 md:col-6">
                     <strong>MODALIDAD: </strong>
                     {delegacionEdit.Modalidad && delegacionEdit.Modalidad.modalidad}
                  </div>
                  <div className="field col-12 md:col-6">
                     <strong>FECHA INFRACCIÓN: </strong>
                     {new Date(delegacionEdit.fechaInfraccion).toLocaleDateString('es-ES')}
                  </div>
               </div>
            </Fieldset>
         </div>
         <div className='mt-3'>
            <Fieldset legend="Datos de la víctima" toggleable collapsed>
               <br />
               <div className="p-fluid grid">
                  <div className="field col-12 md:col-12">
                     <strong>NOMBRE: </strong>
                     {delegacionEdit.nombreVictima}
                  </div>
                  <div className="field col-12 md:col-6">
                     <strong>SEXO: </strong>
                     {delegacionEdit.sexoVictima}
                  </div>
                  <div className="field col-12 md:col-6">
                     <strong>EDAD: </strong>
                     {delegacionEdit.edadVictima}
                  </div>
               </div>
            </Fieldset>
         </div>
         <div className='mt-3'>
            <Fieldset legend="Datos del Detenido" toggleable collapsed>
               <br />
               <div className="p-fluid grid">
                  <div className="field col-12 md:col-12">
                     <strong>NOMBRE: </strong>
                     {delegacionEdit.nombreDetenido}
                  </div>
                  <div className="field col-12 md:col-6">
                     <strong>CONDICIÓN: </strong>
                     {delegacionEdit.condicion && delegacionEdit.condicion.condicion}
                  </div>
                  <div className="field col-12 md:col-6">
                     <strong>PARENTESCO: </strong>
                     {delegacionEdit.parentesco && delegacionEdit.parentesco.nombre}
                  </div>
               </div>
            </Fieldset>
         </div>
         <div className='mt-3'>
            <Fieldset legend="Datos de Fiscalía" toggleable collapsed>
               <br />
               <div className="p-fluid grid">
                  <div className="field col-12 md:col-12">
                     <strong>NOMBRE DEL FISCAL: </strong>
                     {delegacionEdit.nombreFiscal}
                  </div>
                  <div className="field col-12 md:col-12">
                     <strong>UNIDAD ESPECIALIZADA DE FISCALIA: </strong>
                     {delegacionEdit.unidadFiscalia}
                  </div>
               </div>
            </Fieldset>
         </div>
         <div className='mt-3'>
            <Fieldset legend="Datos de la Delegación"  toggleable collapsed>
               <br />
               <div className="p-fluid grid">
                  
               <div className="field col-12 md:col-4">
                     <strong>FECHA DE LA DELEGACIÓN: </strong>
                     {new Date(delegacionEdit.fechaDelegacion).toLocaleDateString('es-ES')}
                  </div>
                  <div className="field col-12 md:col-4">
                     <strong>FEHA DE RECEPCIÓN EN LA PJ: </strong>
                     {new Date(delegacionEdit.fechaRecepcionPJ).toLocaleDateString('es-ES')}
                  </div>
                  <div className="field col-12 md:col-4">
                     <strong>FEECHA DE RECEPCION AGENTE INVESTIGADOR: </strong>
                     {new Date(delegacionEdit.fechaRecAgente).toLocaleDateString('es-ES')}
                  </div>
                  
                  <div className="field col-12 md:col-12">
                     <strong>Nº DE OFICIO CON LA QUE RECIBE LA DILIGENCIA EL AGENTE: </strong>
                     {delegacionEdit.numOficioRecAgente}
                  </div>
                  <div className="field col-12 md:col-12">
                     <strong>PLAZO OTORGADO: </strong>
                     {delegacionEdit.plazoOtorgado + ' DÍAS'} 
                  </div>
               </div>
               <br />
               <div className="p-fluid grid">
                  <div className="field col-12 md:col-12">
                     <strong>ART 444: </strong>
                  </div>
                   {delegacionEdit.art444 && artic()}
                  </div>

                  </Fieldset>
         </div>
         <div className='mt-3'>
            <Fieldset legend="Datos de la Delegación">
                  <div className="p-fluid grid">
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

export default DelegacionAgente