import styled from 'styled-components'


const Head = styled.div`
  background-color: blue;  
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  box-shadow: 2px 2px 4px black;

  @media(max-width: 600px){
    font-size: 20px;
    padding: 10px;
    button {
        padding: 7px;
    }
  }
`

interface DefaultHeaderProps{
    leftIcon:any
    title:string
    rightIcon:any
}

const DefaultHeader:React.FC<DefaultHeaderProps> = ({ leftIcon, title, rightIcon })=>{
    return(
        <Head>
          {leftIcon}
          {title}
          {rightIcon}
        </Head>
    )
}

export default DefaultHeader