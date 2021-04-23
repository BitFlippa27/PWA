import localforage from "localforage";


const localForageStore = localforage.createInstance({name:"queries"});

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
    const allQueries = [];
    await localForageStore.iterate((value, key, iterationNumber) => {
    allQueries.push(value);
    });
    
    console.log(allQueries);

    return allQueries;
  } 
  catch (err){
    console.error(err)
  }

  
}

export async function addQuery(value){
  let id = 1;
  try {
    
    await localForageStore.setItem(JSON.stringify(id++), value);
  } 
  catch (err) {
    console.error(err)
  }
  
}


export async function clearQueries(){
  try {
  await localForageStore.clear();
  } 
  catch (err) {
    console.error(err)
  }
  
}

