import getURL from "./config";

export class DelitoService {

    getDelitos = async () => {
        const response = await fetch(getURL() + '/api/delitos');
        const data = await response.json();
        return data;
    }

    getModalidades = async () => {
        const response = await fetch(getURL() + '/api/modalidades');
        const data = await response.json();
        return data;
    }
}    