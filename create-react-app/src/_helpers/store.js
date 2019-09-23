import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history'

const loggerMiddleware = createLogger();
export const history = createBrowserHistory()
export const store = createStore(
    rootReducer(history),
    composeWithDevTools(applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    ))
);