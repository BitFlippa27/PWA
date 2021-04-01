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
import { addData, addAllData, getAllData, addMongoID, removeEntry, addIdToRemove, getAllRequestObjects, dexie, getRequest, removeRequestObject } from "../dexie";
import { fromPairs } from "lodash";

//var isEqual = require("lodash.isequal");

//Load entire Data from MongoDB and migrate to Local Database Dexie
export const loadAllServerData = () => async (dispatch) => {
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
    const dexieData = await getAllData();

    dispatch({
      type: SERVER_DATALOAD_SUCCESS,
      payload: dexieData
    });
  
} catch (err) {
  //dispatch({ type: DATALOAD_FAILED });
  //try load data until it succeds #sync
  dispatch({
    type: SERVER_DATALOAD_FAILED,
    payload: {
      msg: err.response.statusText,
      status: err.response.status,
    }
  });
  
  }
}


export const loadAllLocalData = () => async (dispatch) => {
  try {
    const dexieData = await getAllData();
    if(dexieData !== 0 || dexieData !== undefined ) {
      dispatch({
        type: CLIENT_DATALOAD_SUCCESS,
        payload: dexieData
      });
    }
    if(dexieData.length === 0 || dexieData === undefined ) {
      dispatch(loadAllServerData());
    }
    //const count =  await dexie.cities.count();
    //console.log(count);
    
  }
    
 catch (err) {
    //dispatch({ type: DATALOAD_FAILED });
    //try load data until it succeds
    dispatch({
      type: CLIENT_DATALOAD_FAILED,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    });
  }
}


export const insertData = (formData) => async (dispatch) => {
  var data = formData;
  var token = localStorage.getItem("token");
  //console.log(token);
  //await saveToken(token);
  try {
    //Rückgabewert ist primary key (keyPath)
    const keyPath = await addData(data);
    data.id = keyPath;

    dispatch({
      type: LOCALDATA_INSERT_SUCCESS,
      payload: data
    });

    dispatch(setAlert("Datensatz hinzugefügt", "success"));
    
  } 
  catch (err) {
   console.error(err)
  }

  try {
    const postData = JSON.stringify(data); 
    let res = await fetch("http://localhost:5555/api/zips", {
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
      
      
      let clonedRes = res.clone();
      data = await clonedRes.json();
      console.log(data);

      dispatch({
      type: SERVER_DATAUPLOAD_SUCCESS,
      payload: data
     });
    }
    catch (err) {
      //await addTask(formData);
      dispatch({
        type: SERVER_DATAUPLOAD_FAILED
      });
      console.error(err);
    
  }  
}

export const removeData = (keyPath, mongoID) => async dispatch => {
  var token = localStorage.getItem("token");
  try {
    console.log(keyPath);
    await removeEntry(keyPath);
    
    dispatch({ 
      type: LOCALDATA_REMOVED_SUCCESS,
      payload: keyPath
    });
  } 
  catch (err) {
    console.error(err);
  }
  
  try {
    if(mongoID) { //bedeutet Datensatz wurde Offline hinzugefügt und Offline gelöscht (keine MongoID vorhanden)
      await addIdToRemove(mongoID);

      await fetch(`http://localhost:5555/api/zips/${mongoID}`, {
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
    else {
      const toRemove = await getRequest();
      await removeRequestObject(toRemove.id);
    }
  }
  catch(err) {
    console.error(err);
  }
}
