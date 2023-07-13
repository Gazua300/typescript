const returnValue = <T, X, Z>(value:T | X | Z):T | X | Z => value

const message = returnValue<string, number, boolean>(true)


function getFirstValueFromArray<Type>(array:Type[]):Type{
    return array[0]
}

const stringArray = getFirstValueFromArray<string>(['a', 'b', 'c'])
const numberArray = getFirstValueFromArray<number>([1,2,3])
const boolArray = getFirstValueFromArray<boolean>([false, true])

//Promises
const returnPromise = async():Promise<string | number>=>{
    return 5
}

//Classes
class WithGenerics<T>{
    zeroValue:T
    sum: (x:T, y:T) => T

    constructor(zeroValue:T, sum: (x:T, y:T) => T){
        this.zeroValue = zeroValue
        this.sum = sum
    }
}

const genericNumber = new WithGenerics<string>('Salvaodr', (x:string, y:string)=>{
    return x + y
})

console.log(genericNumber, genericNumber.sum('Casa',' nossa'))

