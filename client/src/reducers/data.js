import {
    DATA_LOADED,
    DATA_INSERTED

    } from "../actions/types";

const initialState = {
    allData: [],
    dataEntry: null,
    loading: true
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case DATA_LOADED:
            return {...state, allData:payload, loading: false};
        case DATA_INSERTED:
            return {...state, allData:[...state.allData, payload],dataEntry: payload, loading: false};
        default:
            return state;
    }

}