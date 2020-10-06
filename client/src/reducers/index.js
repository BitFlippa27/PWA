import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import attendance from "./attendance";

export default combineReducers({            //here all reducers as paramater
    alert,
    auth,
    attendance
});  