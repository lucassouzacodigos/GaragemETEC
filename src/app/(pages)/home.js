import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao";
import { useState } from "react";
import ItemBlock from "../../Components/itemBlock"
import { db } from "../../Services/FirebaseParams";
import { collection, addDoc } from "firebase/firestore";
import carroLogo from '../../assets/carroLogo.png'
import InputNomeado from "../../Components/inputNomeado";
import marcas from '../../Listas/marcas'
import BotaoComImg from "../../Components/botaoComImg";
import Header from "../../Components/ComponentesDePagina/Header";
import NavBar from "../../Components/ComponentesDePagina/NavBar";
import BotaoLaranja from "../../Components/botaoLaranja";
import adicionarUser from "../../assets/adicionarUser.png";
import adicionarCarro from "../../assets/adicionarCarro.png";


export default function Registros(){

    const salvar = () => {
        console.log("adicionar")
    }

    return(
        <SafeAreaView style={[css.safeArea, css.FlexCenter]} edges={["right"]}>
            <Stack.Screen options={{headerShown: false}} />

            
            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start", backgroundColor:"red"}]}>
                <Header/>
                
                <ScrollView style={css.mainScroll} contentContainerStyle={css.mainScrollContent}>

                <BotaoComImg acao={salvar} text="Adicionar" largura="95%" img="add" size={35}></BotaoComImg>
                
                <View style={{flexDirection: "row", justifyContent:"space-around", width:"100%", marginBottom:20}}>
                <BotaoLaranja textoBotao="Usuários" imagemBotao={adicionarUser} funcao={salvar}/>
                <BotaoLaranja textoBotao="Veículos" imagemBotao={adicionarCarro} funcao={salvar}/>
                </View>

                </ScrollView>

                <NavBar/>
            </View>
        </SafeAreaView>
    )
}