import { ToDo } from "../modal";
import SingleTodo from "./SingleTodo/SingleTodo";
import "./input.scss";

interface Props {
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        // <li>{todo.todo}</li>
        <SingleTodo
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          key={todo.id}
        />
      ))}
    </div>
  );
};

export default TodoList;
