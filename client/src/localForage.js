import localforage from "localforage";
const _ = require('lodash')
var id = 1;
export var localForageStore = localforage.createInstance({name:"queries"});


const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};



export async function getQueries(){
  try {
    const queries = [];
    await localForageStore.iterate((value, key, iterationNumber) => {
    
    queries.push(JSON.parse(value));
    });
    
    console.log(queries);

    return queries;
  } 
  catch (err){
    console.error(err)
  }

  
}

export  async function addQuery(id, value){
  
  try {
    const deepClone = JSON.stringify(value, getCircularReplacer());
    await localForageStore.setItem(id, deepClone);

    return id;
  } 
  catch (err) {
    console.error(err);
  }
  
  
}

export  async function removeQuery(id){
  try {
    await localForageStore.removeItem(id);
  } 
  catch (err) {
    console.error(err);
  }
  
  
}


export async function clearQueries(){
  try {
  await localForageStore.clear();
  id = 1;
  } 
  catch (err) {
    console.error(err)
  }
  
}

