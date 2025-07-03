import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  form: formReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;