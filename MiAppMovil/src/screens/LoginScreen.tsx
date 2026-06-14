import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import ScreenWrapper from "../components/ScreenWrapper";
import { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { i18n } from "../contexts/LanguageContext";
import { supabase } from "../services/supabaseClient";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

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
    try {
      const redirectUrl = Linking.createURL("/");

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      if (data?.url) {
        await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
      }
    } catch (error) {
      console.log(error);
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

      <CustomButton
  title="Crear cuenta"
  onPress={() => navigation.navigate("Register")}
  variant="secondary"
/>
    </ScreenWrapper>
  );
}