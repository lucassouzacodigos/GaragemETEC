import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao"
import { useState } from "react";
import Header from "../../Components/header"
import ItemBlock from "../../Components/itemBlock"
import { db } from "../../Services/FirebaseParams";
import { collection, addDoc } from "firebase/firestore";





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

        <SafeAreaView style={[css.safeArea, css.FlexCenter]}>
            <Stack.Screen options={{headerShown: false}} />

            
            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start"}]}>
                <Header></Header>

                <TextInput style={{backgroundColor:"white", width:"80%", borderRadius:15, borderColor:"black", borderWidth:1, textAlign:"center"}} onChangeText={setMarca} placeholder="Marca"></TextInput>
                <TextInput style={{backgroundColor:"white", width:"80%", borderRadius:15, borderColor:"black", borderWidth:1, textAlign:"center"}} onChangeText={setModelo} placeholder="Modelo"></TextInput>
                <TextInput style={{backgroundColor:"white", width:"80%", borderRadius:15, borderColor:"black", borderWidth:1, textAlign:"center"}} onChangeText={setCor} placeholder="Cor"></TextInput>
                
                <Botao text="cadastrar" largura="200" acao={cadastrar} cor="lightblue" /> 
                <Botao text="fodase" largura="200" acao={() => router.push("/splash/splashScreen")} cor="pink" /> 

            </View>

        </SafeAreaView>
    )
}