const returnValue = <T>(value:T):T => value

const message = returnValue<string>('Hello World!')
const count = returnValue<number>(35)
const bool = returnValue<boolean>(false)

function getFirstValueFromArray<Type>(array:Type[]):Type{
    return array[0]
}

const stringArray = getFirstValueFromArray<string>(['a', 'b', 'c'])
const numberArray = getFirstValueFromArray<number>([1,2,3])
const boolArray = getFirstValueFromArray<boolean>([false, true])

console.log(stringArray, numberArray, boolArray)
