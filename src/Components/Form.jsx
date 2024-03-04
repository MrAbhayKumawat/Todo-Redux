import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updatetodo } from "../Redux/TodoSlice";
import { setFormUpdate } from "../Redux/UpdateSlice";
import { format } from 'date-fns';

function Form() {
  const state = useSelector((state) => state);
  const [textField, setTextField] = useState("");
  const dispatch = useDispatch();
  const currentDateAndTime = new Date();
  const formattedDateAndTime = format(currentDateAndTime, 'yyyy-MM-dd HH:mm:ss');
  useEffect(() => {
    setTextField(state.updatedata.id ? state.updatedata.text : "");
  }, [state.updatedata]);


  const handleFormSubmission = (e) => {
    e.preventDefault();

    if (!textField.trim()) {
      toast.error("Please enter a valid task");
      return;
    }

    const todoData = {
      id: state.updatedata.id ? state.updatedata.id : new Date().getTime(),
      text: textField,
      CreatedOn: state.updatedata.id
        ? state.updatedata.CreatedOn
        : formattedDateAndTime,
    };

    if (state.updatedata.checked) {
      dispatch(updatetodo(todoData));
      toast.success("Task Updated Successfully");
      dispatch(setFormUpdate({}));
    } else {
      dispatch(addTodo(todoData));
      toast.success("Task Added Successfully");
    }

    setTextField("");
    };
  return (
    <form className="mx-auto max-w-2xl p-2" onSubmit={handleFormSubmission}>
      <h1 className="font-bold text-xl mt-3">My Todo</h1>
      <div>
        <div>
          <input
            type="text"
            name="title"
            value={textField}
            placeholder="Enter Title here..."
            className="p-2 w-full border-2 border-blue-950 mt-3"
            onChange={(e) => setTextField(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            className="p-2 w-full border-2 mt-3 font-semibold bg-purple-500 text-white"
          >
            {state.updatedata.id ? "Update Todo" : "Add Todo"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
