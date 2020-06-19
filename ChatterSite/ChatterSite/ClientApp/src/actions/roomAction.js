import { SET_ROOM } from "../constants";

export const setRoom = room => {
    return {
        type: SET_ROOM,
        room
    }
}