import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
    apiKey: "AIzaSyBh1YtO2DcJzfJms1UPUk1F7pLNA4jLzSQ",
    authDomain: "ourszone-2f56d.firebaseapp.com",
    projectId: "ourszone-2f56d",
    storageBucket: "ourszone-2f56d.appspot.com",
    messagingSenderId: "128828230608",
    appId: "1:128828230608:web:80273116e7245f406387d5",
    measurementId: "G-80V9EX1N83",
    databaseURL:"https://ourszone-2f56d-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);