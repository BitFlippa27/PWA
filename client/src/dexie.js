import Dexie from "dexie";

export const dexie = new Dexie("AllCities");
dexie.version(1).stores({
    cities: "++id",
    newCities: "++id",
    users: "_id",
    currentUser: "_id"
});

const openDB = async () => {
    try {
        dexie.open();
    } catch(err) {
        console.error(err);
    }
}

openDB();
/*
  const user = {
    email: "x"
  }
  dexie.currentUser.add(user);
  const user = dexie.currentUser.get(user.email).then(x => x);
console.log(user);
*/
