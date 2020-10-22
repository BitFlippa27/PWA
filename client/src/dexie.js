import Dexie from "dexie";

const db = new Dexie("currentData");
db.version(1).stores({ customers: "username,name,email" });

export default db;
            