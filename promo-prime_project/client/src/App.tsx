import { BrowserRouter } from "react-router-dom"
import { createGlobalStyle } from "styled-components"
import { GlobalState } from "./global/Context"
import Router from "./routes/Router"
//import Image from './img/wallpaper.png'


const GlobalStyle = createGlobalStyle`
  body{
    background-color: black;
    background-size: cover;
    color: white;
  }
`


function App() {

  return (
    <BrowserRouter>
      <GlobalStyle/>
      <GlobalState>
        <Router/>
      </GlobalState>
    </BrowserRouter>
  )
}

export default App
