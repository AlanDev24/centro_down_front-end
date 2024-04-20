export class ConfirmationDialog extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#addBtnHandler(shadow)
    }

    #render(shadow) {
        const titulo = this.getAttribute('title')
        const message = this.textContent
        const cancelText = this.getAttribute('cancel-text')
        const acceptText = this.getAttribute('accept-text')
        const className = this.getAttribute('class')

        shadow.innerHTML += `
        <div class="popup">
            <img id="exit" src="/src/assets/x.svg">
            <div class="content">
                ${(className == "warning") ? '<img src="/src/assets/exclamation.svg">' : ""}
                <div>
                <h2>${titulo}</h2>
                <p>${message}</p>
                </div>
            </div>
           
            <div id="btn-container">
                <button id="cancel">${cancelText}</button>
                <button id="accept">${acceptText}</button>
            </div>

        </div>
        
        `
    }

    #addBtnHandler(shadow) {
        let btnExit = shadow.querySelector('#exit')
        btnExit.addEventListener("click", () => {
            this.remove()
        })
        let btnCancel = shadow.querySelector('#cancel')
        btnCancel.addEventListener("click", () => {
            this.remove()
        })
        let btnAccept = shadow.querySelector('#accept')
        btnAccept.addEventListener("click", () => {
            try {
                //TODO guardar nota
                this.remove()
                //throw new Error('test')

                this.#mostrarDialogoExito()
                //window.history.back();
            } catch (error) {
                console.log(error);
                this.#mostrarDialogoError()//si ocurre un error
            }
        })
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "/../src/components/popups/popup.component.css")
        shadow.appendChild(link)
    }

    #mostrarDialogoError() {
        const popup = document.createElement('error-dialog')
        popup.setAttribute('title', 'Ha ocurrido un error!')
        popup.textContent = "Error interno del servidor, intenta más tarde"

        document.getElementsByTagName('body')[0].appendChild(popup)

    }

    #mostrarDialogoExito() {
        const popup = document.createElement('success-dialog')
        popup.setAttribute('title', 'Nota guardada correctamente')
        popup.textContent = "Tus cambios se han guardado"
        popup.setAttribute('accept-text', 'Volver al inicio')
        popup.setAttribute('option-text', 'Agregar otra nota')

        document.getElementsByTagName('body')[0].appendChild(popup)
    }

}