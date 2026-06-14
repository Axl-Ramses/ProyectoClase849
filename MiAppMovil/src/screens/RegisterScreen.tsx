import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { supabase } from "../services/supabaseClient";

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = async () => {
    // Actividad 2 - Validacion basica
    if (!name.trim() || !email.trim() || !password.trim() || !phoneNumber.trim()) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    // Actividad 3 - Registro con Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Error al registrarse", error.message);
      return;
    }

    if (data.user) {
      Alert.alert("Registro exitoso", "¡Bienvenido a la aplicación!");
      navigation.navigate("Login");
    }
  }; 
  return (
    <View style={styles.container}>
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
        title={"Registrarse"}
        onPress={handleRegister}
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