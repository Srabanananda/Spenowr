import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { thunk } from 'redux-thunk';
import promiseMiddleware from '../middleware/ApiCalls';

let Middlewares = [thunk, promiseMiddleware];
let composed = compose(applyMiddleware(...Middlewares));

if (__DEV__) {
  try {
    const { reactotron } = require('../../../DevConfigs/Reacotron');
    if (reactotron?.createEnhancer) {
      composed = compose(
        applyMiddleware(...Middlewares),
        reactotron.createEnhancer(),
      );
    }
  } catch {
    composed = compose(applyMiddleware(...Middlewares));
  }
}

const reduxStore = createStore(rootReducer, composed);
export default reduxStore;
