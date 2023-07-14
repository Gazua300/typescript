import { FunctionComponent, ReactNode } from "react"


interface ButtonProps{
    onClick?:() => void
    theme: 'dark' | 'light'
    children:ReactNode
}

const Button:FunctionComponent<ButtonProps> = ({ onClick, children })=>{
    return <button onClick={onClick}>{children}</button>
}

export default Button