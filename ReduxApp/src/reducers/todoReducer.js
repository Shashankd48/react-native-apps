import {
  ADD_TODO,
  TOGGLE_COMPLETE_TODO,
  REMOVE_TODO,
  STORE_TODO,
} from '../actions/action.types';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];

    case REMOVE_TODO:
      return state.filter(item => item.id !== action.payload);

    case TOGGLE_COMPLETE_TODO:
      const newState = state.map(item => {
        if (item.id === action.payload) item.isCompleted = !item.isCompleted;
        return item;
      });
      AsyncStorage.setItem(config.store, JSON.stringify(newState));

      return newState;
    case STORE_TODO:
      return action.payload;

    default:
      return state;
  }
};
