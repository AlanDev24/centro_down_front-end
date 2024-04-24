import { ConfirmationDialog } from "../../components/popups/confirmationdlg.component.js";
import { ErrorDialog } from "../../components/popups/errordlg.component.js";
import { SuccsessDialog } from "../../components/popups/successdlg.conponent.js";
import { AlumnosService } from "../../services/alumnos.service.js";
import { NotasService } from "../../services/notas.service.js";

window.customElements.define('confirmation-dialog', ConfirmationDialog)
window.customElements.define('error-dialog', ErrorDialog)
window.customElements.define('success-dialog', SuccsessDialog)

const opcionNotas = document.getElementById('opcion-notas')
opcionNotas.classList.add('selected')

document.addEventListener('DOMContentLoaded', async function () {

    //cargar alumnos
    const servicioAlumnos = new AlumnosService()
    const alumnos = await servicioAlumnos.getAlumnos()

    const select = document.getElementById('nombre')

    alumnos.map(alumno => {
        const opcion = document.createElement('option')
        opcion.setAttribute('value', alumno.id_alumno)
        opcion.textContent = alumno.nombre

        select.appendChild(opcion)
    })

    async function guardarNota(){
        const fechaInput = document.getElementById('fecha');
        const textoInput = document.getElementById('texto');

        
        const nota = {
            maestro: 1,
            alumno: select.value,
            fecha: fechaInput.value,
            cuerpo: textoInput.value
        }

        if(nota.maestro&&nota.alumno&&nota.cuerpo){
            try {
                const notaService = new NotasService()
                const notaNueva = await notaService.addNota(nota)
                if (notaNueva) {
                    mostrarDialogoExito()
                }
                else {
                    mostrarDialogoError('Error Al guardar nota')
                }
            } catch (error) {
                mostrarDialogoError('Error interno del sistema')
            }
    
        }
        else{
            mostrarDialogoError("Introduce todos los datos")
        }
       
    }

    const btnSave = document.getElementById('save')
    btnSave.addEventListener('click', () => {
        //Muestra dialogo de confirmación
        const popup = document.createElement('confirmation-dialog')
        popup.setAttribute('title', '¿Estas seguro de continuar?')
        popup.textContent = "Al confirmar aceptas que la información se guarde tal cual como la escribiste."
        popup.setAttribute('accept-text', 'Si, guardar')
        popup.setAttribute('cancel-text', 'No, continuar editando')
        popup.addEventListener('click',async (event)=>{
            if(event.target.id="accept"){
                await guardarNota()
                popup.remove()
            }
        })

        document.getElementsByTagName('body')[0].appendChild(popup)

    })


    const btnCancel = document.getElementById('cancel')
    btnCancel.addEventListener('click', () => {
        const popup = document.createElement('confirmation-dialog')
        popup.setAttribute('title', '¿Estas seguro de salir?')
        popup.setAttribute('class', 'warning')
        popup.textContent = "Tus cambios <strong> no se guardarán</strong>"
        popup.setAttribute('accept-text', 'Si, salir')
        popup.setAttribute('cancel-text', 'No, seguir editando')

        document.getElementsByTagName('body')[0].appendChild(popup)
        const btnAccept = popup.shadowRoot.querySelector('#accept');
        btnAccept.addEventListener('click', () => {
            window.history.back();
        })

    })

    

    function mostrarDialogoError(mensaje) {
        const popup = document.createElement('error-dialog')
        popup.setAttribute('title', 'Ha ocurrido un error!')
        popup.textContent = mensaje

        document.getElementsByTagName('body')[0].appendChild(popup)

    }

    function mostrarDialogoExito() {
        const popup = document.createElement('success-dialog')
        popup.setAttribute('title', 'Nota guardada correctamente')
        popup.textContent = "Tus cambios se han guardado"
        popup.setAttribute('accept-text', 'Volver al inicio')
        popup.setAttribute('option-text', 'Agregar otra nota')

        document.getElementsByTagName('body')[0].appendChild(popup)
    }
})



