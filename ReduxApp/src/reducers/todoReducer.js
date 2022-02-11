import {
  ADD_TODO,
  TOGGLE_COMPLETE_TODO,
  REMOVE_TODO,
  STORE_TODO,
  UPDATE_TODO,
} from '../actions/action.types';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';

const initialState = [];

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_TODO:
      return [action.payload, ...state];

    case REMOVE_TODO:
      newState = state.filter(item => item.id !== action.payload);
      AsyncStorage.setItem(config.store, JSON.stringify(newState));
      return newState;

    case TOGGLE_COMPLETE_TODO:
      newState = state.map(item => {
        if (item.id === action.payload) item.isCompleted = !item.isCompleted;
        return item;
      });
      AsyncStorage.setItem(config.store, JSON.stringify(newState));
      return newState;

    case UPDATE_TODO:
      newState = state.map(item => {
        if (item.id === action.payload.id) item = action.payload;
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
