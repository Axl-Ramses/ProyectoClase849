import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import ScreenWrapper from "../components/ScreenWrapper";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { i18n } from "../contexts/LanguageContext";
import { supabase } from "../services/supabaseClient";
import { Alert } from "react-native";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("mjsalinas@unitec.edu");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleLogin = () => {
    try {
      login(email, password);
      navigation.navigate("MainTabs");
    } catch (error) {
      console.log(error);
    }
  };

    // Actividad 4 - SSO con Google
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScreenWrapper>
      <CustomInput
        type="email"
        placeholder="Ingresa tu correo"
        value={email}
        onChange={setEmail}
      />

      <CustomInput
        type="password"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChange={setPassword}
      />

      <CustomButton title={i18n.t("signIn")} onPress={handleLogin} />
         {/* Actividad 4 - Botón Google */}
      <CustomButton
        title="Continuar con Google"
        onPress={handleGoogleLogin}
        variant="secondary"
      />
    </ScreenWrapper>
  );
}
