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

    getSession = async () => {
        const response = await fetch(getURL() + '/auth/login',{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });     
        const data = await response.json();
        return data;
    }
}    