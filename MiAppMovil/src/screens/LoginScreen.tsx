import { View } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useState } from "react";

export default function LoginScreen({navigation}:any) {
    const [email, setEmail] = useState('');

    const handleLogin = () => {
        try{
            navigation.navigate('Home', {email});
        }catch (error){
            console.log(error);
        }
    }


    return(
        <View>
            <CustomInput placeholder={"Ingresa tu correo"} 
            value={email} 
            onChange={setEmail}/>

            <CustomInput type={"password"} 
            placeholder={"Ingresa tu contraseña"} 
            value={""} 
            onChange={()=>{}}/>
            <CustomButton title={"Iniciar Sesion"} onPress={handleLogin}/>
        </View>
    )
}