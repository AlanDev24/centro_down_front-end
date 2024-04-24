import { LocalStorageService } from "./localStorage.service.js";

export class NotasService {
    #urlService = "http://localhost:3001/notas"
    constructor() {
    }

    async addNota(nota) {

        const token = LocalStorageService.getItem('token')

        if (token) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", token);
            myHeaders.append("Content-Type", "application/json");


            const raw = JSON.stringify({
                "maestro": nota.maestro,
                "alumno": nota.alumno,
                "cuerpo": nota.cuerpo
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            try {
                const respuesta = await fetch(this.#urlService, requestOptions)
                if (respuesta.status == 201) {
                    console.log(respuesta);
                    const notaNueva = await respuesta.json()
                    return notaNueva
                }


            } catch (error) {
                console.log(error);
            }
        }

    }
}