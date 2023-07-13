let age:number = 5
let firstName:string = 'Pedro'
let isValid:boolean = true
let idk:any = 5
idk = 'just'
idk = false

const ids:number[] = [1,2,3]
const booleans:boolean[] = [false, true]
const strings:string[] = ['Hora', 'minutos']

//Tupla
const person:[number, string] = [5, 'string']
//Lista de Tuplas
const people:[number, string][] = [
    [35, 'Jane Doe'],
    [40, 'John Doe'],
    [5, 'Son of Does']
]
//Intersections
const productId: string | number | boolean = true
//Enum
enum Directions{
    up = 1,
    down = 2
}
//Type assertions
const producName:any = 'boné'
let itemName = producName as string


console.log(itemName)