import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';
import { fetchTodos } from './todoActions';

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
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      action.payload.forEach((todo) => {
        state.low[todo.id] = todo;
      });
    });
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
