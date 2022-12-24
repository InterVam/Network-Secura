import { Text, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import {
  ThemeInput,
  ThemeText,
  ThemeButtonContainer,
} from "../global/components";
import { S } from "../global/styles";
import {createUserWithEmailAndPassword , getAuth} from 'firebase/auth'
import { getFirestore , doc, setDoc } from "firebase/firestore";
import { app } from "../global/firebaseConf"
import { useToast } from "react-native-toast-notifications";
const Signup = ({ navigation }) => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [email,setEmail] = useState("")
  const [pass,setPass] = useState("")
  const [deviceuser,setDeviceUser] = useState("")
  const [devicepass,setDevicePass] = useState("")
  const Toast = useToast();
  const handleEmail =(e)=>{
    setEmail(e)
  }
  const handlePass =(e)=>{
    setPass(e)
  }
  const handleDeviceUser =(e)=>{
    setDeviceUser(e)
  }
  const handleDevicePass =(e)=>{
    setDevicePass(e)
  }
    
  const handleSignUp = ()=>{ 
    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      try  {
          setDoc(doc(db, "users",user.uid), {
          Duser: deviceuser,
          Dpass: devicepass
        });
      } catch (e) {
        Toast.show("Server error, please try again later",{
          type:"danger",
          animationType: "slide-in"
        });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      Toast.show(`Check Credentials ${errorCode}`,{
        type:"danger",
        animationType: "slide-in"
      });
    })
  }


  return (
    <KeyboardAvoidingView style={S.container}>
      <ThemeText style={S.appTitle}>Secura</ThemeText>
      <Form>
        <ThemeText style={{ textAlign: "left", marginBottom: 5 }}>
          Sign up
        </ThemeText>
      
        <ThemeInput placeholder="Email" onChangeText={handleEmail} style={S.margin} />
        <ThemeInput placeholder="Password" onChangeText={handlePass} style={S.margin} secureTextEntry />
        <ThemeInput placeholder="Device Username" onChangeText={handleDeviceUser} style={S.margin} />
        <ThemeInput placeholder="Device Password" onChangeText={handleDevicePass} style={S.margin} secureTextEntry/>
        <ThemeButtonContainer onPress={handleSignUp} style={S.margin}>
          <ThemeText style={{ ...S.center, color: S.theme.white }}>
            Sign up
          </ThemeText>
        </ThemeButtonContainer>
        <LoginLink>
          Already a user?{" "}
          <Text
            style={{ color: "#0d47a1" }}
            onPress={() => navigation.navigate("Login")}
          >
            Login!
          </Text>
        </LoginLink>
      </Form>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const Form = styled.View`
  display: flex;
  padding: 20px;
  border-radius: 12px;
`;

const LoginLink = styled(ThemeText)`
  text-align: left;
  margin: 5px 0 0 5px;
  font-size: 15px;
`;
