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
import SelectPessoa from "../../../Components/SelectPessoa";
import Header from "../../../Components/ComponentesDePagina/Header";
import NavBar from "../../../Components/ComponentesDePagina/NavBar";


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


    const salvar = () => {
        //validaçao dos dados antes de salvar, se algum campo nao estiver preenchido, nao salva
        if (
            placa == null || placa == undefined || placa == '' ||
            modelo == null || modelo == undefined || modelo == '' ||
            cor == null || cor == undefined || cor == '' ||
            usuarioID == null || usuarioID == undefined || usuarioID == ''
        ){
            alert("Preencha corretamente todos os campos")
            return
        }

        //se todos campos estiverem preenchidos, salva no banco
        addDoc(collection(db, "carros"), {
            placa: placa,
            modelo: modelo,
            cor: cor,
            usuarioID: usuarioID
        })
    }
        

    const router = useRouter()
    
    const [placa, setPlaca] = useState()
    const [modelo, setModelo] = useState()
    const [cor, setCor] = useState()
    const [usuarioID, setUsuarioID] = useState()

    return(

        <SafeAreaView style={[css.safeArea, css.FlexCenter]} edges={["right"]}>
            <Stack.Screen options={{headerShown: false}} />

            
            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start"}]} >
                

                <Header />

                <ScrollView style={[css.mainScroll]} contentContainerStyle={css.mainScrollContent}>

                    <View style={{ width:"100%", paddingHorizontal:"8%"}}>
                        <Text style={[css.TituloPagina, {}]}>Cadastro de carro:</Text>
                    </View>

                    <ItemBlock>
                        <InputNomeado onChangeText={setPlaca} titulo={`Placa:`} conectivo={"seu"} ></InputNomeado>
                        <InputNomeado onChangeText={setModelo} titulo={`Modelo:`} conectivo={"o"} ></InputNomeado>
                        <InputNomeado onChangeText={setCor} titulo={`Cor:`} conectivo={"a"} ></InputNomeado>
                        <SelectPessoa onSelect={(id) => setUsuarioID(id)} ></SelectPessoa>
                        {/* <InputNomeado onChangeText={} titulo={`Usuário:`} conectivo={"o"} ></InputNomeado> */}

                        <View style={{flexDirection:"row", marginVertical:10}}>
                            <BotaoComImg acao={salvar} text="Salvar" largura="80%" img="save-outline" size={30}></BotaoComImg>
                        </View>

                    </ItemBlock>

                </ScrollView>

                <NavBar/>

            </View>

        </SafeAreaView>
    )
}