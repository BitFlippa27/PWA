import {  getTask, getAllTasks, getMongoID, addTask, getAllData, addRequest } from './dexie';
const MAX_RETENTION_TIME = 60 * 24 * 7;

export async function pushRequest(request) {
    //todo 
    const entry = {
        reqData: request,
        timestamp: Date.now()
    };

    await addRequest(entry);

}

/*
export async function getAll() {
    const allEntries = await getAllTasks();
    const now = Date.now();
    const unexpiredEntries = [];
    for (const entry of allEntries) {
        const maxRetentionTimeInMs = MAX_RETENTION_TIME * 60 * 1000;
        if (now - entry.timestamp > maxRetentionTimeInMs) {
            await 
        }
    }
}
*/

