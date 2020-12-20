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

} from "./types";
import { setAlert } from "./alert";
import { dexie, addData, addAllData, getAllData, addTask, addMongoID, removeEntry, getToken, saveToken, addObjectID } from "../dexie";

//var isEqual = require("lodash.isequal");

//Load entire Data from MongoDB and migrate to Local Database Dexie
export const loadServerData = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  
  try {
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
    const serverData = await res.json();
    await addAllData(serverData);

    dispatch({
      type: SERVER_DATALOAD_SUCCESS,
      payload: serverData
    });
  
} catch (err) {
  //dispatch({ type: DATALOAD_FAILED });
  //try load data until it succeds #sync
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
  try {
    const dexieData = await getAllData();
    if(dexieData.length === 0 || dexieData === undefined ) {
      dispatch(loadServerData());
    }
    //const count =  await dexie.cities.count();
    //console.log(count);
    dispatch({
      type: CLIENT_DATALOAD_SUCCESS,
      payload: dexieData
    });
  }
    
 catch (err) {
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
}


export const insertData = (formData) => async (dispatch) => {
  var token = localStorage.getItem("token");
  //console.log(token);
  //await saveToken(token);
  
  try {
    var keyPath = await addData(formData);

    dispatch({
      type: LOCALDATA_INSERT_SUCCESS,
      payload: formData
    });
    dispatch(setAlert("Datensatz lokal hinzugefügt", "success"));

  } catch (err) {
    dispatch({
      type: LOCALDATA_INSERT_FAILED,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      },
    });
  }
  
  try {
    await addTask(formData);
    const postData = JSON.stringify(formData); 
    const res = await fetch("http://localhost:5555/api/zips", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers:{
        "Content-Type" : "application/json",
        "X-Auth-Token" : `${token}`
      }, 
      credentials: "omit",
      body: `${postData}`
    });
    const response = await res.json();
    const mongoID = response._id;
    await addMongoID(mongoID, keyPath);
    console.log(response);

    dispatch({
      type: SERVER_DATAUPLOAD_SUCCESS
    });

  } catch (err) {
    dispatch({
      type: SERVER_DATAUPLOAD_FAILED
    });
    console.error(err);
    
  }
  
  //await storeTaskSendSignal(formData);
  
}

export const removeData = (id) => async dispatch => {
  var token = localStorage.getItem("token");
  try {
    await removeEntry(id);
    dispatch({ type: LOCALDATA_REMOVED_SUCCESS,  payload: id });
  } 
  catch (err) {
    dispatch({ type: LOCALDATA_REMOVED_FAILED });
    console.error(err);
  }
  
  try {
    
    const res = await fetch(`http://localhost:5555/api/zips/${id}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers:{
        "Content-Type" : "application/json",
        "X-Auth-Token" : `${token}`
      }, 
      credentials: "omit"
    });
    dispatch({ type: SERVERDATA_REMOVED_SUCCESS });
  }
  catch(err) {
    dispatch({ type: SERVERDATA_REMOVED_FAILED });
    console.error(err);
  }
}
