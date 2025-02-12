import { createReducer, on } from '@ngrx/store';
import { userActions } from './user.actions';
import { User } from '../../interfaces/user.interface';


const initialState: { users: User[] } = {
    users: [],
};

export const usersReducer = createReducer(
  initialState,
  on(userActions.set, (state, payload) => ({
    ...state,
    users: payload.users,
  })),
  on(userActions.edit, (state, payload) => ({
    ...state,
    users: state.users.map((user) => {
      if (user.id === payload.user.id) {
        return payload.user;
      } else {
        return user;
      }
    }),
  })),
  on(userActions.create, (state, payload) => ({
    ...state,
    users: [...state.users, payload.user],
  })),
  on(userActions.delete, (state, payload) => ({
    ...state,
    users: state.users.filter((user) => user.id !== payload.id),
  }))
);