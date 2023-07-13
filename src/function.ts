interface MathFunc{
    (x:number, y:number):number
}

const sumNumbers:MathFunc = (a:number, b:number)=>{
    return a + b
}

const multNum:MathFunc = (z:number, w:number)=>{
    return z * w
}
const sum = (x:number, y:number):number | string=>{
    return (x + y).toString()
}

const value = sum(5, 10)
console.log(value)

const log = (message:string):void=>{
    console.log(message)
}