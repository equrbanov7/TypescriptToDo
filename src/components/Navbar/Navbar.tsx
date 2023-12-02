import React from "react";
import InputField from "../InputField/InputField";
import "./navbar.scss";
import { ToDo } from "../modal";
import TodoList from "../TodoList/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const Navbar = () => {
  const [todo, setTodo] = React.useState<string>("");
  const [todos, setTodos] = React.useState<ToDo[]>([]);
  const [completedTodos, setcompletedTodos] = React.useState<ToDo[]>([]);

  // console.log(todo)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
    //   console.log("click")
  };
  //console.log(todos)

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // eslint-disable-next-line prefer-const
    let add, active = todos, complete = completedTodos;

      if(source.droppableId === "TodosList"){
        add= active[source.index];
        active.splice(source.index,1)
      }else{
        add= complete[source.index];
        complete.splice(source.index, 1)
      }
      if(destination.droppableId === "TodosList"){
        
        active.splice(destination.index,0,add)
      }else{
        
        complete.splice(destination.index, 0,add)
      }
      setcompletedTodos(complete)
      setTodos(active)
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="todoAll">
        <h1 className="headOFTotal">Taskify</h1>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setcompletedTodos={setcompletedTodos}
        />

        {/* {todos.map( (t)=> (
            <li>{t.todo}</li>
          ) ) } */}
      </div>
    </DragDropContext>
  );
};

export default Navbar;
