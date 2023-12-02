import React from "react";
import { ToDo } from "../../modal";
import "./index.scss";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
type Props = {
  todo: ToDo;
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  sizeWidth: number;
  index: number;
};

const SingleTodo: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
  sizeWidth,
  index,
}) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const [editTodo, setEditTodo] = React.useState<string>(todo.todo);

  console.log(sizeWidth, "ss");
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided,snapshot) => (
        <form
          className={`SingleTodo ${snapshot.isDragging ? "drag": ""}`}
          onSubmit={(e) => handleEditTodo(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <>
              <input
                type="text"
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                ref={inputRef}
                className="editingTodo"
              />
            </>
          ) : (
            <>
              {todo.isDone ? (
                <s className="singleTodoText">{todo.todo}</s>
              ) : (
                <span className="singleTodoText">{todo.todo}</span>
              )}
            </>
          )}

          <div className="allIcons">
            <span
              className="icon"
              onClick={() => {
                console.log("click", edit);
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                } else {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
