//component calls action setAlert which dispatches SET_ALERT to reducer
import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "uuid";
export const setAlert = (msg, alertType) => dispatch => {             //because of thunk middleware
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });
};