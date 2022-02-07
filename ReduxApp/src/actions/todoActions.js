import {ADD_TODO, TOGGLE_COMPLETE_TODO, REMOVE_TODO} from './action.types';

export const addTodo = todo => ({type: ADD_TODO, payload: todo});

export const removeTodo = id => ({type: REMOVE_TODO, payload: id});

export const toggleCompleteTodo = id => ({
  type: TOGGLE_COMPLETE_TODO,
  payload: id,
});
