import { getDefaultValues } from "@apollo/client/utilities";
import localforage, { iterate } from "localforage";
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
var lookupTable = localforage.createInstance({  //lookupTable
  name: "trackedQueries",
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



export async function getAllQueries(){
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

export async function getLookUpTable(){
  const trackedQueries = [];
  try {
    await lookupTable.iterate((value, key) => {
      trackedQueries.push(key, "") 
    })

    return trackedQueries;
    
  } 
  catch (err) {
    console.error(err);
  }
}

export async function getUpdateQueries(){
  const keys = [];
  try {
    await updateTable.iterate((value, key) => {
      keys.push(key);
    });

    return keys;
  } 
  catch (err) {
    console.error(err);
  }
}

export async function getDeleteQueries(){
  const keys = [];
  try {
    await deleteTable.iterate((value, key) => {
      keys.push(key);
    });

    return keys;
  } 
  catch (err) {
    console.error(err);
  }
}


export async function getCreateQueries(){
  const keys = [];
  try {
    await createTable.iterate((value, key) => {
      keys.push(key);
    });

    return keys;
  } 
  catch (err) {
    console.error(err);
  }
}

export async function updateId(result, serverID){
  try {
    for(let i=0; i<result.length; i++){
      deleteTable.iterate((value, key)=> {
        if(result[i] === key)
          console.log("optimisticID zu ServerId", serverID)
      })
    }
     
    
  
  } 
  catch (err) {
    console.error(err)
  }
}



export async function addQuery(id, value, operationName){

  try {
    const deepClone = JSON.stringify(value, getCircularReplacer());
    
    if(operationName === "CreateCity"){
      await createTable.setItem(id, deepClone);
      await lookupTable.setItem(id);
    }
      
    else if(operationName === "DeleteCity"){
      await deleteTable.setItem(id, deepClone);
      await lookupTable.setItem(id);
    }
     
    else if(operationName === "UpdateCity"){
      await updateTable.setItem(id, deepClone);
      await lookupTable.setItem(id);
    }
    
  } 
  catch (err) {
    console.error(err);
  }
}

export async function checkOfflineRemove(optimisticID){
  const trackedQueries = await getLookUpTable();
  const result = _.filter(trackedQueries, (val, i, iterate) => _.includes(iterate, val, i+1));
  if(result.length !== 0);
    await updateId(result, optimisticID );
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

export async function clearTable(){
  try {
    const createQueries = await getCreateQueries();
    const deleteQueries = await getDeleteQueries();
    const updateQueries = await getUpdateQueries();

    if(createQueries && deleteQueries && updateQueries){
      await lookupTable.setItem("trackedQueries", []);
    }
  } 
  catch (err) {
    console.error(err);
  }
}
