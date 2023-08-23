import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';
import { fetchTodos } from './todoActions';

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    moveTodo: (state, action) => {
      const { source, destination } = action.payload;
      const [removed] = state.urgency[source.droppableId].splice(
        source.index,
        1,
      );
      state.urgency[destination.droppableId].splice(
        destination.index,
        0,
        removed,
      );
    },
    removeTodo: (state, action) => {
      const { urgency, taskId } = action.payload;
      state.urgency[urgency] = state.urgency[urgency].filter(
        (todo) => todo.id !== taskId,
      );
    },
    removeAllHighUrgency: (state) => {
      state.urgency.high = [];
    },
    startLoading: (state) => {
      state.status = 'pending';
    },
    loadingFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    loadingSucceeded: (state) => {
      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        action.payload.forEach((todo) => {
          state.urgency.low.push(todo);
        });
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  moveTodo,
  removeTodo,
  removeAllHighUrgency,
  startLoading,
  loadingSucceeded,
  loadingFailed,
} = todoSlice.actions;
export default todoSlice.reducer;
