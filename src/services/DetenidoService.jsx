import getURL from "./config";

export class DetenidoService {

    getCondiciones = async () => {
        const response = await fetch(getURL() + '/api/condiciones');
        const data = await response.json();
        return data;
    }

    getParentescos = async () => {
        const response = await fetch(getURL() + '/api/parentescos');
        const data = await response.json();
        return data;
    }
}    