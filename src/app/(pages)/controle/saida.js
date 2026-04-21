import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../../Components/Styles";
import Botao from "../../../Components/botao"
import { useEffect, useState } from "react";
import ItemBlock from "../../../Components/itemBlock"
import { db } from "../../../Services/FirebaseParams";
import { collection, addDoc, query, where, getDocs, getDoc } from "firebase/firestore";
import carroLogo from '../../../assets/carroLogo.png'
import InputNomeado from "../../../Components/inputNomeado";
import marcas from '../../../Listas/marcas'
import BotaoComImg from "../../../Components/botaoComImg";
import Header from "../../../Components/ComponentesDePagina/Header";
import NavBar from "../../../Components/ComponentesDePagina/NavBar";



export default function Entrada(props){

    
    
    
    const [nome, setNome] = useState()
    const [placa, setPlaca] = useState()   
    const [carrosDentro, setCarrosDentro] = useState([])
    
    useEffect(() => {
        const getCarrosDentroDaEtec = async () => {
            const q = query(collection(db, "movimentacoes"), where("saida", "==", null));
            const querySnapshot = await getDocs(q);
            const carrosDentro = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
                }));
            setCarrosDentro(carrosDentro)
        }
        getCarrosDentroDaEtec()
    }, [])


    

    return(
                <SafeAreaView style={[css.safeArea, css.FlexCenter]} edges={["right"]}>
                    <Stack.Screen options={{headerShown: false}} />
        
                    
                    <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start"}]} >
                        
        
                        <Header />

                        <View style={{ width:"100%", paddingHorizontal:"8%"}}>
                            <Text style={[css.TituloPagina, {}]}>Registrar saída da ETEC:</Text>
                        </View>

                        <ScrollView style={[css.mainScroll]} contentContainerStyle={css.mainScrollContent}>
                            <ItemBlock>

                                {carrosDentro.map((carro, index) => (
                                    <View key={index} style={{width:"100%", alignItems:"center"}}>
                                        <Text>{carro.placa}</Text>
                                    </View>
                                ))}
                                
                            </ItemBlock>
                        </ScrollView>

                        <NavBar />

                    </View>
                </SafeAreaView>
    )
}