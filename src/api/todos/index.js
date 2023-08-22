import api from '../instances';

export const fetchTodoLists = () => {
  return api.get('/todos');
};
