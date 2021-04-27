import Dexie from "dexie";
import { v4 as uuidv4 } from 'uuid';

var taskQueue = [];

export const dexie = new Dexie("Queries");
dexie.version(1).stores({
    queue: "id++"
});

async function openDB() {
    try {
        dexie.open();
    } catch(err) {
        console.error(err);
    }
}

openDB();


export async function addData(formData) {
  const { city, pop } = formData;

  try {
    let id = await dexie.cities.add({
      city: city,
      pop: pop
    });
    
    return id;
  }
  catch(err) {
    console.error(err);
  }
}

export async function addQuery(query) {

  try {
   await dexie.queue.add(query);
  }
  catch(err) {
    console.error(err);
  }
}

export async function getQueries() {
  try {
    const allQueries = await dexie.queue.toArray();
    const clone = [...allQueries];

    return clone;
  } 
  catch (err) {
    console.error(err);
  }
}

export async function addQueries(queries) {
  try {
    await dexie.queue.bulkAdd(queries);
  } 
  catch (err) {
    console.error(err);
  }
}


export async function clearTable() {
  try {
    await dexie.queue.clear();
    
  } 
  catch (err) {
    console.error(err);
  }
}




export async function addRequest(entry) {
  const { reqData, timestamp, operation } = entry;
  try {
    let id = await dexie.requests.add({
      request: reqData,
      timestamp: timestamp,
      operation: operation
    });


   return id;
  }
  catch(err) {
    console.error(err);
  }
}


export async function addMongoID(mongoID, keyPath) {
  
  try {
    
    await dexie.cities.update(keyPath, {_id: mongoID});
  }
  catch(err) {
    console.error(err);
  }
}

export async function getMongoID() {
  const mongoID = taskQueue.shift();

  return mongoID;
}



export async function getRequest() {
  try {
    const request = await dexie.requests.get(1);
    console.log(request);
  
    return request;
  } 
  catch (err) {
    console.error(err);
  }
}

export async function getKeyPath(mongoID) {
  try {
    const dataSet = await dexie.cities.get({_id: mongoID});
    console.log(dataSet);
    const keyPath = dataSet.id; 
    console.log(dataSet.id);

    return keyPath;
  } 
  catch (err) {
    console.error(err);
  }
}




export async function getAllRequestObjects() {
  try {
    const requests = await dexie.requests.toArray();
    console.log("request Array", requests);
  
    return requests;
  } 
  catch (err) {
    console.error(err);
  }
}


export async function addIdToRemove(mongoID) {
  try {
    //await dexie.requests.add({_id: mongoID });
    taskQueue.unshift(mongoID);

  } 
  catch (err) {
    console.error(err);
  }
}


export async function removeEntry(keyPath) {
  try {
    await dexie.cities.where("id").equals(keyPath).delete(); 
    taskQueue.shift();
  } 
  catch (err) {
    console.error(err);
  }
}


export async function removeRequestObject(id) {
  console.log("dexie", id);
  try {
    await dexie.requests.where("id").equals(id).delete();
    taskQueue.shift();
  } 
  catch (err) {
    console.error(err);
  }
}


export async function getAllData() {
  try {
    const allData = await dexie.cities.toArray();

    return allData;
  } 
  catch (err) {
    console.error(err);
  }
}


export async function addAllData(allData) {
  try {
    await dexie.cities.bulkAdd(allData);
  } 
  catch (err) {
    console.error(err);
  }
}


export async function saveToken(token) {
  console.log(token)
  try {
    await dexie.currentUser.add({
      token: token
    });
  } 
  catch (err) {
    console.error(err);
  }
}


export async function getToken() {
  try {
    const res = await dexie.currentUser.get(1);
    const token = await res.token;

    return token;
  } 
  catch (err) {
    console.error(err);
  }
}








/*
  const user = {
    email: "x"
  }
  dexie.currentUser.add(user);
  const user = dexie.currentUser.get(user.email).then(x => x);
console.log(user);
*/
