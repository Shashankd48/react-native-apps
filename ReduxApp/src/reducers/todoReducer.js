import {
  ADD_TODO,
  TOGGLE_COMPLETE_TODO,
  REMOVE_TODO,
} from '../actions/action.types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];

    case REMOVE_TODO:
      return state.filter(item => item.id !== action.payload);

    case TOGGLE_COMPLETE_TODO:
      return state.map(item => {
        if (item.id === action.payload) item.isCompleted = !item.isCompleted;
        return item;
      });

    default:
      return state;
  }
};
