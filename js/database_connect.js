import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAJeQwT-fGmhKQoinG9xhXfn0HCKN2sRzI",
    authDomain: "smart-home-2195e.firebaseapp.com",
    databaseURL: "https://smart-home-2195e-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "smart-home-2195e",
    storageBucket: "smart-home-2195e.appspot.com",
    messagingSenderId: "60295512862",
    appId: "1:60295512862:web:af1afbf87493d03b8dbf0f"
};
  
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const temperatureRef = ref(database, 'living_room/temperature');
const humidityRef = ref(database, 'living_room/humidity');
const livingRoomLightRef = ref(database, 'living_room/light');
const livingRoomFanRef = ref(database, 'living_room/fan');

const bathroomLightRef = ref(database, 'bath_room/light');

const bedroomLightRef = ref(database, 'bed_room/light');

const kitchenLightRef = ref(database, 'kitchen/light');

const mainDoorRef = ref(database, 'main_door/lock');

// Temperature and Humidity
onValue(temperatureRef, (snapshot) => {
    const temperature = snapshot.val();
    console.log('Temperature:', temperature);
    document.getElementById('temp').innerHTML = temperature;
});

onValue(humidityRef, (snapshot) => {
    const humidity = snapshot.val();
    console.log('Humidity:', humidity);
    document.getElementById('hum').innerHTML = humidity;
});

// Living Room
const livingRoomLightSwitch = document.getElementById('lrl-switch');
const livingRoomFanSlider = document.getElementById('fan');

livingRoomLightSwitch.addEventListener('change', () => {
    runTransaction(livingRoomLightRef, currentValue => !currentValue);
});

livingRoomFanSlider.addEventListener('change', () => {
    const fanValue = parseFloat(livingRoomFanSlider.value);
    set(livingRoomFanRef, fanValue);
});

// Bathroom
const bathroomLightSwitch = document.getElementById('btl-switch');

bathroomLightSwitch.addEventListener('change', () => {
    runTransaction(bathroomLightRef, currentValue => !currentValue);
});

// Bedroom
const bedroomLightSwitch = document.getElementById('bdl-switch');

bedroomLightSwitch.addEventListener('change', () => {
    runTransaction(bedroomLightRef, currentValue => !currentValue);
});

// Kitchen
const kitchenLightSwitch = document.getElementById('kl-switch');

kitchenLightSwitch.addEventListener('change', () => {
    runTransaction(kitchenLightRef, currentValue => !currentValue);
});

// Main Door
const mainDoorSwitch = document.getElementById('d-lock');

mainDoorSwitch.addEventListener('change', () => {
    runTransaction(mainDoorRef, currentValue => !currentValue);
});