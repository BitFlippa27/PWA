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

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null
    
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
                loading: false,
                errors: payload
            }
        case REGISTER_SUCCESS:
        case "LOGIN_SUCCESS":
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                token: payload.token,
                isAuthenticated: true,
                user: payload
            }
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null
            }
        case USER_LOADED_FAILED:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: true,
                errors: payload
            }
        case LOGIN_FAILED:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                errors: payload
            }
        case REGISTER_FAILED:
            localStorage.removeItem("token");
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
