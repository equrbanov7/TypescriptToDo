import React from "react";
import "./index.scss";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd:(e: React.FormEvent)=> void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
    
    const inputRef = React.useRef<HTMLInputElement>(null)
 
    return (
    <form className="formAll" onSubmit={(e)=> {
        handleAdd(e);
        inputRef.current?.blur()
    }}>
      <input
      ref= {inputRef}
        type="text"
        placeholder="Enter a task"
        className="input_box"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input_submit">Go</button>
    </form>
  );
};

export default InputField;
