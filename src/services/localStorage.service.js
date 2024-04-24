export class LocalStorageService{
    constructor() {

    }

    static setItem(key,value){
        const data =value
        localStorage.setItem(key,data)
    }

    static getItem(key){
        const data=localStorage.getItem(key)
        return data
    }

    static deleteItem(key){
        localStorage.removeItem(key)
    }
}