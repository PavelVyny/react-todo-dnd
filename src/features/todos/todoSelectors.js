import { createSelector } from '@reduxjs/toolkit';

export const selectLowUrgencyTodos = createSelector(
  (state) => state.todos.low,
  (lowTodos) => Object.values(lowTodos),
);
