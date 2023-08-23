import { createSelector } from '@reduxjs/toolkit';

const selectLowUrgencyTodos = (state) => state.todos.urgency.low;
const selectMediumUrgencyTodos = (state) => state.todos.urgency.medium;
const selectHighUrgencyTodos = (state) => state.todos.urgency.high;
const selectTodosStatus = (state) => state.todos.status;
const selectTodosError = (state) => state.todos.error;

export const getLowUrgencyTodos = createSelector(
  [selectLowUrgencyTodos],
  (todos) => Object.values(todos),
);

export const getMediumUrgencyTodos = createSelector(
  [selectMediumUrgencyTodos],
  (todos) => Object.values(todos),
);

export const getHighUrgencyTodos = createSelector(
  [selectHighUrgencyTodos],
  (todos) => Object.values(todos),
);

export const getTodosStatus = createSelector(
  [selectTodosStatus],
  (status) => status,
);

export const getTodosError = createSelector(
  [selectTodosError],
  (error) => error,
);
