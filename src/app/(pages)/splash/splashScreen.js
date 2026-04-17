import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../../Components/Styles";
import Botao from "../../../Components/botao"
import { useState } from "react";
import Header from "../../../Components/header"
import ItemBlock from "../../../Components/itemBlock"
import { db } from "../../../Services/FirebaseParams";
import { collection, addDoc } from "firebase/firestore";
import carroLogo from '../../../assets/carroLogo.png'





export default function home(){

    const cadastrar = () => {
        addDoc(collection(db, "carros"), {
            marca: marca,
            modelo: modelo,
            cor: cor
        })
    } 
        

    const router = useRouter()

    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [cor, setCor] = useState('')

    return(

        <SafeAreaView style={[css.safeArea, css.FlexCenter]} edges={["left", "right"]}>
            <Stack.Screen options={{headerShown: false}} />

            
            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"center"}]}>
                
                <View style={[css.FlexCenter, {backgroundColor:"#225AF4", height:"100%", width:"100%", flexDirection:"column", alignItems:"center"}]}>

                    <View style={{backgroundColor:"transparent", width:"90%"}}>
                        <Text style={css.logoText1}>Garagem</Text>

                        <View style={{flexDirection:"row", alignItems:"flex-end", justifyContent:"center", width:"100%"}}>
                            <Image  source={carroLogo} style={{width:120, height:120}} />
                            <Text style={css.logoText2}>ETEC</Text>
                        </View>
                    </View>


                </View>

            </View>

        </SafeAreaView>
    )
}