import { 
    HANDLE_ERROR, 
    LOGIN_INFORMATION, 
    LOGOUT, 
    SET_USER,
} from '../constants';

let initialStateString = localStorage.getItem(LOGIN_INFORMATION);
let initialState = initialStateString === null ? {} : JSON.parse(initialStateString);

const loginReducer = (state = initialState, login) => {
    switch (login.type) {
        case SET_USER:
            state = Object.assign({}, state, login);
            localStorage.setItem(LOGIN_INFORMATION, JSON.stringify(state));
            return state;
        case HANDLE_ERROR:
            return Object.assign({}, state, login);
        case LOGOUT:
            localStorage.removeItem(LOGIN_INFORMATION);
            return {};
        default:
            return state;
    }
};

export default loginReducer;