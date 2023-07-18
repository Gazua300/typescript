export const convertDate = (date:string)=>{
    const year = date.substring(0,4)
    const month = date.substring(5,7)
    const day = date.substring(8,10)
    
    return `${day}/${month}/${year}`
}

export const convertContractDate = (dateObj:Date)=>{
    const date = JSON.stringify(dateObj)

    const year = date.substring(1,5)
    const month = date.substring(6,8)
    const day = date.substring(9,11)
    
    return `${day}/${month}/${year}`
}