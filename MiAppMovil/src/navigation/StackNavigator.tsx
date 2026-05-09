import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";


//1. declarar tipado para pantallas y sus parametros
export type RootStackParamList = {
    Login: undefined,
    Home: {email: string},
}
//2. crear el stack navigator el cual va a manejar la navegacion
const Stack = createNativeStackNavigator<RootStackParamList>();

//3. utilizar el stack 
export default function StackNavigator(){
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}
