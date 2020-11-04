import Dexie from "dexie";

const dexie = new Dexie("localData");
dexie.version(1).stores({
  cities: "++id",
  inserted: "++id"
});

const openDB = async() => {
    try {
        await dexie.open();
    } catch(err) {
        console.error(err);
    }
}
openDB();


export default dexie;
