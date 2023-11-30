import React from "react"
import InputField from "../InputField/InputField"
import "./navbar.scss"
import { ToDo } from "../modal";
import TodoList from "../TodoList/TodoList";

const Navbar = () => {
  const [todo, setTodo]= React.useState<string>("");
  const [todos,setTodos]= React.useState<ToDo[]>([])
  // console.log(todo)

  const handleAdd =(e: React.FormEvent)=>{
    e.preventDefault();

    if(todo){
      setTodos([...todos,{id:Date.now(),todo, isDone:false} ]);
      setTodo("")
    }
  //   console.log("click")
   }
   //console.log(todos)
  return (
    <div className="todoAll">
        <h1 className="headOFTotal">
          Taskify
        </h1>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

        <TodoList todos={todos} setTodos={setTodos} />

          {/* {todos.map( (t)=> (
            <li>{t.todo}</li>
          ) ) } */}
    </div>
  )
}

export default Navbar