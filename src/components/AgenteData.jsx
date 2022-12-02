import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { AgenteService } from '../services/AgenteService';

const AgenteData = ({ abrir, mode, agente}) => {

    const svcAgente = new AgenteService()

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [correos, setcorreos] = useState([])

    useEffect(()=>{
        svcAgente.getCorreos().then((resp) => {
            if(mode == "U"){
                setcorreos(resp.filter(e => e.correo !== agente.usuario.correo))
            }
            if(mode == "C"){
                setcorreos(resp)
            }            
        });
    },[])


    const validate = (data) => {
        let errors = {};

        if (!data.name) {
            errors.name = 'El nombre es requerido.';
        }
        if (!data.email) {
            errors.email = 'Correo electrónico requerido.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Dirección de correo inválida. Ej. example@email.com';
        }
        else if (correos.filter(e => e.correo === data.email).length > 0) {
            errors.email = 'Dirección de correo ya existe. Ej. example@email.com';
        }
        return errors;
    }

    const datosIniciales = ()=>{
        if(mode=="U"){
            return {
                id: agente.id,
                name: agente.nombre,
                email: agente.usuario.correo,                
            }
        }
        else return {
            name: '',
            email: '',
        }
    }

    const submitAgente = (data) => {
        setFormData(data);
        if (mode == "C") {
            svcAgente.saveAgente(
                {
                    nombre: data.name,
                    correo: data.email
                })
            .then((resp) => {                
                resp.error? console.log("🚀 ~ file: AgenteData.jsx ~ line 57 ~ .then ~ resp", resp) : setShowMessage(true);
                formik.resetForm();
            });

        }
        if (mode == "U") {
            svcAgente.editAgente(
                {
                    id: data.id,
                    nombre: data.name,
                    correo: data.email
                })
            .then((resp) => {
                setShowMessage(true);
                formik.resetForm();
            });

        }

    }

    
    const formik = useFormik({
        initialValues: datosIniciales(),
        validate: validate,
        onSubmit: submitAgente
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        El agente <b>{formData.name}</b> ha sido creado exitosamente; La contraseña ha sido enviada al correo <b>{formData.email}</b> para ingresar a la plataforma.
                    </p>
                    <Button label='Ok' onClick={() => abrir(false)} />
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <br />
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>APELLIDOS Y NOMBRES *</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <br/>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>CORREO ELECTRÓNICO *</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <Button type="submit" label="Guardar" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AgenteData