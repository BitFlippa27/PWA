import {
    DATA_LOADED,
    DATA_INSERTED,
    DATA_INSERTED_FAILED

    } from "../actions/types";

const initialState = {
    allData: [],
    dataEntry: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case DATA_LOADED:
            return {...state, allData:payload, loading: false};
        case DATA_INSERTED:
            return {...state, allData:[...state.allData, payload],dataEntry: payload, loading: false};
        case DATA_INSERTED_FAILED:
            return {...state, error: payload, loading: false};
        default:
            return state;
    }

}