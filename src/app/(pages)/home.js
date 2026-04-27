import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao";
import { useEffect, useState } from "react";
import ItemBlock from "../../Components/itemBlock"
import { db } from "../../Services/FirebaseParams";
import { collection, addDoc, getDocs, getDoc, query, where, limit, orderBy } from "firebase/firestore";
import carroLogo from '../../assets/carroLogo.png'
import InputNomeado from "../../Components/inputNomeado";
import marcas from '../../Listas/marcas'
import BotaoComImg from "../../Components/botaoComImg";
import Header from "../../Components/ComponentesDePagina/Header";
import NavBar from "../../Components/ComponentesDePagina/NavBar";
import RegistroBlock from "../../Components/RegistroBlock";
import RegistroBlockSaida from "../../Components/RegistroBlockSaida";
import Alerts from "../../Components/alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Registros(){

    const [todosRegistros, setTodosRegistros] = useState([])

    const getTodosRegistros = async () => {
        const escola = await getEscola();
        const q = query(
            collection(db, "movimentacoes"),
            where("escola", "==", escola),
            orderBy("entrada", "desc"),
            limit(5)
        );

        const querySnapshot = await getDocs(q);

        const registros = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        const listaExpandida = registros.flatMap(item => {
            const eventos = [];

            eventos.push({
                id: item.id + "_entrada",
                tipo: "entrada",
                data: item.entrada,
                nome: item.nome,
                placa: item.placa
            });

            if (item.saida) {
                eventos.push({
                    id: item.id + "_saida",
                    tipo: "saida",
                    data: item.saida,
                    nome: item.nome,
                    placa: item.placa
                });
            }

            return eventos;
        });

        listaExpandida.sort((a, b) => {
            return b.data.toMillis() - a.data.toMillis();
        });

        setTodosRegistros(listaExpandida);
    };

    useEffect(() => {
        getTodosRegistros()
    }, [])

    async function getEscola(){
        const escola = await AsyncStorage.getItem('escola')
        return escola
    }

    return(
        <SafeAreaView style={[css.safeArea, css.FlexCenter]} edges={["right"]}>
            <Stack.Screen options={{headerShown: false}} />

            
            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start", backgroundColor:"red"}]}>
                <Header/>
                
                <ScrollView style={css.mainScroll} contentContainerStyle={css.mainScrollContent}>


                    <View style={[css.botoesRegistro, {backgroundColor:"lightblue"}]}>
                        <BotaoComImg largura={"93%"} />
                        <BotaoComImg largura={"45%"} />
                        <BotaoComImg largura={"45%"} />
                    </View>

                    <View style={{ width:"100%", paddingHorizontal:"8%"}}>
                            <Text style={[css.TituloPagina, {}]}>Ultimas movimentações</Text>
                    </View>

                    {todosRegistros.length == 0 && 
                        <View>
                            <ActivityIndicator size="large" color={css.AzulPrincipal} style={{ transform: [{ scale: 1.5 }] }} />   
                        </View>
                    }

                    <ItemBlock>
                    {todosRegistros.map(item => {
                        return(
                            <RegistroBlockSaida key={item.id} carro={item} refresh={getTodosRegistros} expandable={false}/>
                        )
                    })}
                    </ItemBlock>


                </ScrollView>

                <NavBar/>


            </View>
        </SafeAreaView>
    )
}