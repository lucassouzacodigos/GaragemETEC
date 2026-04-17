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
import InputNomeado from "../../../Components/inputNomeado";





export default function home(){

    const cadastrar = () => {
        addDoc(collection(db, "carros"), {
            marca: marca,
            modelo: modelo,
            cor: cor
        })
    } 

    const addCarro = () => {
        setCamposCarros((cur) => cur + 1)
    }

    const subCarro = () => {
        setCamposCarros((cur) => cur - 1)
    }
        

    const router = useRouter()
    
    const [camposCarros, setCamposCarros] = useState(1)
    const [nome, setNome] = useState()
    const [carros, setCarros] = useState()

    return(

        <SafeAreaView style={[css.safeArea, css.FlexCenter]}>
            <Stack.Screen options={{headerShown: false}} />

            
            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start"}]}>
                
                <Text>cadastro de usuarios</Text>

                <TextInput style={css.inputComBorda}  />
                <InputNomeado onChangeText={setNome} titulo="Nome:" />

                {Array.from({length: camposCarros}).map((_, index) => {
                    return(
                        <View key={index} style={{width:"100%"}}>
                            <InputNomeado titulo={`Carro ${(index+1).toString()}:`} ></InputNomeado>
                        </View>
                    )
                })}

                <Botao largura={200}  text="addcarro" acao={() => {addCarro()}}/>
                <Botao largura={200}  text="subcarro" acao={() => {subCarro()}}/>
                    <Text>{camposCarros}</Text>
            </View>

        </SafeAreaView>
    )
}