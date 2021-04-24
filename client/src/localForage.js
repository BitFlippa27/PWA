import localforage from "localforage";
const objinob = {name:"franz"};
const obj = {objinob};
export var localForageStore = localforage.createInstance({name:"queries"});
localForageStore.setItem("test",obj)

export async function initLocalForage(){
  try {
    await localForageStore.setItem("trackedQueries", []);
  } 
  catch (err) {
    console.error(err)
  }
}

//initLocalForage();


export async function getQueries(){
  try {
    const queries = [];
    await localForageStore.iterate((value, key, iterationNumber) => {
    queries.push(value);
    });
    
    console.log(queries);

    return queries;
  } 
  catch (err){
    console.error(err)
  }

  
}

export  function addQuery(value){
  let id = 1;
 
  localForageStore.setItem(JSON.stringify(id++), value);
  
}


export async function clearQueries(){
  try {
  await localForageStore.clear();
  } 
  catch (err) {
    console.error(err)
  }
  
}

