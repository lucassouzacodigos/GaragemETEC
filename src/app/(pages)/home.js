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


export default function Registros(){


    return(
        <SafeAreaView style={[css.safeArea, css.FlexCenter]} edges={["right"]}>
            <Stack.Screen options={{headerShown: false}} />

            
            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start", backgroundColor:"red"}]}>
                <Header/>
                
                <ScrollView style={css.mainScroll} contentContainerStyle={css.mainScrollContent}>

                    <Text>asd</Text>

                    <View style={[css.botoesRegistro, {backgroundColor:"lightblue"}]}>
                        <BotaoComImg largura={"93%"} />
                        <BotaoComImg largura={"45%"} />
                        <BotaoComImg largura={"45%"} />
                    </View>

                    <ItemBlock>
                        <Text>aids</Text>
                        <Text>aids</Text>
                        <Text>aids</Text>
                        <Text>aids</Text>
                        <Text>aids</Text>
                    </ItemBlock>


                </ScrollView>

                <NavBar/>
            </View>
        </SafeAreaView>
    )
}