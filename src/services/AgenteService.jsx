import getURL from "./config";
export class AgenteService {

    getGrados = async () => {
        const response = await fetch(getURL() + '/api/grados');
        const data = await response.json();
        return data;
    }

    getCorreos = async () => {
        const response = await fetch(getURL() + '/api/correos');
        const data = await response.json();
        return data;
    }

    getAgentes = async () => {
        const response = await fetch(getURL() + '/api/agentes');
        const data = await response.json();
        return data;
    }

    saveAgente = async (newAgente) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAgente)
        }
        const response = await fetch(getURL() + '/api/agente', requestOptions);
        const data = await response.json();
        return data;
    } 

    editAgente = async (updAgente) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updAgente)
        }
        const response = await fetch(getURL() + '/api/agente', requestOptions);
        const data = await response.json();
        return data;
    }

    deleteAgente = async (delAgente) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(delAgente)
        }
        await fetch(getURL() + '/api/agente', requestOptions);
        return console.log('Deleted');
    }    
}    