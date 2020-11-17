//component calls action setAlert which dispatches SET_ALERT to reducer
import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from 'uuid';
export const setAlert = (msg, alertType) => dispatch => {             //because of thunk middleware
const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
