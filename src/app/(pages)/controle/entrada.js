import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../../Components/Styles";
import Botao from "../../../Components/botao"
import { useEffect, useState } from "react";
import ItemBlock from "../../../Components/itemBlock"
import { db } from "../../../Services/FirebaseParams";
import { collection, addDoc, Timestamp, getDocs, getDoc, query, where } from "firebase/firestore";
import carroLogo from '../../../assets/carroLogo.png'
import InputNomeado from "../../../Components/inputNomeado";
import marcas from '../../../Listas/marcas'
import BotaoComImg from "../../../Components/botaoComImg";
import Header from "../../../Components/ComponentesDePagina/Header";
import NavBar from "../../../Components/ComponentesDePagina/NavBar";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Alerts from "../../../Components/alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Entrada(props){


    const [visitante, setVisitante] = useState(false)
    const [idSelected, setIdSelected] = useState()
    const [nome, setNome] = useState()
    const [placa, setPlaca] = useState()   
    const [modalState, setModalState] = useState(false)
    const [usuarios, setUsuarios] = useState([])
    const [carros, setCarros] = useState([])

    const [alertData, setAlertData] = useState({
    visible: false,
    mensagem: "",
    tipo: "sucesso"
    });


    useEffect(() => {
        async function getUsers(){
            const snapshot = await getDocs(collection(db, "pessoas"));
            
            const usuarios = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
                }));
            setUsuarios(usuarios)
        }
        async function getCarros(){
            const snapshot = await getDocs(collection(db, "carros"));
            
            const carros = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
                }));
            setCarros(carros)
        }
        getUsers()
    }, [])

    const setVisitanteToggle = () => {
        setVisitante(!visitante)
        setNome("")
        setPlaca("")
        setIdSelected(null)
    }

    

    const pesquisar = () => {
        setModalState(true)
    }

    const selecionarPessoa = async (pessoa) => {
        setIdSelected(pessoa.id)
        setNome(pessoa.nome + " " + pessoa.sobrenome)
        setModalState(false)
        
        const q = query(collection(db, "carros"), where("usuarioID", "==", pessoa.id));
        const querySnapshot = await getDocs(q);
        const carros = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
            }));
        setCarros(carros)

        if (carros.length == 1){
            setPlaca(carros[0].placa)
        }
    }

    const registrarEntrada = async () => {
        const escola = await AsyncStorage.getItem('escola')

        if (
            nome == null || nome == "" || nome == undefined ||
            placa == null || placa == "" || placa == undefined ||
            escola == null || escola == "" || escola == undefined
        ){
            setAlertData({
                visible: true,
                mensagem: "Preencha todos os campos",
                tipo: "erro"
            });
            return
        }


        await addDoc(collection(db, "movimentacoes"), {
        usuarioID: idSelected,
        nome: nome,
        placa: placa,
        entrada: Timestamp.now(),
        saida: null,
        visitante:false,
        escola: escola
        });

        setAlertData({
            visible: true,
            mensagem: "Entrada registrada com sucesso",
            tipo: "sucesso"
        })
        
    };


    const registrarEntradaVisitante = async () => {
        if (
            nome == null || nome == "" || nome == undefined ||
            placa == null || placa == "" || placa == undefined
        ){
            setAlertData({
                visible: true,
                mensagem: "Preencha todos os campos",
                tipo: "erro"
            });
            return
        }


        await addDoc(collection(db, "movimentacoes"), {
            usuarioID: null,
            nome: nome,
            placa: placa,
            entrada: Timestamp.now(),
            saida: null,
            visitante: true
            });

            setAlertData({
                visible: true,
                mensagem: "Entrada registrada com sucesso",
                tipo: "sucesso"
            });
    };
    

    return(
                <SafeAreaView style={[css.safeArea, css.FlexCenter]} edges={["right"]}>
                    <Stack.Screen options={{headerShown: false}} />
        
                    
                    <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start"}]} >
                        
        
                        <Header />

                        <Text>{idSelected}</Text>
                        <Text>{nome}</Text>

                        <View style={{ width:"100%", paddingHorizontal:"8%"}}>
                            <Text style={[css.TituloPagina, {}]}>Registrar entrada na ETEC:</Text>
                        </View>





                        
                        {/* pesquisa */}
                        {modalState && 
                            <ScrollView style={[css.mainScroll, {backgroundColor:"pink"}]}>
                                <Text>Pesquisa de usuario</Text>
                                <TouchableOpacity onPress={() =>setModalState(false)}>
                                    <Text>fechar</Text>

                                </TouchableOpacity>
                                
                                {usuarios.map((item) => (
                                    <TouchableOpacity key={item.id} onPress={() => selecionarPessoa(item)} style={{flexDirection:"row", margin:10, backgroundColor:"white"}}>
                                        <Text style={{marginRight:5}}>{item.nome}</Text>
                                        <Text>{item.sobrenome}</Text>
                                    </TouchableOpacity>
                                ))}

                            </ScrollView>
                        }




                        {!modalState &&<ScrollView style={[css.mainScroll]} contentContainerStyle={css.mainScrollContent}>
                            <ItemBlock>

                                <InputNomeado value={nome} onChangeText={setNome} titulo="Nome:" conectivo={"o"} 
                                children={!visitante &&
                                <TouchableOpacity 
                                    onPress={pesquisar}
                                    style={{backgroundColor:css.VerdeClaro, height:"80%", width:50, justifyContent:"center", alignItems:"center", borderRadius:500, marginHorizontal:5}}>
                                    <Ionicons name="search" size={25} color="white" style={{margin:5}}/>
                                </TouchableOpacity>
                            }
                                />

                                <InputNomeado value={placa} onChangeText={setPlaca} titulo="Placa:" conectivo={"a"}/>

                                <View style={{flexDirection:"row", backgroundColor:"transparent", width:"100%", justifyContent:"start", alignItems:"center", paddingHorizontal:"7%", marginVertical:10}}>
                                    <Checkbox size={200} value={visitante} onValueChange={setVisitanteToggle} style={{ transform: [{ scale: 1.5 }], marginRight:10 }}/>
                                    <Text style={{fontSize:20, fontWeight:"bold"}}>Visitante?</Text>
                                </View>
                                <BotaoComImg acao={visitante? registrarEntradaVisitante : registrarEntrada} img="save-outline" text="Salvar" largura={"80%"} size={30}/>
                                {/* <BotaoComImg acao={() => router.push("/cadastros/cadastroCarro")} img="checkmark-circle-outline" text="Salvar" largura={"80%"} size={30}/> */}
                            </ItemBlock>
                        </ScrollView>}

                        <NavBar />

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