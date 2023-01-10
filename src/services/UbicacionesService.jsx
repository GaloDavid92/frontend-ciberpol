import getURL from "./config";

export class UbicacionesService {

    getZonas = async () => {
        const response = await fetch(getURL() + '/api/zonas');
        const data = await response.json();
        return data;
    }

    getProvincias = async (idZona) => {
        const response = await fetch(getURL() + '/api/provincia/' + idZona);
        const data = await response.json();
        return data;
    }

    getCantones = async (idProvincia) => {
        const response = await fetch(getURL() + '/api/cantones/' + idProvincia);
        const data = await response.json();
        return data;
    }

    getDistritos = async (idCanton) => {
        const response = await fetch(getURL() + '/api/distritos/' + idCanton);
        const data = await response.json();
        return data;
    }

    getUbicacion = async (idDistrito) => {
        const response = await fetch(getURL() + '/api/ubicacion/' + idDistrito);
        const data = await response.json();
        return data;
    }
}
