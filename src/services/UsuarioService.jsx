import getURL from "./config";

export class UsuarioService {

    login = async (loginData) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
            credentials: 'include'
        }
        const response = await fetch(getURL() + '/auth/login', requestOptions);
        const data = await response.json();
        return data;
    }

    logout = async () => {        
        const response = await fetch(getURL() + '/auth/logout');
        const data = await response;
    }

    getSession = async () => {
        const response = await fetch(getURL() + '/auth/login', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    }
    
    saveUsuario = async (newUsuario) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUsuario)
        }
        const response = await fetch(getURL() + '/api/usuario', requestOptions);
        const data = await response.json();
        return data;
    } 
    
    getCorreos = async () => {
        const response = await fetch(getURL() + '/api/correos');
        const data = await response.json();
        return data;
    }

    getUsuarios = async () => {
        const response = await fetch(getURL() + '/api/usuarios');
        const data = await response.json();
        return data;
    }
    
    editUsuario = async (updUsuario) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updUsuario)
        }
        const response = await fetch(getURL() + '/api/usuario', requestOptions);
        const data = await response.json();
        return data;
    }
}    