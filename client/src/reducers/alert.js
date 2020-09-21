//state and action
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
const initialState = [];

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {  //action.type
        case SET_ALERT:
            return [...state, payload];  //state gets passed down to component state
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);  //payload is id
        default:
            return state;
    }
}