import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { useDispatch ,useSelector} from "react-redux";
import { setFormUpdate } from "../Redux/UpdateSlice";
import { toast } from "react-toastify";

function Todos() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
    const [todos, setTodos] = useState([]);
    const state = useSelector((state) => state);
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      setTodos(storedTodos);
    }, [state.todos]);
    
  const filteredTodos = todos.filter((item) =>
  item.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return (
    <>
      {/* Search Bar */}
      <div className="mx-auto max-w-2xl p-2">
        {todos.length >= 2 ? (
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-1 w-[100%] border-2 border-blue-950 mt-3"
          />
        ) : (
          ""
        )}

        {/* Display Tasks */}
        {filteredTodos.map((item) => (
          <div
            className="mx-auto max-w-2xl p-2 bg-slate-100 rounded-lg shadow-md my-4 px-5"
            key={item.id}
          >
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium">{item.text}</div>
              <p className="text-xs">{item.CreatedOn}</p>
              <div className="flex space-x-5">
                <span
                  className="text-red-600 cursor-pointer text-xl"
                  onClick={() => {
                    const updatedTodos = todos.filter((todo) => todo.id !== item.id);
                    setTodos(updatedTodos);
                    localStorage.setItem("todos", JSON.stringify(updatedTodos));
                    toast.success("Task Delete Successfully");
                  }}
                >
                  <MdDelete />
                </span>
                <span
                  className="text-blue-500 cursor-pointer  text-xl"
                  onClick={() => {
                    dispatch(
                      setFormUpdate({
                        id: item.id,
                        text: item.text,
                        checked: true,
                      })
                    );
                  }}
                >
                  <GoPencil />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Todos;
