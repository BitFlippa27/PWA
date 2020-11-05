import {
    SERVER_DATALOAD_SUCCESS,
    SERVER_DATALOAD_FAILED,
    CLIENT_DATALOAD_SUCCESS,
    CLIENT_DATALOAD_FAILED,
    DEXIE_MIGRATION_SUCCESS,
    DEXIE_MIGRATION_FAILED,
    DATA_INSERTED_ONLINE,
    DATA_INSERTED_OFFLINE,
    DATA_INSERTED_FAILED

    } from "../actions/types";

const initialState = {
    allData:[],
    timestamp: new Date().toLocaleTimeString("de-DE"),
    lastEntries: [],
    loading: true,
    error: {},

};

export default function(state = initialState, action) {
    const { type, payload } = action;
//TODO: Abfrage ob Datensatz schon existiert
    switch(type) {
        case SERVER_DATALOAD_SUCCESS:
            return {...state, allData: payload, loading: false};
        case SERVER_DATALOAD_FAILED:
            return {...state, error:payload, loading: false};
        case CLIENT_DATALOAD_SUCCESS:
            return {...state, allData: payload, loading: false};
        case CLIENT_DATALOAD_FAILED:
            return {...state, error: payload, loading: false};
        case DEXIE_MIGRATION_SUCCESS:
              return {...state, loading: false};
        case DEXIE_MIGRATION_FAILED:
              return {...state,error: payload, loading: false};
        case DATA_INSERTED_ONLINE:
            return {...state, loading: false};
        case DATA_INSERTED_OFFLINE:
            return {...state, allData:[...state.allData, payload],lastEntries: [...state.lastEntries, payload], loading: false};
        case DATA_INSERTED_FAILED:
            return {...state, error: payload, loading: false};
        default:
            return state;
    }

}
