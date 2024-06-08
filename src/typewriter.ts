
type QueItem = () => Promise<void>
export default class TypeWriter{
    #que:QueItem[]= []
    element:HTMLElement
    loop:boolean
    typingSpeed:number
    deletingSpeed:number
    constructor(element: HTMLElement, {loop = false, typingSpeed=50,
         deletingSpeed=50}={}) {

            this.element= document.createElement("div")
            element?.append(this.element)
            this.loop = loop
            this.typingSpeed = typingSpeed
            this.deletingSpeed = deletingSpeed
    }

    typeString(string:string){
        this.#que.push(()=>{
            return new Promise((resolve) => {
               let i = 0
               const interval = setInterval(()=> {
                    this.element.append(string[i])
                    i++
                    if(i>=string.length){
                        clearInterval(interval)
                        resolve()
                    }
               }, this.typingSpeed)
            })
        })
        return this
    }
    deleteChars(number:number){
        this.#que.push(()=>{
            return new Promise((resolve) => {
               let i = 0
               const interval = setInterval(()=> {
                    this.element.innerText = this.element.innerText.substring(0, this.element.innerText.length-1)
                    i++
                    if(i >= number){
                        clearInterval(interval)
                        resolve()
                    }
               }, this.deletingSpeed)
            })
        })
        return this
    }

    deleteAll(deletingSpeed=this.deletingSpeed){
        this.#que.push(()=>{
            return new Promise((resolve, reject)=>{
                const interval = setInterval(()=>{
                    let innertext = this.element.innerText
                    if(innertext.length>0){
                        this.element.innerText = innertext.substring(0, innertext.length-1)
                    }
                    else {
                        clearInterval(interval)
                        resolve()
                    }
                
                }, deletingSpeed)
            })
        })
        return this
    }

    pauseFor(duration:number){
        this.#que.push(()=>{
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{resolve()}, duration)
            })
        })
        return this
    }

    async start(){
        let cb = this.#que.shift()
        while(cb!= null){
            await cb()
            if(this.loop) this.#que.push(cb)
            cb = this.#que.shift()
        }
        return this
    }
    
}