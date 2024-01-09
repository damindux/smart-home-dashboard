import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAJeQwT-fGmhKQoinG9xhXfn0HCKN2sRzI",
    authDomain: "smart-home-2195e.firebaseapp.com",
    databaseURL: "https://smart-home-2195e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smart-home-2195e",
    storageBucket: "smart-home-2195e.appspot.com",
    messagingSenderId: "60295512862",
    appId: "1:60295512862:web:af1afbf87493d03b8dbf0f"
};
  
const app = initializeApp(firebaseConfig);

const database = app.database();

const temperatureRef = database.ref('living_room/temperature');
const humidityRef = database.ref('living_room/humidity');
const livingRoomLightRef = database.ref('living_room/light');
const livingRoomFanRef = database.ref('living_room/fan');

const bathroomLightRef = database.ref('bath_room/light');

const bedroomLightRef = database.ref('bed_room/light');

const kitchenLightRef = database.ref('kitchen/light');

const mainDoorRef = database.ref('main_door/lock');

// Temperature and Humidity
temperatureRef.on('value', (snapshot) => {
    const temperature = snapshot.val();
    document.getElementById('temp').textContent = temperature;
});

humidityRef.on('value', (snapshot) => {
    const humidity = snapshot.val();
    document.getElementById('hum').textContent = humidity;
});

// Living Room
const livingRoomLightSwitch = document.getElementById('lrl-switch');
const livingRoomFanSlider = document.getElementById('fan');

livingRoomLightSwitch.addEventListener('change', () => {
    livingRoomLightRef.transaction(currentValue => !currentValue);
});

livingRoomFanSlider.addEventListener('change', () => {
    livingRoomFanRef.set(livingRoomFanSlider.value);
});

// Bathroom
const bathroomLightSwitch = document.getElementById('btl-switch');

bathroomLightSwitch.addEventListener('change', () => {
    bathroomLightRef.transaction(currentValue => !currentValue);
});

// Bedroom
const bedroomLightSwitch = document.getElementById('bdl-switch');

bedroomLightSwitch.addEventListener('change', () => {
    bedroomLightRef.transaction(currentValue => !currentValue);
});

// Kitchen
const kitchenLightSwitch = document.getElementById('kl-switch');

kitchenLightSwitch.addEventListener('change', () => {
    kitchenLightRef.transaction(currentValue => !currentValue);
});

// Main Door
const mainDoorSwitch = document.getElementById('d-lock');

mainDoorSwitch.addEventListener('change', () => {
    mainDoorRef.transaction(currentValue => !currentValue);
});