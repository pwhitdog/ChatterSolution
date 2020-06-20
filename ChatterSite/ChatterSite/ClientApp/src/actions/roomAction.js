import { SET_ROOM, REMOVE_ROOM } from "../constants";

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