import { ConfirmationDialog } from "../../components/popups/confirmationdlg.component.js";
import { ErrorDialog } from "../../components/popups/errordlg.component.js";
import { SuccsessDialog } from "../../components/popups/successdlg.conponent.js";

window.customElements.define('confirmation-dialog', ConfirmationDialog)
window.customElements.define('error-dialog', ErrorDialog)
window.customElements.define('success-dialog', SuccsessDialog)


const btnSave = document.getElementById('save')
btnSave.addEventListener('click', () => {
    //Muestra dialogo de confirmación
    const popup = document.createElement('confirmation-dialog')
    popup.setAttribute('title', '¿Estas seguro de continuar?')
    popup.textContent = "Al confirmar aceptas que la información se guarde tal cual como la escribiste."
    popup.setAttribute('accept-text', 'Si, guardar')
    popup.setAttribute('cancel-text', 'No, continuar editando')

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
