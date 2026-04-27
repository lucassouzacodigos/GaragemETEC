import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../../Components/Styles";
import Botao from "../../../Components/botao"
import { useEffect, useState } from "react";
import ItemBlock from "../../../Components/itemBlock"
import { db } from "../../../Services/FirebaseParams";
import { collection, addDoc, query, where, getDocs, getDoc, orderBy } from "firebase/firestore";
import carroLogo from '../../../assets/carroLogo.png'
import InputNomeado from "../../../Components/inputNomeado";
import marcas from '../../../Listas/marcas'
import BotaoComImg from "../../../Components/botaoComImg";
import Header from "../../../Components/ComponentesDePagina/Header";
import NavBar from "../../../Components/ComponentesDePagina/NavBar";
import RegistroBlock from "../../../Components/RegistroBlock";
import Alerts from "../../../Components/alerts";
import { Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Entrada(props){

    
    
    
    const [nome, setNome] = useState()
    const [placa, setPlaca] = useState()   
    const [carrosDentro, setCarrosDentro] = useState([])

    const [alertData, setAlertData] = useState({
    visible: false,
    mensagem: "",
    tipo: "sucesso"
    });
    
    const getCarrosDentroDaEtec = async () => {
            const escola = await AsyncStorage.getItem('escola')

            const q = query(collection(db, "movimentacoes"), where("saida", "==", null), where("escola", "==", escola), orderBy("entrada", "desc"));
            const querySnapshot = await getDocs(q);
            const carrosDentro = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
                }));
            setCarrosDentro(carrosDentro)
    }

    useEffect(() => {
        getCarrosDentroDaEtec()
    },[])


    

    return(
                <SafeAreaView style={[css.safeArea, css.FlexCenter]} edges={["right"]}>
                    <Stack.Screen options={{headerShown: false}} />
        
                    
                    <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start"}]} >
                        
        
                        <Header />

                        <View style={{ width:"100%", paddingHorizontal:"8%"}}>
                            <Text style={[css.TituloPagina, {}]}>Registrar saída da ETEC:</Text>
                        </View>

                        {carrosDentro.length == 0 && <ScrollView style={[css.mainScroll]} contentContainerStyle={css.mainScrollContent}>
                            <ItemBlock>
                                <Text style={{fontSize:15, fontWeight:"bold", color:"black", marginTop:15}}>Sem carros estacionados no momento</Text>
                                <Octicons name="blocked" size={50} color="black" style={{margin:15}} />
                            </ItemBlock>
                        </ScrollView>}

                        {carrosDentro.length > 0 && <ScrollView style={[css.mainScroll]} contentContainerStyle={css.mainScrollContent}>
                            <ItemBlock>
                                {carrosDentro.map((carro) => (
                                    <RegistroBlock expandable={true} key={carro.id} carro={carro} refresh={getCarrosDentroDaEtec}/>
                                ))}
                                
                            </ItemBlock>
                        </ScrollView>}

                        <NavBar />

                        {/* ALERT */}
                        <Alerts 
                        visible={alertData.visible} 
                        hide={() => setAlertData({...alertData, visible: false})}
                        alerta={alertData.mensagem}
                        duration={1500}
                        type={alertData.tipo}
                        />

                    </View>
                </SafeAreaView>
    )
}