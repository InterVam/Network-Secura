# Network-Secura
### 📍 Technologies
&ensp;<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png?20220125121207" width="40"/> &nbsp; <img src="https://www.shareicon.net/download/2016/07/08/117547_developer.svg" width="40"/> &nbsp;  <img src="https://cdn.icon-icons.com/icons2/2389/PNG/512/expo_logo_icon_145293.png" width="40"/> &nbsp; <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Mqtt-hor.svg/768px-Mqtt-hor.svg.png?20210308002911" width="120"/> &nbsp;  
---
 ### 📍 Prerequisites
* you need to have docker, and docker-compose installed on your machine to run the application using docker
* you need to create firebase store

* or you need to have node & expo-cli installed on your machine (in case you don't use docker)
---
### 🛠 Instructions
---
### &ensp; After cloning this repo
1. ``` $ cd Network-Secura ```
2. ``` $ cp env.template .env ```
3. insert your firebase server credentials in the ```.env``` file

### &ensp; To run the app with docker

 &ensp; &ensp;```docker-compose up```

### &ensp; To run the application directly on your machine
1. ``` $ npm install ```
2. ``` $ expo start ``` or ``` $ expo start --tunnel ``` to run the application on your mobile

&nbsp;<br>
⚠️ Note: if you want to run the application on emulator you have to have an emulator installed like ``` Android Studio ```

⚠️ Note: you can run the application directly on your mobile with the application ```Expo Go```

⚠️ Note: ```.SSH``` directory is copied into the container so you can make your git commands from the container if you have you .git configured to work with SSH keys 
