import React from "react";
import { ToDo } from "../modal";
import SingleTodo from "./SingleTodo/SingleTodo";
import "./input.scss";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  completedTodos: ToDo[];
  setcompletedTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setcompletedTodos,
}) => {
  const checkFormSize = React.useRef<HTMLDivElement>(null);
  //console.log(checkFormSize.current?.children.length)
  const [numberOfChildElements, setNumberOfChildElements] =
    React.useState<number>(0);
  const [widthSize, setWidthSize] = React.useState<number>(80);

  React.useEffect(() => {
    // const divLength: number | undefined = checkFormSize.current?.children.length
    const divElement = checkFormSize.current;

    if (divElement) {
      setNumberOfChildElements(divElement.children.length);
    }

    if (numberOfChildElements > 1) {
      setWidthSize(40);
    } else {
      setWidthSize(80);
    }
  }, [numberOfChildElements, todos, widthSize]);

  //console.log(numberOfChildElements)

  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided,snapshot) => (
          <div
            className={`TodoList ${snapshot.isDraggingOver ? "dragactive":""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos-heading">Active Tasks</span>
            {todos.map((todo,index) => (
              <SingleTodo
              index={index}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                key={todo.id}
                sizeWidth={widthSize}
              />
            ))}
              {provided.placeholder}
          </div>
        )}
      
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided,snapshot) => (
          <div
            className={`TodoList remove  ${snapshot.isDraggingOver ? "dragcomplete":""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos-heading">Completed Tasks</span>
            {completedTodos.map((todo,index) => (
              <SingleTodo
              index={index}
                todo={todo}
                todos={completedTodos}
                setTodos={setcompletedTodos}
                key={todo.id}
                sizeWidth={widthSize}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
