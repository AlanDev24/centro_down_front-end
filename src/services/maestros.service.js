import { LocalStorageService } from "./localStorage.service.js";

export class MaestrosService {

    #urlService="http://localhost:3002/maestros"
    constructor() {

    }

    async autenticar() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "id": 1,
            "password": 12345
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

            const respuesta = await fetch(this.#urlService, requestOptions)
            //guardar token en localstorage
            const body = await respuesta.json()
            const {token,maestro} = await body.body

            if(token){
                LocalStorageService.setItem('token',token)
                return maestro

            }
            throw Error('Credenciales incorrectas')

    }
}