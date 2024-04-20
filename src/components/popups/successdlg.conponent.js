export class SuccsessDialog extends HTMLElement {

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
        const optionText = this.getAttribute('option-text')
        const acceptText = this.getAttribute('accept-text')
        const className = this.getAttribute('class')

        shadow.innerHTML += `
        <div class="popup">
            <img id="exit" src="/src/assets/x.svg">
            <div class="content" id="success">
                <img class="logo" src="/src/assets/check-one.svg">
                <div>
                <h2>${titulo}</h2>
                <p>${message}</p>
                </div>
                <div id="btn-container">
                <button id="accept">${acceptText}</button>
                <button id="add-nota">${optionText}</button>
            </div>
            </div>
           


        </div>
        
        `
    }

    #addBtnHandler(shadow) {
        let btnExit = shadow.querySelector('#exit')
        btnExit.addEventListener("click", () => {
            this.remove()
        })
        let btnCancel = shadow.querySelector('#accept')
        btnCancel.addEventListener("click", () => {
            this.remove()
            window.history.back();
        })
        let btnAccept = shadow.querySelector('#add-nota')
        btnAccept.addEventListener("click", () => {
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