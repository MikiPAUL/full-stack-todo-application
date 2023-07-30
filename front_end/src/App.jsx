import { useEffect, useState } from "react";

function App(){
  return <TodoContainer></TodoContainer>
  
}

function TodoContainer(){
  const [todos, setTodos] = useState([])
  const [currentTitle, setCurrentTitle] = useState("")
  const [currentDescription, setCurrentDescription] = useState("")

  const addTodo = () => {
    fetch(import.meta.env.VITE_URL + "/todos",{
      method: "post",
      body: JSON.stringify({
        title: currentTitle,
        description: currentDescription
      }),
      headers: { "Content-Type": "application/json; charset=UTF-8" }
    })
    setTodos([...todos, {title: currentTitle, description: currentDescription}])
  }

  useEffect(() => {
    (async () => {
      const res = await fetch(import.meta.env.VITE_URL+"/todos")
      const data = await res.json()
      setTodos(data)
    })();
  }, [])

  const deleteTodo = (e, title) => {
    const removeTodoList = todos.filter((todo) => {
      return todo.title !== title
    })
    setTodos(removeTodoList)
  }

  return <TodoPresentation 
            todos={todos} 
            setCurrentTitle={setCurrentTitle} 
            setCurrentDescription={setCurrentDescription}
            addTodo={addTodo}
            deleteTodo={deleteTodo}
          >

          </TodoPresentation>
}

function TodoPresentation(props){
  return (
    <>
      <input type="text" name="title" onChange={(e) => props.setCurrentTitle(e.target.value)}/>
      <input type="text" name="description" onChange={(e) => props.setCurrentDescription(e.target.value)}/>
      <input type="button" value="add todo" onClick={props.addTodo}/>

      {props.todos.map((todo) => {
        return <>
          <div className="todo">
            <div className="title">{todo.title}</div>
            <div className="description">{todo.description}</div>
            <button className="delete-btn" onClick={(e) => props.deleteTodo(e, todo.title)}>delete</button>
          </div>
        </>
        })
      }
    </>
  )
}

export default App