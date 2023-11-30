import { ToDo } from "../../modal";
import "./index.scss";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
type Props = {
  todo: ToDo;
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id:number)=> {
    setTodos(
        todos.filter((todo)=> todo.id !== id)
      );
  }

  return (
    <form className="SingleTodo">
      {todo.isDone ? (
        <s className="singleTodoText">{todo.todo}</s>
      ) : (
        <span className="singleTodoText">{todo.todo}</span>
      )}

      <div className="allIcons">
        <span className="icon">
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
  );
};

export default SingleTodo;
