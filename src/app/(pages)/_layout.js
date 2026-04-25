import { Stack, Slot } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/ComponentesDePagina/NavBar";



export default function StackLayout(){
    return(
            <View style={{flex:1}}> 
                <Stack.Screen options={{headerShown: false}} />
                <Slot />
                <NavBar/>
            </View>
    )
}