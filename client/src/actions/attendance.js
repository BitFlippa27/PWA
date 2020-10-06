import { CHECK_IN, CHECK_OUT } from "./types";

export const checkIn = () => dispatch => {
    const date = new Date();
    const time = date.toLocaleTimeString("de-DE"); 
    
    dispatch({type: CHECK_IN, checkInTime: time});
}

export const checkOut = () => dispatch => {
    const date = new Date();
    const time = date.toLocaleTimeString("de-DE"); 
    
    dispatch({type: CHECK_OUT, checkOutTime: time});
}