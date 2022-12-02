import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import uncLogo from '../assets/LOGOUNC.png';
import { UsuarioService } from '../services/UsuarioService';

const Login = ({isloged}) => {

    const svcUsuario = new UsuarioService()

    useEffect(()=>{
        svcUsuario.getSession().then((resp) => {
            console.log("🚀 ~ file: Login.jsx:16 ~ svcUsuario.getSession ~ resp", resp)
        })
    },[])
    const [incorrectlogin, setincorrectlogin] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = 'Email is required.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }
            return errors;
        },
        onSubmit: (data) => {
            svcUsuario.login({
                correo: data.email,
                clave: data.password
            }).then(resp => {
                console.log("🚀 ~ file: Login.jsx:40 ~ Login ~ resp", resp)
                resp ? setincorrectlogin(false) : setincorrectlogin(true)
                svcUsuario.getSession().then(r => {
                    r.id ? isloged(true) : isloged(false)
                })
            })
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <div className="form-demo">
            <div className="flex justify-content-center">
                <div className="card">
                    <div className='text-center'>
                        <img className='m-3' src={uncLogo} height={'150px'} />
                    </div>
                    <br />
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>CORREO *</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <br />
                        <div className="field">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask feedback={false}
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>CONTRASEÑA *</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        { incorrectlogin && <small className="p-error">USUARIO O CLAVE INCORRECTOS</small>}
                        <Button type="submit" label="INGRESAR" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login