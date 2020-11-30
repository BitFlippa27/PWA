import {
  SERVER_DATALOAD_SUCCESS,
  SERVER_DATALOAD_FAILED,
  CLIENT_DATALOAD_SUCCESS,
  CLIENT_DATALOAD_FAILED,
  ALL_DATA_TO_DEXIE_SUCCESS,
  ALL_DATA_TO_DEXIE_FAILED,
  LOCALDATA_INSERT_SUCCESS,
  LOCALDATA_INSERT_FAILED,
  SERVER_DATAUPLOAD_SUCCESS,
  SERVER_DATAUPLOAD_FAILED
} from "../actions/types";

const initialState = {
  allData: [],
  timestamp: new Date().toLocaleTimeString("de-DE"),
  lastEntries: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  //TODO: Abfrage ob Datensatz schon existiert
  switch (type) {
    case SERVER_DATALOAD_SUCCESS:
      return { ...state, allData: payload, loading: false };
    case SERVER_DATALOAD_FAILED:
      return { ...state, error: payload, loading: false };
    case CLIENT_DATALOAD_SUCCESS:
      return { ...state, allData: payload, loading: false };
    case CLIENT_DATALOAD_FAILED:
      return { ...state, error: payload, loading: false };
    case ALL_DATA_TO_DEXIE_SUCCESS:
      return { ...state, loading: false };
    case ALL_DATA_TO_DEXIE_FAILED:
      return { ...state, error: payload, loading: false };
    case LOCALDATA_INSERT_SUCCESS:
      return {
        ...state,
        allData: [...state.allData, payload],
        lastEntries: [...state.lastEntries, payload],
        loading: false,
      };
    case LOCALDATA_INSERT_SUCCESS:
      return { ...state, error: payload, loading: false };
    case LOCALDATA_INSERT_FAILED:
      return { ...state, error: payload, loading: false };
    case SERVER_DATAUPLOAD_SUCCESS:
      return { ...state, loading: false };
    case SERVER_DATAUPLOAD_FAILED:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
}
