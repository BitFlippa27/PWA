import {
    DATA_LOADED,
    DATALOAD_FAILED,
    DATA_INSERTED,
    DATA_CHANGED,
    DATA_REMOVED,
    INSERTED_OFFLINE,
    CHANGED_OFFLINE,
    REMOVED_OFFLINE,
    CONCURRENCY
    } from "../actions/types";

const initialState = {
    allItems: [],
    item: null,
    loading: true
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case DATA_LOADED:
            return {...state, allItems:payload, loading: false};
        default:
            return state;
    }

}