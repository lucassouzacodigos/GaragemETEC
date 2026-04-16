import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao"
import { useState } from "react";


const teste = () => {
    router.push("/home")
}



export default function login(){
    const router = useRouter()


    const [user, setUser] = useState('') 
    const [senha, setSenha] = useState('') 




    return(

        <SafeAreaView style={[css.safeArea, css.FlexCenter]}>
            <Stack.Screen options={{headerShown: false}} />

            <View style={[css.quadrado,css.FlexCenter]}> 



                <TextInput    //INPUT DE RA/CPF
                style={[css.input]} 
                onChangeText={setUser}
                placeholder='RA/CPF'
                />

                <TextInput   //INPUT DE SENHA
                style={[css.input]}
                onChangeText={setSenha}
                placeholder='Senha'
                />

                <Botao text="Entrar" largura="120" acao={() => router.push("/home")} cor="green" />
                <Botao text="Firebase" largura="120" acao={() => router.push("/firebase")} cor="green" />

                <Text>Usuario: {user}</Text>
                <Text>Senha: {senha}</Text>


            </View>

        </SafeAreaView>
    )
}