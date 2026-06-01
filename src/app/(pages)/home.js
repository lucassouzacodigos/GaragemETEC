import { router, Stack, useRouter } from "expo-router";
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
import BotaoComImgLaranja from "../../Components/botaoComImgLaranja";

export default function Registros(){
    console.log("Registros renderizou");

    const [todosRegistros, setTodosRegistros] = useState([])
    const [alertData, setAlertData] = useState({visible: false, mensagem: "", tipo: "sucesso"})

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

    async function logout(){
        await AsyncStorage.removeItem('escola')
        setAlertData({visible: true, mensagem: "Deslogado com sucesso", tipo: "sucesso"})
        setTimeout(() => {
            router.replace("/definirEscola")
        }, 1500);
    }

    return(
        <SafeAreaView style={[css.safeArea, css.FlexCenter]} edges={["right"]}>
            <Stack.Screen options={{headerShown: false}} />

            
            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start", backgroundColor:"red"}]}>
                <Header/>
                
                <ScrollView style={css.mainScroll} contentContainerStyle={css.mainScrollContent}>


                    <View style={[css.botoesRegistro, {backgroundColor:"transparent"}]}>
                        <BotaoComImg largura={"93%"} img="add-circle-outline" text="Entrada de carro" size={35} borderRadius={10} acao={() => router.push("/controle/entrada")} />
                        <BotaoComImgLaranja largura={"45%"} img="person-add-outline" text="Usuários" size={30} borderRadius={10} acao={() => router.push("/cadastros/cadastroUsuario")}/>
                        <BotaoComImgLaranja largura={"45%"} img="car" text="Veículos" size={35} borderRadius={10} acao={() => router.push("/cadastros/cadastroCarro")}/>
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

                    {/* Sair */}
                    <ItemBlock>
                        <View style={css.sair}>
                            <TouchableOpacity onPress={() => logout()} style={{width:"100%", alignItems:"center", justifyContent:"center"}}>
                                <Text style={{fontWeight:"bold", fontSize:20, color:"white"}}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </ItemBlock>

                    


                </ScrollView>

                <NavBar/>


            </View>

            <Alerts 
                visible={alertData.visible} 
                hide={() => setAlertData({...alertData, visible: false})}
                alerta={alertData.mensagem}
                duration={1600}
                type={alertData.tipo}
                />
        </SafeAreaView>
    )
}