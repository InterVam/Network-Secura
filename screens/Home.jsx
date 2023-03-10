import { View } from "react-native";
import { getAuth  } from "firebase/auth";
import {
    ThemeInput,
    ThemeText,
    ThemeButtonContainer,
  } from "../global/components";
import { S } from "../global/styles";
import { app } from "../global/firebaseConf";
import { useEffect , useState} from "react";
import { getFirestore , doc, getDoc, getDocs  } from "firebase/firestore";
import init from 'react_native_mqtt';
import { useToast } from "react-native-toast-notifications";

import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = ({ navigation }) => {
  //Firebase
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [data,setData] = useState({});
  const [pass,setPass] = useState("");
  const Toast = useToast();
  
  const handlePass =(e)=>{
    setPass(e)
  }
  const handleSignOut = () =>{
      auth
      .signOut()
      .then(()=>{
          navigation.replace("Login");
      })
  }

  const getData = async () => {
    const docRef = doc(db,"users",auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      
      setData(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
    }
  }
  useEffect(()=>{
    getData();
    },[])
  //--------------------------------------------------------------------
  //MQTT
  init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync : {}
  });
  const options = {
    host: 'intervam.giize.com',
    port: 8001,
    path: '/pass',
    id: 'id_' + parseInt(Math.random()*100000)
  };
 
  const handleMSG= ()=>{
    const client = new Paho.MQTT.Client(options.host, options.port, options.path);
    client.connect({
      useSSL: false,
      timeout: 3,
      onFailure:(()=>{
        Toast.show("Failed to connect to the server",{
          type:"danger",
          animationType: "slide-in"
        });
      }),
      userName:data?.Duser,
      password:data?.Dpass,
      onSuccess:(()=>{
      if(/^\d+$/.test(pass) && pass.length == 6) {
        var message = new Paho.MQTT.Message(pass);
        message.destinationName = "pass";
        message.qos = 2;
        message.retained = true;
        client.send(message);
        Toast.show("Password Chanegd Succefully",{
          type:"success",
          animationType: "slide-in"
        });
      } else {
        Toast.show("Password can only contain 6 digits",{
          type:"danger",
          animationType: "slide-in"
        });
      }
    })
  })}

  return (
  <View style={S.container}>
      <ThemeInput placeholder="New Device Password" onChangeText={handlePass} style={S.margin} />
    <ThemeButtonContainer onPress={handleMSG} style={S.margin}>
        <ThemeText style={{ ...S.center, color: S.theme.white }}>
          Send
        </ThemeText>
      </ThemeButtonContainer>
      <ThemeButtonContainer onPress={handleSignOut} style={S.margin}>
        <ThemeText style={{ ...S.center, color: S.theme.white }}>
          Log Out
        </ThemeText>
      </ThemeButtonContainer>
  </View>    
  );
}
 
export default Home;
