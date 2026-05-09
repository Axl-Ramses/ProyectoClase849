import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({route}: Props){
    const {email} = route.params;

    return(
        <View>
            Bienvenido {email}, a Home
        </View>
    )
}