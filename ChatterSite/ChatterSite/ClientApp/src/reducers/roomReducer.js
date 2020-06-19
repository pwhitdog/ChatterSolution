import { SET_ROOM, ROOM_INFORMATION } from '../constants';

let initialStateString = localStorage.getItem(ROOM_INFORMATION);
let initialState = initialStateString === null ? {} : JSON.parse(initialStateString);

const roomReducer = (state = initialState, login) => {
    switch (login.type) {
        case SET_ROOM:
            state = Object.assign({}, state, login);
            localStorage.setItem(ROOM_INFORMATION, JSON.stringify(state));
            return state;
        default:
            return state;
    }
};

export default roomReducer;