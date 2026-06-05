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
import SelectPessoa from "../../../Components/SelectPessoa";
import Header from "../../../Components/ComponentesDePagina/Header";
import NavBar from "../../../Components/ComponentesDePagina/NavBar";
import Alerts from "../../../Components/alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";


export default function home(){

    const cadastrar = () => {
        addDoc(collection(db, "carros"), {
            marca: marca,
            modelo: modelo,
            cor: cor
        })
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

        if (carros.length > 0){
            setPlaca(carros[0].placa)
        }
    }

    async function getUsers(){
        const snapshot = await getDocs(collection(db, "pessoas"));
        
        const usuarios = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
            }));
        setUsuariosOriginais(usuarios)
        setUsuarios(usuarios)
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        console.log("rodou", pesquisa)
            // se pesquisa estiver vazia
            if (pesquisa.trim() === '') {
                setUsuarios(usuariosOriginais)
                return
            }
    
            const filtrados = usuariosOriginais.filter((item) => {
    
                const nomeCompleto =
                    `${item.nome} ${item.sobrenome}`.toLowerCase()
    
                return nomeCompleto.includes(
                    pesquisa.toLowerCase()
                )
            })
    
            setUsuarios(filtrados)
    
        }, [pesquisa])

    const addCarro = () => {
        setCamposCarros((cur) => cur + 1)
    }

    const subCarro = () => {
        setCamposCarros((cur) => cur - 1)
    }


    const salvar = async () => {
        //validaçao dos dados antes de salvar, se algum campo nao estiver preenchido, nao salva
        const escola = await AsyncStorage.getItem('escola')

        if (
            escola == null || escola == undefined || escola == '' ||
            placa == null || placa == undefined || placa == '' ||
            modelo == null || modelo == undefined || modelo == '' ||
            cor == null || cor == undefined || cor == '' ||
            nome == null || nome == undefined || nome == '' ||
            sobrenome == null || sobrenome == undefined || sobrenome == ''
        ){
            setAlertData({
                visible: true,
                mensagem: "Preencha todos os campos",
                tipo: "erro"
            });
            return
        }

        //se todos campos estiverem preenchidos, salva no banco
        
        const pessoaRef = await addDoc(collection(db, "pessoas"), {
            nome: nome,
            sobrenome: sobrenome,
            escola: escola
        })
        console.log(pessoaRef.id)
        console.log(pessoaRef)
        
        await addDoc(collection(db, "carros"), {
            placa: placa,
            modelo: modelo,
            cor: cor,
            escola: escola,
            usuarioDonoID: pessoaRef.id
        })

        setAlertData({
            visible: true,
            mensagem: "Carro cadastrado com sucesso",
            tipo: "sucesso"
        });
    }
        

    const router = useRouter()
    
    const [placa, setPlaca] = useState()
    const [modelo, setModelo] = useState()
    const [cor, setCor] = useState()
    const [usuarioID, setUsuarioID] = useState()
    const [nome, setNome] = useState()
    const [sobrenome, setSobrenome] = useState()
    const [modalState, setModalState] = useState(false)
    const [idSelected, setIdSelected] = useState()
    const [carros, setCarros] = useState()

    const [usuarios, setUsuarios] = useState([])    
    const [usuariosOriginais, setUsuariosOriginais] = useState([])
    const [pesquisa, setPesquisa] = useState('')



    const [alertData, setAlertData] = useState({
        visible: false,
        mensagem: "",
        tipo: "sucesso"
    });

    return(

        <SafeAreaView style={[css.safeArea, css.FlexCenter]} edges={["right"]}>
            <Stack.Screen options={{headerShown: false}} />

            
            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start"}]} >
                

                <Header />

                <ScrollView style={[css.mainScroll]} contentContainerStyle={css.mainScrollContent}>

                    <View style={{ width:"100%", paddingHorizontal:"8%"}}>
                        <Text style={[css.TituloPagina, {}]}>Cadastro Unico:</Text>
                    </View>

                    {/* Carro */}
                    <ItemBlock>
                        <Text>Informaçoes sobre o carro</Text>
                        <InputNomeado onChangeText={setPlaca} titulo={`Placa:`} conectivo={"seu"} ></InputNomeado>
                        <InputNomeado onChangeText={setModelo} titulo={`Modelo:`} conectivo={"o"} ></InputNomeado>
                        <InputNomeado onChangeText={setCor} titulo={`Cor:`} conectivo={"a"} ></InputNomeado>
                        {/* <InputNomeado onChangeText={} titulo={`Usuário:`} conectivo={"o"} ></InputNomeado> */}
                    </ItemBlock>

                    <Botao cor={"verde"} text={"Buscar Usuários"} largura={"100%"} acao={() => setPesquisa("aids")} ></Botao>

                    {/* Proprietario */}
                    <ItemBlock> 
                        <Text>Proprietário</Text>

                        <InputNomeado value={nome} onChangeText={setNome} titulo="Nome:" conectivo={"o"} 
                            children={
                            <TouchableOpacity 
                                onPress={async () => {
                                    await getUsers()
                                    setModalState(true)
                                }}
                                style={{backgroundColor:css.VerdeClaro, height:"80%", width:50, justifyContent:"center", alignItems:"center", borderRadius:500, marginHorizontal:5}}>
                                <Ionicons name="search" size={25} color="white" style={{margin:5}}/>
                            </TouchableOpacity>
                        }
                            />

                        <InputNomeado onChangeText={setSobrenome} titulo="Sobrenome:" conectivo={"o"}/>

                        {/* salvar */}
                        <View style={{flexDirection:"row", marginVertical:10}}>
                            <BotaoComImg acao={salvar} text="Salvar" largura="80%" img="save-outline" borderRadius={8} size={30}></BotaoComImg>
                        </View>
                    </ItemBlock>

                </ScrollView>

                <NavBar/>

            </View>


            {/* MODAIS */}
            {/* ALERT */}
            <Alerts 
            visible={alertData.visible} 
            hide={() => setAlertData({...alertData, visible: false})}
            alerta={alertData.mensagem}
            duration={1500}
            type={alertData.tipo}
            />

            {/* pesquisa */}
                {modalState &&
                <ScrollView style={[css.mainScroll, {
                    backgroundColor:css.AzulPrincipal, position:"absolute", height:"50%", width:"90%", borderRadius:10
                        }]} 
                    contentContainerStyle={css.mainScrollContent}>
                    
                    {/* input pesquisa */}
                    <InputNomeado value={pesquisa} onChangeText={setPesquisa} titulo="Pesquisa:" conectivo={"a"} largura={"50%"}/> 
                    <Text>{pesquisa}</Text>

                    <TouchableOpacity onPress={() =>setModalState(false)}>
                        <Text>fechar</Text>
                    </TouchableOpacity>
                    
                    {usuarios.map((item) => (
                        <TouchableOpacity key={item.id} onPress={() => selecionarPessoa(item)} style={{flexDirection:"row", margin:10, backgroundColor:"white", borderRadius:10}}>
                            <View style={css.conteudoPesquisa}>
                                <Ionicons name="person-circle-outline" size={50} color="black" style={{margin:5}}/>
                                <Text style={[css.bold,{marginRight:5}]}>{item.nome}</Text>
                                <Text style={[css.bold]}>{item.sobrenome} </Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                </ScrollView>
                }




        </SafeAreaView>
    )
}