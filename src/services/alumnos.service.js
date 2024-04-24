export class AlumnosService{
    #urlService="http://localhost:3003/alumnos"
    constructor() {
        
    }

    async getAlumnos(){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          
          try {
            const respuesta = await fetch(this.#urlService, requestOptions)
            const json = await respuesta.json()
            return await json.alumnos
          } catch (error) {
            console.log(error);
          }
    }
}