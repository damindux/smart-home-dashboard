#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

#define WIFI_SSID "Damindu"
#define WIFI_PASSWORD "myhotspot"

#define API_KEY "AIzaSyAJeQwT-fGmhKQoinG9xhXfn0HCKN2sRzI"
#define DATABASE_URL "https://smart-home-2195e-default-rtdb.asia-southeast1.firebasedatabase.app/"

#define DHT_SENSOR_PIN 4
#define DHT_SENSOR_TYPE DHT11

DHT dht_sensor(DHT_SENSOR_PIN, DHT_SENSOR_TYPE);

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

bool signupOK = false;

bool livingLight = false;
bool bathLight = false;
bool bedLight = false;
bool kitchenLight = false;
bool door = false;

void setup() {
  pinMode(15, OUTPUT);
  Serial.begin(9600);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("ok");
    signupOK = true;
  } else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  config.token_status_callback = tokenStatusCallback;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  float temperature = dht_sensor.readTemperature();
  float humidity = dht_sensor.readHumidity();

  if (Firebase.ready() && signupOK) {
    //Temperature and Humidity
    if(Firebase.RTDB.setInt(&fbdo, "living_room/temperature", temperature)) {
      Serial.print("Temperature: ");
      Serial.println(temperature);
    } else {
      Serial.println("Failed to read from the sensor");
      Serial.println("Reason: " + fbdo.errorReason());
    }

    if (Firebase.RTDB.setFloat(&fbdo, "living_room/humidity", humidity)) {
      Serial.print("Humidity: ");
      Serial.print(humidity);
    } else {
      Serial.println("Failed to read from the sensor");
      Serial.println("Reason: " + fbdo.errorReason());
    }

    // Living Room
    if (Firebase.RTDB.getBool(&fbdo, "living_room/light")) {
      if(fbdo.dataType() == "boolean") {
        livingLight = fbdo.boolData();
        digitalWrite(2, livingLight);
      }
    } else {
      Serial.println(fbdo.errorReason());
    }

    if (Firebase.RTDB.getBool(&fbdo, "living_room/fan")) {
      if (fbdo.dataType() == "boolean") {
        int fanSpeed = fbdo.boolData() ? 255 : 0;
        analogWrite(5, fanSpeed);
      }
    }

    // Bathroom
    if (Firebase.RTDB.getBool(&fbdo, "bath_room/light")) {
      if(fbdo.dataType() == "boolean") {
        bathLight = fbdo.boolData();
        digitalWrite(18, bathLight);
      }
    } else {
      Serial.println(fbdo.errorReason());
    }

    // Bedroom
    if (Firebase.RTDB.getBool(&fbdo, "bed_room/light")) {
      if(fbdo.dataType() == "boolean") {
        bedLight = fbdo.boolData();
        digitalWrite(19, bedLight);
      }
    } else {
      Serial.println(fbdo.errorReason());
    }

    // Kitchen
    if (Firebase.RTDB.getBool(&fbdo, "kitchen/light")) {
      if(fbdo.dataType() == "boolean") {
        kitchenLight = fbdo.boolData();
        digitalWrite(21, kitchenLight);
      }
    } else {
      Serial.println(fbdo.errorReason());
    }

    // Door
    if (Firebase.RTDB.getBool(&fbdo, "bed_room/light")) {
      if(fbdo.dataType() == "boolean") {
        door = fbdo.boolData();
        digitalWrite(22, door);
      }
    } else {
      Serial.println(fbdo.errorReason());
    }
  }

  delay(1000);
}
