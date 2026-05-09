import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function RegisterScreen () {
     //definicion de una variable de estado en ReactN
const [email, setEmail] = useState("");
const [password, setPassword] = useState ("");
const [name, setName] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      
       <CustomInput 
        placeholder={"Ingresa tu nombre"} 
        value={name} 
        onChange={setName}
        />
          <CustomInput 
          type={"number"}
        placeholder={"Ingresa tu numero de telefono"} 
        value={phoneNumber} 
        onChange={setPhoneNumber}
        />
      <CustomInput 
        type={"email"} 
        placeholder={"micorreo@gmail.com"} 
        value={email} 
        onChange={setEmail}
        />
      <CustomInput 
        type={"password"} 
        placeholder={"Ingresa tu contraseña"} 
        value={password} 
        onChange={setPassword}
        />
      <CustomButton
        title={"App"}
        onPress={() => {
          console.log("Press desde boton App");
        }}
      />
       <CustomButton
        title={"Secondary Button"}
        onPress={() => {
          console.log("Press desde boton Secundario");
        }}
        variant="secondary"
      />
       <CustomButton
        title={"Tertiary Button"}
        onPress={() => {
          console.log("Press desde boton Secundario");
        }}
        variant="tertiary"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    
  },
});