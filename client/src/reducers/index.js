import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";

export default combineReducers({            //here all reducers as paramater
    alert,
    auth
});  