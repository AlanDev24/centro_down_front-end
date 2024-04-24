import { ErrorDialog } from "../../components/popups/errordlg.component.js";
import { MaestrosService } from "../../services/maestros.service.js";
window.customElements.define('error-dialog', ErrorDialog)

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registro-form');

  localStorage.clear();

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const contrasena = document.getElementById('pwd').value;

    //usar servicio
    const maestroService = new MaestrosService()
  
    try {
        const maestro = await maestroService.autenticar(id,contrasena)
        window.location.href = '../Nota/formulario-nota.html'
    } catch (error) {
      mostrarDialogoError(error.message)
    }

  });

  
  function mostrarDialogoError(mensaje) {
      const popup = document.createElement('error-dialog')
      popup.setAttribute('title', 'Ha ocurrido un error!')
      popup.textContent = mensaje

      document.getElementsByTagName('body')[0].appendChild(popup)

  }
});