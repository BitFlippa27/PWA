import Dexie from "dexie";
import { v4 as uuidv4 } from 'uuid';

var taskQueue = [];

export const dexie = new Dexie("AllCities");
dexie.version(1).stores({
    cities: "++id, _id",
    requests: "++id, _id",
    users: "_id",
    currentUser: "_id"
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
  const { city, zip, pop } = formData;

  try {
    let id = await dexie.cities.add({
      city: city,
      zip: zip,
      pop: pop
    });
    
    return id;
  }
  catch(err) {
    console.error(err);
  }
}


export async function addRequest(entry) {
  const { reqData, timestamp } = entry;
  try {
    let id = await dexie.requests.add({
      request: reqData,
      timestamp: timestamp
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
  return taskQueue[0];
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
    const request = await dexie.requests.toArray();
    console.log("request Array", request);
  
    return request;
  } 
  catch (err) {
    console.error(err);
  }
}


export async function addIdToRemove(mongoID) {
  try {
    await dexie.requests.add({_id: mongoID });
    taskQueue.push(mongoID);

    return mongoID;
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
