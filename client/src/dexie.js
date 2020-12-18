import Dexie from "dexie";
import { v4 as uuidv4 } from 'uuid';

export const dexie = new Dexie("AllCities");
dexie.version(1).stores({
    cities: "++id, _id",
    tasks: "++id, _id",
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


export async function addTask(task) {
  var taskId = uuidv4();
  try {
    await dexie.tasks.add(task);
    
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


export async function getTask() {
  try {
    const task = await dexie.tasks.get(1);
    console.log(task);
  
    return task;
  } 
  catch (err) {
    console.error(err);
  }
}


export async function deleteTask() {
  try {
    const token = await dexie.tasks.clear(); // ändern

    return token;
  } 
  catch (err) {
    console.error(err);
  }
}


export async function getAllData() {
  try {
    const allData = await dexie.table("cities").toArray();

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
