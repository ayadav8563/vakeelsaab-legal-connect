import { combineReducers } from 'redux';
import { lawyersReducer } from './lawyers.slice';
import { chatReducer } from './chat.slice';

const appReducer = combineReducers({
    lawyersReducer,
    chatReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
