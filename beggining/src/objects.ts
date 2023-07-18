type Hobbies = {
    sport?:string[],
    music?:string[],
    games?:string[],
    hunting?:string[]
}

type User = {
    firstName:string,
    age?:number,
    email:string,
    password:string,
    hobbies?:Hobbies[]
}

const user:User = {
    firstName: 'Hagar',
    age: 35,
    email: 'hagar@email.com',
    password: 'alfaromeo21',
    hobbies: [
        { music: ['folk', 'rock', 'jazz'] },
        { sport: ['marcial arts', 'football', 'tennis', 'basketball'] }
    ]
}

const logPrint = (message?:number)=>{
    console.log(message)
}

//Unios
type Author = {
    books:string[]
}

const author:Author & User = {
    books: ['Era uma vez', 'Agora é noiz'],
    firstName: 'Eu mesmo',
    email: 'mesmo245@gmail.com',
    password: '123456',
    age: 39,
    hobbies: [
        { music: ['rock', 'blues'] }
    ]
}

//Interfaces
interface UserInterface{
    firstName:string,
    readonly email:string
}

const userInterface:UserInterface = {
    firstName: 'Carlos',
    email: 'mesmo245@gmail.com'
}