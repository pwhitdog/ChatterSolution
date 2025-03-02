import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import loginReducer from "../reducers/loginReducer";
import roomReducer from "../reducers/roomReducer";

export default function configureStore(history, initialState) {
    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    const rootReducer = combineReducers({
        login: loginReducer,
        room: roomReducer,
        router: connectRouter(history)
    });


    return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    );
}
