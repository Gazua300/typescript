import styled from 'styled-components'


export const Container = styled.div`
    .rightIcon{
        font-size: 20pt;
        cursor: pointer;
    }

    fieldset{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 30vw;
        text-align: center;
        margin-top: 10vh;
        line-height: 40px;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 2px 2px 4px gray;

        @media(max-width: 600px){
            width: 50vw;
        }

        @media(max-width: 300px){
            width: 70vw;
        }
    }

    legend{
        font-size: 16pt;
        text-align: center;
    }

    input{
        background: transparent;
        border: 1px solid;
        border-radius: 20px;
        height: 25px;
        padding-left: 10px;
        color: white;
        width: 25vw;

        @media(max-width: 600px){
            width: 70vw;
        }

        @media(max-width: 300px){
            width: 60vw;
        }
    }

    fieldset div{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;    
    }

    fieldset button{
        width: 10vw;
        height: 25px;
        background-color: rgb(36, 33, 33);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        @media(max-width: 600px){
            width: 20vw;
        }

        @media(max-width: 300px){
            width: 20vw;
        }
    }

    fieldset input[type="button"]{
        width: 10vw;
        height: 25px;
        background-color: rgb(36, 33, 33);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        @media(max-width: 600px){
            width: 20vw;
        }

        @media(max-width: 300px){
            width: 20vw;
        }
    }

    fieldset input[type='button']:hover{
        background-color: rgb(9, 6, 6);
    }

    fieldset button:hover{
        background-color: rgb(9, 6, 6);
    }

    .link{
        width: 60vw;
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translateX(-50%);    
    }
`