import { Stack, useFocusEffect } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../Components/Styles"
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import BotaoComImg from "./botaoComImg";
import Botao from "./botao";
import { addDoc, collection, Timestamp, getDocs, getDoc, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Services/FirebaseParams";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, FontAwesome5 as Icones } from "@expo/vector-icons";



export default function Alerts(props){

    const duration = props.duration

    useFocusEffect(() => {
        async function closeSelf() {
            setTimeout(() => {
                if (props.visible){
                    props.hide()
                }
            }, duration);
        }
        closeSelf()
    })

    const style = {
        padding:15,
        width:"90%",
        minWidth:300,
        height:150,
        backgroundColor:"rgba(255,255,255,1)",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:15,
        bordercolor:"black",
        borderWidth:2,
        borderType:"solid",
    }

    return (
        <Modal visible={props.visible} animationType="slide" transparent statusBarTranslucent>
            
            {/* Wrapper */}
            <TouchableOpacity onPress={props.hide} style={{width:"100%", height:"100%", justifyContent:"center", alignItems:"center", backgroundColor:"rgba(0, 0, 0, 0)"}}>
            
                {/* Conteudo Sucesso */}
                {props.type == "sucesso" &&
                <View>
                    <View style={[style, {borderColor:"green", textAlign:"center"}]}>
                        {/* Header sucesso */}
                        <View style={{marginBottom:15}}>
                            <Icones name="check-circle" size={50} color="green" style={{margin:5}}/>
                        </View>

                        <Text style={{fontSize:20, fontWeight:"bold", color:"green" , textAlign:"center"}}>{props.alerta}</Text>
                    </View>
                </View>
                }

                {/* Conteudo Erro */}
                {props.type == "erro" &&
                <View>
                    <View style={[style, {borderColor:"red"}]}>
                        {/* Header sucesso */}
                        <View style={{marginBottom:15}}>
                            <AntDesign name="warning" size={50} color="red" style={{margin:5}}/>
                        </View>

                        <Text style={{fontSize:20, fontWeight:"bold", color:"red"}}>{props.alerta}</Text>
                    </View>
                </View>
                }

            </TouchableOpacity>
        </Modal>
    )
}    