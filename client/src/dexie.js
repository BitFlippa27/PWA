import Dexie from "dexie";

const db = new Dexie("currentData");
db.version(1).stores({ zips: "++id,city,zip,pop" });

export default db;
