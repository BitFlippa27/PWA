import Dexie from "dexie";

const db = new Dexie("localData");
db.version(1).stores({
  cities: "++id",
  inserted: "++id"
});

const openDB = async() => {
    try {
        await db.open();
    } catch(err) {
        console.error(err);
    }
}
openDB();


export default db;
