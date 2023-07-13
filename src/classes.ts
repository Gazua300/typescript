interface IClassUser {
    id:number
    sayMyName():void    
}

class ClassUser implements IClassUser{
    readonly id:number
    protected name:string
    private email:string

    constructor(id:number, name:string, email:string){
        this.id = id
        this.name = name
        this.email = email
    }

    sayMyName = ():void=>{
        console.log(this.name)
    }
}


class Employee extends ClassUser{
    constructor(id:number, name:string, email:string){
        super(id, name, email)
    }

    whatMyEmail = ()=>{
        return this.name
    }
}

const employee = new Employee(1, 'Flamarion', 'mesmo245@gmail.com')

console.log(employee, employee.whatMyEmail())