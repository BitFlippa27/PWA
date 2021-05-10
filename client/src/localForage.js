import { getDefaultValues } from "@apollo/client/utilities";
import localforage, { iterate } from "localforage";
import { VariableSizeGrid } from "react-window";
import x from "uniqid";
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


export async function addQuery(id, value, operationName){

  try {
    const deepClone = JSON.stringify(value, getCircularReplacer());
    
    if(operationName === "CreateCity"){
      await createTable.setItem(id, deepClone);
      
    }
      
    else if(operationName === "DeleteCity"){
      await deleteTable.setItem(id, deepClone);
      
    }
     
    else if(operationName === "UpdateCity"){
      await updateTable.setItem(id, deepClone);
      
    }
    
  } 
  catch (err) {
    console.error(err);
  }
}

export async function checkOfflineRemove(operationName, response){
  //const result = _.filter(trackedQueries, (val, i, iterate) => _.includes(iterate, val, i+1)); //lodash function for finding duplicate
  const createQueries = await getCreateQueries();
  const deleteQueries = await getDeleteQueries();

  const duplicates = createQueries.filter(duplicate => deleteQueries.includes(duplicate));
  
  console.log(duplicates)
  console.log(duplicates[0])




  if(duplicates.length !== 0);
    await removeDuplicates(duplicates, operationName);
}


export async function removeDuplicates(duplicates, operationName){
  console.log("updateID")
  try {
    for(let i=0;i<duplicates.length;i++){
      await removeQuery(duplicates[i], operationName)
    }

    /*
    for(let i=0; i<duplicates.length; i++){
      const queryToUpdate = await deleteTable.getItem(duplicates[i]);
      const query = JSON.parse(queryToUpdate);
      query.variables.id = serverID;
      await deleteTable.setItem(duplicates[i], JSON.stringify(query))
    }
    */
  } 
  catch (err) {
    console.error(err)
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
