import {SET_ROOM, REMOVE_ROOM, SET_NAME_IN_ROOM} from "../constants";

export const setRoom = room => {
    return {
        type: SET_ROOM,
        room
    }
}

export const removeRoom = () => {
    return {
        type: REMOVE_ROOM
    }
}

export const setName = myName => {
    return {
        type: SET_NAME_IN_ROOM,
        myName
    }
}