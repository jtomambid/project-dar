// import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from '@env';

const apiKey = process.env.API_KEY;
const authDomain = process.env.AUTH_DOMAIN;
const projectID = process.env.PROJECT_ID;
const storageBucket = process.env.STORAGE_BUCKET;
const messagingSenderID = process.env.MESSAGING_SENDER_ID;
const appID = process.env.APP_ID;
const measurementID = process.env.MEASUREMENT_ID;


export { 
    apiKey,
    authDomain,
    projectID,
    storageBucket,
    messagingSenderID,
    appID,
    measurementID
}