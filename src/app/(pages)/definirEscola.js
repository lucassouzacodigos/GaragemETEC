import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao";
import { useState } from "react";
import ItemBlock from "../../Components/itemBlock"
import { db } from "../../Services/FirebaseParams";
import { collection, addDoc } from "firebase/firestore";
import InputNomeado from "../../Components/inputNomeado";
import BotaoComImg from "../../Components/botaoComImg";
import Header from "../../Components/ComponentesDePagina/Header";
import NavBar from "../../Components/ComponentesDePagina/NavBar";
import { MaterialCommunityIcons as Icones, AntDesign as AntIcons } from "@expo/vector-icons";



export default function definirEscola(props){


    const handleLogin = () => {
        
    }
    

    return(
                <SafeAreaView style={[css.safeArea, css.FlexCenter]} edges={["right"]}>
                    <Stack.Screen options={{headerShown: false}} />
        
                    
                    <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start", backgroundColor:"#225AF4", alignItems:"center", justifyContent:"center"}]} >
                        
                        <InputNomeado titulo="Codigo/Nome da instituição" onChangeText={props.setEscola} value={props.escola} conectivo="a" />
                        <InputNomeado titulo="Senha de acesso" onChangeText={props.setEscola} value={props.escola} conectivo="a" />

                        


                    </View>
                </SafeAreaView>
    )
}