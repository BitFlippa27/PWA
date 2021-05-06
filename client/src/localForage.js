import localforage from "localforage";
import { VariableSizeGrid } from "react-window";
const _ = require('lodash')
var id = 1;
var dbName = "queries";

var deleteTable = localforage.createInstance({
  name: dbName,
  storeName: "delete"
});
var createTable = localforage.createInstance({
  name: dbName,
  storeName: "create"
});
var updateTable = localforage.createInstance({
  name: dbName,
  storeName: "update"
});


const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};



export async function getQueries(){
  try {
    const queries = [];
    await createTable.iterate((value) => {
      queries.push(JSON.parse(value));
    });
    await deleteTable.iterate((value) => {
      queries.push(JSON.parse(value));
    });
    await deleteTable.iterate((value) => {
      queries.push(JSON.parse(value));
    });
    

    return queries;
  } 
  catch (err){
    console.error(err)
  }
}

export async function checkOfflineDelete(optimisticID, mongoID){
  console.log("opt", optimisticID)
  console.log("mongo", mongoID)
  try {
    await deleteTable.iterate((value, key) => {
      console.log("key", key)
      console.log("value", value)
      if(optimisticID === key){
        deleteTable.removeItem(key);
        console.log("value", value)
        deleteTable.setItem(mongoID, value);
      }
    });
   
  }
  catch (err) {
    console.error(err);
  }
}

export async function addQuery(id, value, operationName){
  try {
    const deepClone = JSON.stringify(value, getCircularReplacer());

    if(operationName === "CreateCity")
      await createTable.setItem(id, deepClone);
    else if(operationName === "DeleteCity")
      await deleteTable.setItem(id, deepClone);
    else if(operationName === "UpdateCity")
      await updateTable.setItem(id, deepClone);
  } 
  catch (err) {
    console.error(err);
  }
  
  
}

export  async function removeQuery(id, operationName){
  try {
    if(operationName === "CreateCity")
      await createTable.removeItem(id);
    if(operationName === "DeleteCity")
      await deleteTable.removeItem(id);
    if( operationName === "UpdateCity")
      await updateTable.removeItem(id);
  } 
  catch (err) {
    console.error(err);
  }
}
