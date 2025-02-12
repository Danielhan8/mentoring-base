import { createReducer, on } from '@ngrx/store';
import { todoActions } from './todo.actions';
import { ITodo } from '../../interfaces/todo.interface';

const initialState: { todos: ITodo[] } = {
  todos: [],
};
export const todosReducer = createReducer(
  initialState,
  on(todoActions.set, (state, payload) => ({
    ...state,
    todos: payload.todos,
  })),
  on(todoActions.edit, (state, payload) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === payload.todo.id) {
        return payload.todo;
      } else {
        return todo;
      }
    }),
  })),
  on(todoActions.create, (state, payload) => ({
    ...state,
    todos: [...state.todos, payload.todo],
  })),
  on(todoActions.delete, (state, payload) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== payload.id),
  }))
);
