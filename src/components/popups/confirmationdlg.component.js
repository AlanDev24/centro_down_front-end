
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
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "/../src/components/popups/popup.component.css")
        shadow.appendChild(link)
    }

}