import {SET_ROOM, ROOM_INFORMATION, REMOVE_ROOM, SET_NAME_IN_ROOM} from '../constants';

let initialStateString = localStorage.getItem(ROOM_INFORMATION);
let initialState = initialStateString === null ? {} : JSON.parse(initialStateString);

const roomReducer = (state = initialState, room) => {
    switch (room.type) {
        case SET_ROOM:
            state = Object.assign({}, state, room);
            localStorage.setItem(ROOM_INFORMATION, JSON.stringify(state));
            return state;
        case REMOVE_ROOM:
            state = {}
            localStorage.setItem(ROOM_INFORMATION, JSON.stringify(state));
            return state;
        case SET_NAME_IN_ROOM:
            state = Object.assign({}, state, room);
            localStorage.setItem(ROOM_INFORMATION, JSON.stringify(state));
            return state;
        default:
            return state;
    }
};

export default roomReducer;