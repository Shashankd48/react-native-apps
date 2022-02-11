import {
  ADD_TODO,
  TOGGLE_COMPLETE_TODO,
  REMOVE_TODO,
  STORE_TODO,
  UPDATE_TODO,
} from './action.types';

export const addTodo = todo => ({type: ADD_TODO, payload: todo});

export const updateTodo = todo => ({type: UPDATE_TODO, payload: todo});

export const removeTodo = id => ({type: REMOVE_TODO, payload: id});

export const toggleCompleteTodo = id => ({
  type: TOGGLE_COMPLETE_TODO,
  payload: id,
});

export const storeTodo = todos => ({type: STORE_TODO, payload: todos});
