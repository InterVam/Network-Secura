import { Button, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  ThemeInput,
  ThemeText,
  ThemeButtonContainer,
  TextIn
} from "../global/components";
import { S } from "../global/styles";
import { useToast } from "react-native-toast-notifications";
import { app } from "../global/firebaseConf";
import { getAuth ,signInWithEmailAndPassword  } from "firebase/auth";

const Login = ({ navigation }) => {
  const auth = getAuth(app);
  const Toast = useToast();

  useEffect(()=>{
   const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
            navigation.replace("Home")
          console.log(user.email)
        }

    })

    return unsubscribe;
  },[])
  
  const handleEmail =(e)=>{
    setEmail(e)
    console.log(e);
    
  }
  const handlePass =(e)=>{
    setPass(e)
  }
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
  const handlesignIn = ()=>{ 
   
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      Toast.show("Check Credentials",{
        type:"danger",
        animationType: "slide-in"
      });
    });
 

  }


  return (
    <KeyboardAvoidingView style={S.container}>
      <ThemeText style={S.appTitle}>Secura</ThemeText>
      <Form>
        <ThemeText style={{ textAlign: "left", marginBottom: 5 }}>
          Login
        </ThemeText>
        <ThemeInput placeholder="Email" onChangeText={handleEmail} style={S.margin} />
        <ThemeInput placeholder="Password" onChangeText={handlePass} style={S.margin} secureTextEntry />
        <ThemeButtonContainer onPress={handlesignIn} style={S.margin}>
          <ThemeText style={{ ...S.center, color: S.theme.white }}>
            Login
          </ThemeText>
        </ThemeButtonContainer>
        <SignupLink>
          New to secura?{" "}
          <Text
            style={{ color: "#0d47a1" }}
            onPress={() => navigation.navigate("Signup")}
          >
            Signup!
          </Text>
        </SignupLink>
      </Form>
    </KeyboardAvoidingView>
  );
};

export default Login;

const Form = styled.View`
  display: flex;
  padding: 20px;
  border-radius: 12px;
`;

const SignupLink = styled(ThemeText)`
  text-align: left;
  margin: 5px 0 0 5px;
  font-size: 15px;
`;
