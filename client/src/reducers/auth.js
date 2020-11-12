import { REGISTER_SUCCESS,
    REGISTER_FAILED,
    USER_LOADED,
    USER_LOADED_FAILED,
    ALL_USER_LOADED_SUCCESS,
    ALL_USER_LOADED_FAILED,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT
} from "../actions/types";
import { dexie } from "../dexie";


const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    allUsers: []
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false
            }
        case ALL_USER_LOADED_SUCCESS:
            return {
                ...state,
                allUsers: payload,
                loading: false
            }
        case ALL_USER_LOADED_FAILED:
            return {
                ...state,
                allUsers: null,
                loading: false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGOUT:
            localStorage.removeItem("token");
            dexie.currentUser.clear();
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        case USER_LOADED_FAILED:
            localStorage.removeItem("token");
            dexie.currentUser.clear();
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case LOGIN_FAILED:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case REGISTER_FAILED:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}
