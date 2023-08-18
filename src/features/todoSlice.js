import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  high: {},
  medium: {},
  low: {},
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { urgency, task } = action.payload;
      state[urgency][task.id] = task;
    },
    removeTodo: (state, action) => {
      const { urgency, taskId } = action.payload;
      delete state[urgency][taskId];
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
