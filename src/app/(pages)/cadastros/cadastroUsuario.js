import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../../Components/Styles";
import Botao from "../../../Components/botao"
import { useState } from "react";
import ItemBlock from "../../../Components/itemBlock"
import { db } from "../../../Services/FirebaseParams";
import { collection, addDoc } from "firebase/firestore";
import carroLogo from '../../../assets/carroLogo.png'
import InputNomeado from "../../../Components/inputNomeado";
import marcas from '../../../Listas/marcas'
import BotaoComImg from "../../../Components/botaoComImg";
import Header from "../../../Components/ComponentesDePagina/Header";




export default function home(){

    const salvarPessoa = async () => {
        //Validaçoes para salvar o nome no banco do firebase
        if(
            nome === "" || nome === null || nome === undefined || 
            sobrenome === "" || sobrenome === null ||  sobrenome === undefined
        ){
            alert("Por favor, Preencha todos os campos")
            return
        }

        //passando pela validação ele salva
    const nomeFormatado = formatarNome(nome);
    const sobrenomeFormatado = formatarNome(sobrenome);

        await addDoc(collection(db, "pessoas"), {
        nome: nomeFormatado,
        sobrenome: sobrenomeFormatado
        });
    };


    const formatarNome = (texto) => {
        return texto
            .trim() 
            .toLowerCase() 
            .split(" ") 
            .filter(p => p.length > 0)
            .map(p => p.charAt(0).toUpperCase() + p.slice(1))
            .join(" ")
    };

    // const addCarro = () => {
    //     setCamposCarros((cur) => cur + 1)
    // }
                                     // < --- ignorar, vou deletar depois
    // const subCarro = () => {
    //     setCamposCarros((cur) => cur - 1)
    // }
        

    const router = useRouter()
    
    const [nome, setNome] = useState()
    const [sobrenome, setSobrenome] = useState()

    return(

        <SafeAreaView style={[css.safeArea, css.FlexCenter]}>
            <Stack.Screen options={{headerShown: false}} />

            
            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start"}]}>
                
                <Header />

                <View style={{ width:"100%", paddingHorizontal:"8%"}}>
                    <Text style={[css.TituloPagina, {}]}>Cadastro de pessoa:</Text>
                </View>

                <ItemBlock>
                    <InputNomeado onChangeText={setNome} titulo="Nome:" conectivo={"o"}/>
                    <InputNomeado onChangeText={setSobrenome} titulo="Sobrenome:" conectivo={"o"}/>
                    <BotaoComImg acao={salvarPessoa} img="checkmark-circle-outline" text="Salvar" largura={"80%"} size={30}/>
                    {/* <BotaoComImg acao={() => router.push("/cadastros/cadastroCarro")} img="checkmark-circle-outline" text="Salvar" largura={"80%"} size={30}/> */}
                </ItemBlock>
                
            </View>

        </SafeAreaView>
    )
}