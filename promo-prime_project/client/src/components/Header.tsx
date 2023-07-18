import React from 'react'
import './Header.css'


interface HeaderProps{
    leftItem:any
    rightItem:any
}


const Header:React.FC<HeaderProps> = ({ leftItem, rightItem })=>{
    return(
        <header>
            <span>{leftItem}</span>
            <img src="https://www.promoprime.com.br/promo/wp-content/themes/promo-prime/img/promo-prime.png" alt="Logo" />
            <span>{rightItem}</span>
        </header>
    )
}

export default Header