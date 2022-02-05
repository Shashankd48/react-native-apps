import {TOGGLE_REFRESH} from '../actions/seasonActions';

export const initialState = false;

export const seasonReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_REFRESH:
      console.log('log: update', state);
      return !state;

    default:
      return state;
  }
};
