import UseState from "./components/UseState"
import UseEffect from "./components/Ueffect"


function App() {

  return (
    <>
      <h1 style={{textAlign:'center', marginBottom:'5%'}}>React Hooks with typescript</h1>
      <div style={{display:'flex', alignItems:'center', gap:'10%'}}>
        <UseState/>
        <UseEffect/>
      </div>
    </>
  )
}

export default App
