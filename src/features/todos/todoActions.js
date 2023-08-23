import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodoLists } from '../../api/todos';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetchTodoLists();
  return response.data;
});
