import { FunctionComponent, useEffect } from 'react'
import { IProductsInCart } from '../App'
import styled from 'styled-components'



const CartListContainer = styled.div`
  display: grid;
  gap: 8px;  
`
const ItemContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
  align-items: center;

  p {
    margin: 0;
  }
`


interface CartProps{
  getProductsInCart: ()=> void
  productsInCart:IProductsInCart[]
}



const Cart:FunctionComponent<CartProps> = (props)=>{


    useEffect(()=>{
      props.getProductsInCart()
    }, [])


    const getTotalValue = () => {
        let totalValue = 0
    
        for(let product of props.productsInCart) {
          totalValue += product.price * product.quantity
        }
    
        return totalValue
    }
    
    
    /* const getProductsInCart = ()=>{
        fetch('https://e-commerce-server-rho.vercel.app/cart/').then(res => res.json())
            .then(data=>{
            setProductsInCart(data)
            }).catch(e=>{
            alert(e.message)
        })
    } */


    const onRemoveProductFromCart = (product:IProductsInCart)=>{
        fetch(`https://e-commerce-server-rho.vercel.app/cart/${product.id}`, {
          method:'DELETE'
        }).then(()=> props.getProductsInCart()).catch(e=>{
          alert(e.message)
        })
    }


    return(
        <div className='border border-2 shadow-lg rounded p-2'>
            <h3>Carrinho:</h3>
            <CartListContainer>
            {props.productsInCart.map((product) => {
                return(
                    <ItemContainer>
                        <p>{product.quantity}x {product.name}</p>
                        <button className='btn btn-dark'
                            onClick={() => onRemoveProductFromCart(product)}>
                            Remover
                        </button>
                    </ItemContainer>
                )
            })}
            </CartListContainer>
            <p>Valor total: R${getTotalValue()},00</p>
        </div>
    )
}

export default Cart