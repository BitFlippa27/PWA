import {
  SERVER_DATALOAD_SUCCESS,
  SERVER_DATALOAD_FAILED,
  CLIENT_DATALOAD_SUCCESS,
  CLIENT_DATALOAD_FAILED,
  DATA_INSERTED,
  DATA_INSERTED_FAILED,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
//import dexie from "../dexie";
import { dexie } from "../dexie";
//var isEqual = require("lodash.isequal");

//Load entire Data from MongoDB and migrate to Local Database Dexie
export const loadServerData = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    var clientTable = await dexie.table("cities").toArray();
    if(clientTable.length === 0) {
      //var res = await axios.get("api/zips");
      const res = await fetch("http://localhost:5555/api/zips", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers:{
          "Content-Type" : "application/json",
          "X-Auth-Token": `${token}`
        }, 
        credentials: "omit"
      });
      const allServerData = await res.json();
      dispatch({
        type: SERVER_DATALOAD_SUCCESS,
        payload: allServerData
      });
    }

  } catch (err) {
    //dispatch({ type: DATALOAD_FAILED });
    //try load data until it succeds
    dispatch({
      type: SERVER_DATALOAD_FAILED,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
}

export const loadLocalData = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const clientTable = await dexie.table("cities").toArray();
    //const count =  await dexie.cities.count();
    //console.log(count);
    if(clientTable.length === 0) {
      //const res = await axios.get("api/zips");
      const res = await fetch("http://localhost:5555/api/zips", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers:{
          "Content-Type" : "application/json",
          "X-Auth-Token" : `${token}`
        }, 
        credentials: "omit"
      });
      const allServerData = await res.json();
      await dexie.table("cities").bulkAdd(allServerData);

      dispatch({
        type: CLIENT_DATALOAD_SUCCESS,
        payload: allServerData
      });
    }
    else{
      dispatch({
        type: CLIENT_DATALOAD_SUCCESS,
        payload: clientTable
      });
    }
  } catch (err) {
    //dispatch({ type: DATALOAD_FAILED });
    //try load data until it succeds
    dispatch({
      type: CLIENT_DATALOAD_FAILED,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
export const insertData = (formData) => async (dispatch) => {
  const { city, zip, pop } = formData;

  try {
    await dexie.cities.add({
      city: city,
      zip: zip,
      pop: pop
    });
    await dexie.newCities.add({
      city: city,
      zip: zip,
      pop: pop
    });
    //if Offline
    dispatch({
      type: DATA_INSERTED,
      payload: formData
    });
    dispatch(setAlert("Datensatz hinzugefügt", "success"));

  } catch (err) {
    dispatch({
      type: DATA_INSERTED_FAILED,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      },
    });
  }
  if(navigator.onLine === true) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    };
    try {
      await axios.post("/api/zips", formData, config);

      dispatch({
        type: DATA_INSERTED,
        payload: formData
      });

    } catch (err) {
      dispatch({
        type: DATA_INSERTED_FAILED,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
    }
  }
};

//const syncToServer = async () => {}
//const syncFromServer = async () => {}
