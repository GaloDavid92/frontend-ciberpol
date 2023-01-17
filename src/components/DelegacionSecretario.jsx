import React, { useState, useEffect, useRef } from 'react';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

import Ubicacion from './Ubicacion';
import Agente from './Agente';
import Delito from './Delito';
import Detenido from './Detenido';
import Art444 from './Art444';

import { DelegacionService } from '../services/DelegacionService';

const DelegacionSecretario = ({ abrir, mode, selectedDelegacion }) => {

   const toast = useRef(null);

   const [saving, setSaving] = useState(false)
   const [showMessage, setShowMessage] = useState(false);

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


   useEffect(() => {
      if (mode && mode == "U") {
         setMesIngreso(selectedDelegacion.mesIngreso)
         setNumInvestPrevia(selectedDelegacion.numInvestPrevia)
         setNumInstFiscal(selectedDelegacion.numInstFiscal)
         setIdDistrito(selectedDelegacion.idDistrito)
         setIdAgente(selectedDelegacion.idAgente)
         setIdGrado(selectedDelegacion.idGrado)
         setIdDelito(selectedDelegacion.idDelito)
         setIdModalidad(selectedDelegacion.idModalidad)
         setFechaInfraccion(selectedDelegacion.fechaInfraccion)
         setNombreVictima(selectedDelegacion.nombreVictima)
         setSexoVictima(selectedDelegacion.sexoVictima)
         setEdadVictima(selectedDelegacion.edadVictima)
         setNombreDetenido(selectedDelegacion.nombreDetenido)
         setIdCondicion(selectedDelegacion.idCondicion)
         setIdParentesco(selectedDelegacion.idParentesco)
         setNombreFiscal(selectedDelegacion.nombreFiscal)
         setUnidadFiscalia(selectedDelegacion.unidadFiscalia)
         setFechaDelegacion(selectedDelegacion.fechaDelegacion)
         setFechaRecepcionPJ(selectedDelegacion.fechaRecepcionPJ)
         setFechaRecAgente(selectedDelegacion.fechaRecAgente)
         setNumOficioRecAgente(selectedDelegacion.numOficioRecAgente)
         setPlazoOtorgado(selectedDelegacion.plazoOtorgado)
         setArt444(selectedDelegacion.art444)
      }
      let fecha = selectedDelegacion.fechaDelegacion
      console.log("🚀 ~ file: DelegacionSecretario.jsx:81 ~ useEffect ~ fechaDelegacion", fecha) //2022-12-06T05:00:00.000Z
   }, [])



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
      "Femenino",
   ]

   function validate() {
      let errors = {};

      if (!mesIngreso) {
         errors.mesIngreso = 'Seleccione el mes de ingreso';
      }
      if (!numInvestPrevia && !numInstFiscal) {
         errors.numInvestPrevia = 'El número de investigacion previa o instruccion fiscal es requerido.';
      }
      // if (!numInstFiscal) {
      //    errors.numInstFiscal = 'El número de instrucción fiscal es requerido.';
      // }
      if (!idDistrito) {
         errors.idDistrito = 'Zona/Provincia/Cantón/Distrito requeridos';
      }
      if (!idAgente) {
         errors.idAgente = 'Seleccione el agente investigador.';
      }
      if (!idGrado) {
         errors.idGrado = 'Seleccione el grado del agente';
      }
      if (!idDelito) {
         errors.idDelito = 'Seleccione la sección y delito';
      }
      if (!idModalidad) {
         errors.idModalidad = 'Seleccione la modalidad del delito';
      }
      if (!fechaInfraccion) {
         errors.fechaInfraccion = 'Selecione la fecha de infracción';
      }
      if (!nombreVictima) {
         errors.nombreVictima = 'Nombre de la víctima requerido';
      }
      if (!sexoVictima) {
         errors.sexoVictima = 'Seleccione el sexo de la víctima';
      }
      if (!edadVictima) {
         errors.edadVictima = 'Edad de la víctima requerida';
      }
      if (!nombreDetenido) {
         errors.nombreDetenido = 'Nombre del detenido requerido';
      }
      if (!idCondicion) {
         errors.idCondicion = 'Seleccione la condición del detenido';
      }
      if (!idParentesco) {
         errors.idParentesco = 'Seleccione el parentezco';
      }
      if (!nombreFiscal) {
         errors.nombreFiscal = 'Nombre del Fiscal requerido';
      }
      if (!unidadFiscalia) {
         errors.unidadFiscalia = 'Ingrese la unidad especializada de fiscalía';
      }
      if (!fechaDelegacion) {
         errors.fechaDelegacion = 'Seleccione la fecha de delegación';
      }
      if (!fechaRecepcionPJ) {
         errors.fechaRecepcionPJ = 'Seleccione la fecha de recepcion en la PJ';
      }
      if (!fechaRecAgente) {
         errors.fechaRecAgente = 'Seleccione la fecha de recepción del agente investigador';
      }
      if (!numOficioRecAgente) {
         errors.numOficioRecAgente = 'Ingrese el número de oficio con la que recibe la diligancia el agente';
      }
      if (!plazoOtorgado) {
         errors.plazoOtorgado = 'Ingrese el plazo otorgado';
      }
      return errors;
   }

   const saveDelegacion = () => {
      const errores = validate()
      if (Object.keys(errores).length !== 0) {
         toast.current.show({ severity: 'error', summary: 'Campos requeridos', detail: 'Ingrese todos los campos reueridos' });
      } else {
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
            nombreVictima: nombreVictima.toUpperCase(),
            sexoVictima,
            edadVictima,
            nombreDetenido: nombreDetenido.toUpperCase(),
            idCondicion,
            idParentesco,
            nombreFiscal: nombreFiscal.toUpperCase(),
            unidadFiscalia: unidadFiscalia.toUpperCase(),
            fechaDelegacion,
            fechaRecepcionPJ,
            fechaRecAgente,
            numOficioRecAgente,
            plazoOtorgado,
            art444,
         }
         setSaving(true)
         svcDelegacion.saveDelegacion(objDelegacion).then((data) => {
            if (data.id) {
               setShowMessage(true)
            }
            else {
               toast.current.show({ severity: 'error', summary: 'Error', detail: 'A ocurrido algun error' });
               setSaving(false)
            }
         });
      }
   }

   return (
      <>
         <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
            <div className="flex align-items-center flex-column pt-6 px-3">
               <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
               <h5>Delegación Guardada!</h5>
               <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                  Se ha registrado exitosamente
               </p>
               <Button label='Ok' onClick={() => abrir(false)} />
            </div>
         </Dialog>
         <div className='m-5'>
            <h1>Delegación</h1>
            <br />
            <div className="card">
               <Fieldset legend="Datos Preliminares">
                  <br />
                  <div className="p-fluid grid">
                     <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                           <InputText id="txtNumInv" value={numInvestPrevia} className={!numInvestPrevia &&!numInstFiscal && 'p-invalid'}
                              onChange={(e) => {
                                 setNumInvestPrevia(e.target.value)
                              }} />
                           <label htmlFor="txtNumInv">NÚMERO DE INVESTIGACIÓN PREVIA</label>
                        </span>
                     </div>
                     <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                           <InputText id="txtNumInsFis" value={numInstFiscal} className={!numInvestPrevia &&!numInstFiscal && 'p-invalid'}
                              onChange={(e) => setNumInstFiscal(e.target.value)} />
                           <label htmlFor="txtNumInsFis">NÚMERO DE INSTRUCCIÓN FISCAL</label>
                        </span>
                     </div>
                     <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                           <Dropdown inputId="ddlMesIngreso" value={mesIngreso} options={meses} className={!mesIngreso && 'p-invalid'}
                              onChange={(e) => {
                                 setMesIngreso(e.value)
                              }}
                              showClear
                           />
                           <label htmlFor="ddlMesIngreso">MES DE INGRESO DE DISPOSICIONES FISCALES</label>
                        </span>
                     </div>

                     <Ubicacion ubicacion={setIdDistrito} selDistrito={selectedDelegacion && selectedDelegacion.distrito} />

                     <Agente idagente={setIdAgente} idgrado={setIdGrado} selAgente={selectedDelegacion && selectedDelegacion.agente} selGrado={selectedDelegacion && selectedDelegacion.grado} />

                  </div>
               </Fieldset>
            </div>
            <div className='mt-3'>
               <Fieldset legend="Datos del Delito">
                  <br />
                  <div className="p-fluid grid">
                     <Delito iddelito={setIdDelito} idmodalidad={setIdModalidad} fechainfraccion={setFechaInfraccion} selDelito={selectedDelegacion && selectedDelegacion.delito} selIdModalidad={selectedDelegacion && selectedDelegacion.idModalidad} selFecha={selectedDelegacion && selectedDelegacion.fechaInfraccion} />
                  </div>
               </Fieldset>
            </div>
            <div className='mt-3'>
               <Fieldset legend="Datos de la víctima">
                  <br />
                  <div className="p-fluid grid">
                     <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                           <InputText id="txtApeNomVictima" value={nombreVictima.toUpperCase()} className={!nombreVictima && 'p-invalid'}
                              onChange={(e) => setNombreVictima(e.target.value)} />
                           <label htmlFor="txtApeNomVictima">APELLIDOS Y NOMBRES DE LA VÍCTIMA</label>
                        </span>
                     </div>
                     <div className="field col-12 md:col-3">
                        <span className="p-float-label">
                           <Dropdown inputId="ddlSexoVictima" value={sexoVictima} className={!sexoVictima && 'p-invalid'}
                              options={sexos} onChange={(e) => setSexoVictima(e.value)} />
                           <label htmlFor="ddlSexoVictima">SEXO</label>
                        </span>
                     </div>
                     <div className="field col-12 md:col-3">
                        <span className="p-float-label">
                           <InputNumber inputId="txtNumInsFis" value={edadVictima} className={!edadVictima && 'p-invalid'}
                              onChange={(e) => setEdadVictima(e.value)} />
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
                     <Detenido nombredetenido={setNombreDetenido} idcondicion={setIdCondicion} idparentesco={setIdParentesco} selNombreDetenido={selectedDelegacion && selectedDelegacion.nombreDetenido} selIdCondicion={selectedDelegacion && selectedDelegacion.idCondicion} selIdParentesco={selectedDelegacion && selectedDelegacion.idParentesco} />
                  </div>
               </Fieldset>
            </div>
            <div className='mt-3'>
               <Fieldset legend="Datos de Fiscalía">
                  <br />
                  <div className="p-fluid grid">
                     <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                           <InputText id="txtNombreFiscal" value={nombreFiscal.toUpperCase()} className={!nombreFiscal && 'p-invalid'}
                              onChange={(e) => setNombreFiscal(e.target.value)} />
                           <label htmlFor="txtNombreFiscal">APELLIDOS Y NOMBRES DEL FISCAL</label>
                        </span>
                     </div>
                     <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                           <InputText id="txtUnidadFiscalia" value={unidadFiscalia.toUpperCase()} className={!unidadFiscalia && 'p-invalid'}
                              onChange={(e) => setUnidadFiscalia(e.target.value)} />
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
                           <Calendar id="calFechaDelegacion" value={fechaDelegacion} className={!fechaDelegacion && 'p-invalid'}
                              onChange={(e) => setFechaDelegacion(e.value)} />
                           <label htmlFor="calFechaDelegacion">FECHA DE LA DELEGACIÓN</label>
                        </span>
                     </div>
                     <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                           <Calendar id="calFechaRecPJ" value={fechaRecepcionPJ} className={!fechaRecepcionPJ && 'p-invalid'}
                              onChange={(e) => setFechaRecepcionPJ(e.value)} />
                           <label htmlFor="calFechaRecPJ">FECHA DE RECEPCIÓN EN LA PJ</label>
                        </span>
                     </div>
                     <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                           <Calendar id="calFechaRecAgente" value={fechaRecAgente} className={!fechaRecAgente && 'p-invalid'}
                              onChange={(e) => setFechaRecAgente(e.value)} />
                           <label htmlFor="calFechaRecAgente">FECHA DE RECEPCION AGENTE INVESTIGADOR</label>
                        </span>
                     </div>
                     <div className="field col-12 md:col-8">
                        <span className="p-float-label">
                           <InputText id="txtNumOficioRecAgente" value={numOficioRecAgente} className={!numOficioRecAgente && 'p-invalid'}
                              onChange={(e) => setNumOficioRecAgente(e.target.value)} />
                           <label htmlFor="txtNumOficioRecAgente">Nº DE OFICIO CON LA QUE RECIBE LA DILIGENCIA EL AGENTE</label>
                        </span>
                     </div>
                     <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                           <InputNumber value={plazoOtorgado} className={!plazoOtorgado && 'p-invalid'}
                              onValueChange={(e) => {
                                 setPlazoOtorgado(e.value)
                              }}
                              showButtons buttonLayout="horizontal" decrementButtonClassName="p-button-info" incrementButtonClassName="p-button-info"
                              incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" prefix="Plazo otorgado: " suffix=" días" />
                        </span>
                     </div>
                  </div>
                  <br />
                  <div className="p-fluid grid">
                     <Art444 a444={setArt444} />
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
      </>
   );
}

export default DelegacionSecretario