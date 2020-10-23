import {
    DATA_LOADED,
    DATA_INSERTED,
    DATA_INSERTED_FAILED
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
import dexie from "../dexie";





//Load entire Data from MongoDB and migrate to Local Database Dexie
export const loadData = () => async dispatch => {

    try {
        const res = await axios.get("api/zips");
        //migrate to dexie DB
        await dexie.zips.bulkAdd(res.data);
        //// TODO: Database Versionierung




        console.log("DATAAAAA",res.data);


        dispatch({
            type: DATA_LOADED,
            payload: res.data
        });

    }
    catch(err) {
        //dispatch({ type: DATALOAD_FAILED });
        //try load data until it succeds
        console.error(err);
    }



};

export const insertData = formData => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.post("/api/zips", formData, config);

        dispatch({
            type: DATA_INSERTED,
            payload: res.data
        });

        dispatch(setAlert("Datensatz hinzugefügt", "success"));
    }catch(err) {
        dispatch({
            type: DATA_INSERTED_FAILED,
            payload: {msg:err.response.statusText, status: err.response.status}
        });
    }
}
