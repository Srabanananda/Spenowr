import { createStore,compose,applyMiddleware } from 'redux'; 
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from '../middleware/ApiCalls';
import {reactotron} from '../../../DevConfigs/Reacotron';
import { composeWithDevTools } from 'redux-devtools-extension';

let Middlewares = [thunk,promiseMiddleware];
let composed = compose(applyMiddleware(...Middlewares));

if (__DEV__) {
    const createFlipperDebugger = require('redux-flipper').default;
    const ReactotronMiddleware = reactotron.createEnhancer();
    Middlewares.push(createFlipperDebugger());
    composed = compose(
        composeWithDevTools(applyMiddleware(...Middlewares)),
        ReactotronMiddleware
    );
}

const reduxStore = createStore(rootReducer,composed);
export default reduxStore;