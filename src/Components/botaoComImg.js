import { Stack } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../Components/Styles"
import Ionicons from '@expo/vector-icons/Ionicons'
import { MaterialCommunityIcons as Icones } from "@expo/vector-icons";


export default function BotaoComImg(props){


    return(
        <TouchableOpacity onPress={props.acao} style={[css.botaComImg, {width: props.largura, margin:5, justifyContent:"center"}]}>
            {/* <Image source={props.img} style={{height:35, width:35, justifyContent:"center", margin:5}}></Image> */}
            <Ionicons name={props.img} size={props.size} color="white" style={{margin:5}}/>
            <Text style={{color:"white", fontSize:20}}>{props.text}</Text>
        </TouchableOpacity>
    )
}   