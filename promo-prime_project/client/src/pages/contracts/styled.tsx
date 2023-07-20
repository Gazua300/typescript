import styled from 'styled-components'



export const Container = styled.div`
    @media(max-width: 600px){
        font-size: 8pt;
    }

    @media(max-width: 300px){
        font-size: 8pt;
    }

    .icon{
        font-size: 20pt;
        cursor: pointer;

        @media(max-width: 300px){
            font-size: 15pt;
        }
    }

    h1{
        font-weight: 500;
        text-align: center;

        @media(max-width: 600px){
            font-size: 13pt;
        }

        @media(max-width: 300px){
            font-size: 13pt;
        }
    }

    table{
        border: 1px solid goldenrod;
        margin: auto;
        width: 80vw;
    }

    table .tableicon{
        cursor: pointer;
    }

    td{
        border: 1px solid;
        padding: 5px;
    }
`