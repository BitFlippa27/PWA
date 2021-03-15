import {
  SERVER_DATALOAD_SUCCESS,
  SERVER_DATALOAD_FAILED,
  CLIENT_DATALOAD_SUCCESS,
  CLIENT_DATALOAD_FAILED,
  LOCALDATA_INSERT_SUCCESS,
  LOCALDATA_INSERT_FAILED,
  SERVER_DATAUPLOAD_SUCCESS,
  SERVER_DATAUPLOAD_FAILED,
  LOCALDATA_REMOVED_SUCCESS,
  LOCALDATA_REMOVED_FAILED,
  SERVERDATA_REMOVED_SUCCESS,
  SERVERDATA_REMOVED_FAILED
} from "../actions/types";

const initialState = {
  allData: [],
  timestamp: new Date().toLocaleTimeString("de-DE"),
  lastEntries: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
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
    case LOCALDATA_INSERT_SUCCESS:
      return { ...state, allData: [...state.allData, payload], loading: false };
    case LOCALDATA_INSERT_FAILED:
      return { ...state, error: payload, loading: false };
    case SERVER_DATAUPLOAD_SUCCESS:
      return { ...state,allData: state.allData.map(data => data.id === payload.id ? { ...data, _id: payload._id} : data ), loading: false };
    case SERVER_DATAUPLOAD_FAILED:
      return { ...state, loading: false };
    case LOCALDATA_REMOVED_SUCCESS:
      return { ...state, allData: state.allData.filter( data => data.id !== payload), loading: false };
    case LOCALDATA_REMOVED_FAILED:
      return { ...state, error: payload, loading: false };
    case SERVERDATA_REMOVED_SUCCESS:
      return { ...state, loading: false };
    case SERVERDATA_REMOVED_FAILED:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
}
