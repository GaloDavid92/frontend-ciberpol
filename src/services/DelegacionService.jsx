import getURL from "./config";

export class DelegacionService {

    getDelegaciones = async () => {
        const response = await fetch(getURL() + '/api/delegaciones');
        const data = await response.json();
        return data;
    }

    getDelegacion = async (id) => {
        const response = await fetch(getURL() + '/api/delegacion/'+ id);
        const data = await response.json();
        return data;
    }

    consultDelegacion = async (buscar) => {
        const response = await fetch(getURL() + '/api/consultar/'+ buscar);
        const data = await response.json();
        return data;
    }

    saveDelegacion = async (newDelegacion) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDelegacion)
        }
        const response = await fetch(getURL() + '/api/delegacion', requestOptions);
        const data = await response.json();
        return data;
    }

    updDelegacionAgente = async (newDelegacion) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDelegacion)
        }
        const response = await fetch(getURL() + '/api/agente/delegacion', requestOptions);
        const data = await response.json();
        console.log("🚀 ~ file: DelegacionService.jsx:36 ~ DelegacionService ~ updDelegacionAgente= ~ data", data)
        return data;
    }

    deleteDelegacion = async (delDelegacion) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(delDelegacion)
        }
        const response = await fetch(getURL() + '/api/delegacion', requestOptions);
        const data = await response.json();
        return data;
    }
}