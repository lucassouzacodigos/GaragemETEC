import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao";
import { Activity, useState } from "react";
import ItemBlock from "../../Components/itemBlock"
import { db } from "../../Services/FirebaseParams";
import { collection, addDoc, getDoc, collectionGroup, getDocs, query, where, or } from "firebase/firestore";
import InputNomeado from "../../Components/inputNomeado";
import BotaoComImg from "../../Components/botaoComImg";
import Header from "../../Components/ComponentesDePagina/Header";
import NavBar from "../../Components/ComponentesDePagina/NavBar";
import { MaterialCommunityIcons as Icones, AntDesign as AntIcons } from "@expo/vector-icons";
import Alerts from "../../Components/alerts";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function definirEscola(props){

    const router = useRouter()
    const [escola, setEscola] = useState('');
    const [senha, setSenha] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [alertData, setAlertData] = useState({visible: false, mensagem: "", tipo: "sucesso"})


    const handleLogin = async () => {

        setCarregando(true)

        //validaçao dos campos
        if (escola == '' || escola == null || escola == undefined ||
            senha == '' || senha == null || senha == undefined) {
            setAlertData({visible: true, mensagem: "Preencha todos os campos", tipo: "erro"})
            setTimeout(() => {
                setCarregando(false)
            }, 1500);
            return
        }

        //query no firebase pra ver se a escola existe
        const q = query(collection(db, "instituicoes"), or(
            where("cod", "==", escola),
            where("name", "==", escola)
        ));
        const snapshot = await getDocs(q);

        //se nao existe entre aqui
        if (snapshot.empty) {
            setAlertData({visible: true, mensagem: "Dados incorretos", tipo: "erro"})
            setTimeout(() => {
                setCarregando(false)
            }, 1500);
            return
        }


        let login = false
        let name

        snapshot.forEach((doc) => {
            const obj = doc.data()
            console.log(obj)
            if (obj.password == senha) {
                login = true}
                name = obj.displayName
        })

        if (login) {
            //DEFINE NA MEMORIA INTERNA DO CELULAR A ESCOLA SELECIONADA
            AsyncStorage.setItem("escola", snapshot.docs[0].data().name)
            setAlertData({visible: true, mensagem: `Escola definida com sucesso: ${name}`, tipo: "sucesso"})
            setTimeout(() => {
                setCarregando(false)
                router.replace("/home")
            }, 1500);
            
        } else {
            setAlertData({visible: true, mensagem: "Dados incorretos", tipo: "erro"})
        }

    }
    

    return(
                <SafeAreaView style={[css.safeArea, css.FlexCenter]} edges={["right"]}>
                    <Stack.Screen options={{headerShown: false}} />
        
                    
                    <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start", backgroundColor:"#225AF4", alignItems:"center", justifyContent:"center"}]} >
                        
                        <InputNomeado tituloCor={"white"} tituloSize={20} titulo="Codigo/Nome da instituição:" onChangeText={setEscola} value={escola} conectivo="a" />
                        <InputNomeado secureTextEntry tituloCor={"white"} tituloSize={20} titulo="Senha de acesso:" onChangeText={setSenha} value={senha} conectivo="a" />


                        {!carregando && 
                            <BotaoComImg acao={handleLogin} borderRadius={7} img={"log-in"} size={35} text={"Entrar"} largura={200} />
                        }

                        {carregando &&
                            <ActivityIndicator size="large" color="white" style={{margin:10, transform: [{scale: 1.5}]}} /> 
                        }


                    </View>


                    {/* ALERT */}
                    <Alerts 
                    visible={alertData.visible} 
                    hide={() => setAlertData({...alertData, visible: false})}
                    alerta={alertData.mensagem}
                    duration={1500}
                    type={alertData.tipo}
                    />
                </SafeAreaView>
    )
}