import Dexie from "dexie";

export const dexie = new Dexie("AllCities");
dexie.version(1).stores({
    cities: "++id",
    tasks: "++id",
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
    await dexie.cities.add({
      city: city,
      zip: zip,
      pop: pop
    });
  }
  catch(err) {
    console.error(err);
  }
}

export async function addTask(data) {
  try {
    await dexie.tasks.add(data);
  }
  catch(err) {
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


/*
  const user = {
    email: "x"
  }
  dexie.currentUser.add(user);
  const user = dexie.currentUser.get(user.email).then(x => x);
console.log(user);
*/
