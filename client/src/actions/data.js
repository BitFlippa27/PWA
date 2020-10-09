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
    } from "./types";

//Load entire Data from MongoDB
export const loadData = () => async dispatch => {
    try {
        const res = await axios.get("api/customers");

        //console.log("DATAAAAA",res.data);
        dispatch({
            type: DATA_LOADED,
            payload: res.data
        });
        
    } catch(err) {
        //dispatch({ type: DATALOAD_FAILED });
        console.error(err);
    }
};