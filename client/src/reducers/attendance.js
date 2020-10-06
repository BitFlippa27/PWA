import { CHECK_IN, CHECK_OUT } from "../actions/types";

const initialState = {
    checkIn: null,
    checkOut: null,
    totalTime: null
};

export default function(state = initialState, action) {
    const { type, checkInTime, checkOutTime } = action;

    switch(type) {
        case CHECK_IN:
            return {...state, checkIn: checkInTime};
        case CHECK_OUT:
            return {...state, checkOut: checkOutTime};
        default:
            return state;
    }
}