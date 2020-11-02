import {
  DATALOAD_SUCCESS,
  DATALOAD_FAILED,
  DEXIE_MIGRATION_SUCCESS,
  DEXIE_MIGRATION_FAILED,
  DATA_INSERTED_ONLINE,
  DATA_INSERTED_OFFLINE,
  DATA_INSERTED_FAILED
} from "./types";
import axios from "axios";
import {setAlert } from "./alert";
//import dexie from "../dexie";
import dexie from "../dexie";





//Load entire Data from MongoDB and migrate to Local Database Dexie
export const loadData = ()  => async dispatch => {
  //TODO: ServiceWorker einschalten
  try {
    var res = await axios.get("api/zips");

    console.log("DATAAAAA", res.data);

    dispatch({
        type: DATALOAD_SUCCESS,
        payload: res.data
    });
} catch (err) {
    //dispatch({ type: DATALOAD_FAILED });
    //try load data until it succeds
    dispatch({
        type: DATALOAD_FAILED,
        payload: {
            msg: err.response.statusText,
            status: err.response.status
        }
    });
}
//migrate to dexie DB
//TODO: SW, wenn online dann zum Server hochladen
try {
    if(!dexie.cities) {
        await dexie.cities.bulkPut(res.data);
    }

    dispatch({
        type: DEXIE_MIGRATION_SUCCESS,
    });


} catch (err) {
    //try load data until it succeds
    dispatch({
        type: DEXIE_MIGRATION_FAILED,
        payload: {
            msg: err.response.statusText,
            status: err.response.status
        }
    });
}


}

export const insertData = formData => async dispatch => {
    const {city, zip, pop} = formData;

    try {
        await dexie.cities.add({
            city: city,
            zip: zip,
            pop: pop
        });
        await dexie.inserted.add({
            city: city,
            zip: zip,
            pop: pop
        });
        //if Offline
        dispatch({
            type:   DATA_INSERTED_OFFLINE,
            payload: formData
        });
    }
    catch(err) {
        dispatch({
            type: DATA_INSERTED_FAILED,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
    //TODO: wenn Online dann zum Server hochladen
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        await axios.post("/api/zips", formData, config);

        dispatch({
            type: DATA_INSERTED_ONLINE,
            payload: formData
        });

        dispatch(setAlert("Datensatz hinzugefügt", "success"));
    }
    catch (err) {
        dispatch({
            type: DATA_INSERTED_FAILED,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}
