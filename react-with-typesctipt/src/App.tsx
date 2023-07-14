import { useCallback, useMemo, useState } from "react"
import Button from "./components/Button"
import TextField from "./components/TextField"


interface Task{
  id:string
  isCompleted:boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [count, setCoount] = useState<number>(1)  


  const completedTasks:Task[] = useMemo(()=>{
    return tasks.filter(task => task.isCompleted)
  }, [tasks])

  const handleButtonClick: ()=> void = useCallback(()=>{
    return alert('Clicado')
  }, [])

  

  
  return (
    <>
    <h1>Bora ver vu</h1>
    <TextField onChange={e => e.target.value} />
    <Button
      theme="light"
      onClick={handleButtonClick}>Enviar</Button>
    </>
  )
}

export default App
