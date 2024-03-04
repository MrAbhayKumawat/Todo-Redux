import { createSlice } from "@reduxjs/toolkit";

const storedTodos = localStorage.getItem("todos");
const initialState = storedTodos ? JSON.parse(storedTodos) : [];

const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      return [...state, action.payload];
    },
    removeTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updatetodo: (state, action) => {
      state.forEach((item) => {
        if (item.id === action.payload.id) {
          item.text = action.payload.text;
        }
      });
    },
  },
});

export const { addTodo, removeTodo, updatetodo } = todosSlice.actions;

export const setLocalStorage = (state) => {
  localStorage.setItem("todos", JSON.stringify(state));
};

export default todosSlice.reducer;
