import { REGISTER_SUCCESS,
    REGISTER_FAILED,
    USER_LOADED,
    USER_ID_SAVED,
    USER_LOADED_FAILED,
    ALL_USER_LOADED_SUCCESS,
    ALL_USER_LOADED_FAILED,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    userID: null,
    allUsers: [],
    errors: {}
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
        case USER_ID_SAVED:
            localStorage.setItem("UserID", payload);
            return {
                ...state,
                loading: false,
                userID: payload
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
                loading: false,
                errors: payload
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
            localStorage.removeItem("UserID");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        case USER_LOADED_FAILED:
            localStorage.removeItem("token");
            localStorage.removeItem("UserID");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                errors: payload
            }
        case LOGIN_FAILED:
            localStorage.removeItem("token");
            localStorage.removeItem("UserID");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                errors: payload
            }
        case REGISTER_FAILED:
            localStorage.removeItem("token");
            localStorage.removeItem("UserID");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                errors: payload
            }
        default:
            return state;
    }
}
