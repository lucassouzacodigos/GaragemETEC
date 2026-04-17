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
import marcas from '../../../Listas/marcas'
import BotaoComImg from "../../../Components/botaoComImg";



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
    const [modelo, setModelo] = useState()
    const [cor, setCor] = useState()
    const [usuario, setUsuario] = useState()

    return(

        <SafeAreaView style={[css.safeArea, css.FlexCenter]}>
            <Stack.Screen options={{headerShown: false}} />

            
            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start"}]}>
                
                {/* Header */}
                <View style={{backgroundColor:"red", width:"100%", height:110}}>
                    <Text>HEADER</Text>
                </View>

                <View style={{ width:"100%", paddingHorizontal:"8%"}}>
                    <Text style={[css.TituloPagina, {}]}>Cadastro de carro:</Text>
                </View>

                <ItemBlock>
                    <InputNomeado titulo={`Carro:`} conectivo={"seu"} ></InputNomeado>
                    <InputNomeado titulo={`Modelo:`} conectivo={"o"} ></InputNomeado>
                    <InputNomeado titulo={`Cor:`} conectivo={"a"} ></InputNomeado>
                    <InputNomeado titulo={`Usuário:`} conectivo={"o"} ></InputNomeado>
                    <BotaoComImg></BotaoComImg>
                </ItemBlock>

                <Botao largura={200}  text="addcarro" acao={() => {addCarro()}}/>
                <Botao largura={200}  text="subcarro" acao={() => {subCarro()}}/>
                    <Text>total de campos {camposCarros}</Text>
            </View>

        </SafeAreaView>
    )
}