import { FunctionComponent, useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import styled from 'styled-components'


const ProductsContainer = styled.div`

`

const ProductsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  @media(max-width: 700px){
    text-align: center;
  }
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px;
  @media(max-width: 600px){
    display: flex;
    flex-direction: column;
  }
`


interface ProductsProps{
    minFilter:number
    maxFilter:number
    nameFilter:string
    getProductsInCart: ()=> void
}

interface IProducts{
    id:string
    name:string
    photo:string
    price:number
}


const Products:FunctionComponent<ProductsProps> = (props)=>{    
    const [products, setProducts] = useState<IProducts[]>([])
    const [sort, setSort] = useState<string>('')


    
    
    useEffect(()=>{
        getProducts()
    }, [])


    const getProducts = ()=>{
        fetch('https://e-commerce-server-rho.vercel.app/products').then(res => res.json())
        .then(data=>{
            setProducts(data)
        }).catch(e=>{
            alert(e.message)
        })
    }


    const getFilteredAndOrderedList = () => {
        return products
        .filter((product) => props.maxFilter ? product.price < props.maxFilter : true)
        .filter((product) => props.minFilter ? product.price > props.minFilter : true)
        .filter((product) => props.nameFilter ? product.name.includes(props.nameFilter) : true)
        .sort((a, b) => sort === 'CRESCENTE' ? a.price - b.price : b.price - a.price)
    }

    const onChangeSort = (event:React.ChangeEvent<HTMLSelectElement>):void => {
        setSort(event.target.value)
    }


    const filteredAndOrderedList = getFilteredAndOrderedList()


    return(
        <ProductsContainer>
            <ProductsHeader>
            <p>Quantidade de produtos: {filteredAndOrderedList.length}</p>
            <label>
                <select className='form-select' 
                    value={sort} onChange={onChangeSort}>
                <option value=''>Ordenação</option>
                <option value={'CRESCENTE'}>Crescente</option>
                <option value={'DECRESCENTE'}>Decrescente</option>
                </select>
            </label>
            </ProductsHeader>
            <ProductsGrid>
                {filteredAndOrderedList.map((product) => {
                    return <ProductCard
                              product={product}
                              getProductsInCart={props.getProductsInCart}
                              />
                })} 
            </ProductsGrid>
        </ProductsContainer>
    )
}

export default Products