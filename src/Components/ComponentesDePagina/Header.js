import { Stack } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons'
import { css } from "../Styles";



export default function Header(props){



    return(
        <View style={{width:"100%", flexDirection:"row", height:90, backgroundColor:css.AzulPrincipal, alignItems:"center", justifyContent:"center"  }}>
            <Text style={{fontSize:45, fontWeight:"bold", color:"white"}}>Garagem</Text>
            <Ionicons name="car-sport" size={50} color="black" style={{margin:5}}/>
            <Text style={{fontSize:45, fontWeight:"bold"}}>Etec</Text>
        </View>
    )
}