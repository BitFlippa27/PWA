import { identity } from 'lodash';
import {  getTask, getAllTasks, getMongoID, addTask, getAllData, addRequest } from './dexie';
const MAX_RETENTION_TIME = 60 * 24 * 7;
const requestProperties = [
    'method',
    'referrer',
    'referrerPolicy',
    'mode',
    'credentials',
    'cache',
    'redirect',
    'integrity',
    'keepalive',
];

export async function pushRequest(request) {
    console.log("request",request);

    const requestData = {
        url: request.url,
        headers: {}
    };
    
    requestData.body = await request.arrayBuffer();
    console.log("body", requestData.body )

    for (const [key, value] of request.headers.entries()) {
        requestData.headers[key] = value;
    }

    for (const prop of requestProperties) {
        if (request[prop] !== undefined) {
            requestData[prop] = request[prop];
        }
    }

    const requestObject = cloneToObject(requestData);

    const entry = {
        reqData: requestObject,
        timestamp: Date.now()
    };
    console.log("entry", entry);
    await addRequest(entry);
 
}


function cloneToObject(requestData) {
    const requestObject = Object.assign({}, requestData);
    requestObject.headers =  Object.assign({}, requestData.headers);
        if (requestObject.body) {
            console.log(requestObject.body)
            requestObject.body = requestData.body.slice(0);
        }
        return requestObject;
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

