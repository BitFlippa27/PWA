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
const user = {
  name: "Hans",
  email: "x",
  password: "pwHashed"
};

//dexie.users.add(user);

//const resUser = dexie.users.where("email").equals("x").each( item => {console.log("Found",item)});
