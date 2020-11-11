import Dexie from "dexie";

export const dexie = new Dexie("AllCities");
dexie.version(1).stores({
    cities: "++id",
    newCities: "++id",
    users: "email"
});

const openDB = async () => {
    try {
        dexie.open();
    } catch(err) {
        console.error(err);
    }
}

openDB();

//dexie.users.add(user);
