import { Stack } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image, Modal, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../Components/Styles"
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import BotaoComImg from "./botaoComImg";
import Botao from "./botao";
import { addDoc, collection, Timestamp, getDocs, getDoc, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Services/FirebaseParams";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Alerts from "./alerts";



export default function RegistroBlock({carro, refresh}){

    const insets = useSafeAreaInsets()
    const [modalState, setModalState] = useState(false)
    const [confirmaSaida, setConfirmaSaida] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alertData, setAlertData] = useState({
    visible: false,
    mensagem: "",
    tipo: "sucesso"
    });


    const horaEntrada = carro.entrada?.toDate()
    const horaConvertida = horaEntrada.getHours().toString().padStart(2, "0") + 
    ":" + horaEntrada.getMinutes().toString().padStart(2, "0")

    const requestSaida = () => {
        setConfirmaSaida(true)
        setAlertData({visible: false, mensagem: "teste", tipo: "sucesso"})
    }

    const darSaidaFirebase = async () => {
        await updateDoc(doc(db, "movimentacoes", carro.id), {
            saida: Timestamp.now()
        });

        setAlertData({
            visible: true,
            mensagem: "Saída registrada com sucesso",
            tipo: "sucesso"
        });
        
        setModalState(false)
        setConfirmaSaida(false)
        setLoading(true)
        
        setTimeout(() => {
            setLoading(false)
            refresh()

        }, 1500);
    }

//     const deletarTudo = async () => {
//   const snapshot = await getDocs(collection(db, "movimentacoes"));

//   const promises = snapshot.docs.map(d =>
//     deleteDoc(doc(db, "movimentacoes", d.id))
//   );

//   await Promise.all(promises);

//   console.log("Todos deletados");
// };

    if (!carro) {
        return(
            <Text>tem nada</Text>
        )
    }

    return(


        <TouchableOpacity onPress={() => setModalState(!modalState)} style={css.RegistroBlock}>

            <Ionicons name="person" size={35} color="black" style={{position:"absolute", left:5}}/>

            {/* linha de cima */}
            <View style={{width:"100%", flexDirection:"row", justifyContent:"flex-start", backgroundColor:"transparent", alignItems:"center"}}>
                <Text style={css.bold}>Nome: </Text>
                <Text numberOfLines={1} adjustsFontSizeToFit style={{fontWeight:"bold", width:"50%"}}>{carro.nome}</Text>
                <Text style={css.bold}>Status: </Text>
                {!loading && <Text style={[css.bola, {backgroundColor: carro.status == null ? "green" : "red"}]} > </Text>}
                {loading && <ActivityIndicator size="small" color="black" />}
            </View>

            {/* Linha de baixo */}
            <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between", backgroundColor:"transparent"}}>
                <Text style={css.bold}>Placa:  {carro.placa}</Text>
                <Text>{horaConvertida}</Text>
            </View>
                

            {modalState && 
                <TouchableOpacity onPress={requestSaida} style={{backgroundColor:"red", height:50, width:"100%", borderRadius:200, margin:10, alignItems:"center", justifyContent:"center", elevation:5 }}>
                    <Text adjustsFontSizeToFit  numberOfLines={1} style={{color:"white", fontSize:15, fontWeight:"bold"}}>Dar Saida do estacionamento</Text>
                </TouchableOpacity>
            }

            <Modal visible={confirmaSaida} animationType="fade" transparent statusBarTranslucent>
                {/* Wrapper */}
                <TouchableOpacity onPress={() => setConfirmaSaida(false)} style={{flex:1, 
                alignItems:"center",
                backgroundColor:"rgba(0, 0, 0, 0.3)", 
                justifyContent:"center", 
                borderRadius:10,}}>
                    {/* Conteúdo */}
                    <View style={{width:"80%", 
                        height:"auto", 
                        backgroundColor:"rgba(255, 255, 255, 1)", 
                        alignItems:"center", 
                        justifyContent:"center", 
                        borderRadius:10,
                        borderWidth:2,
                        borderColor:"black",
                        borderStyle:"solid",}}>
                        <TouchableOpacity onPress={() => setConfirmaSaida(false)}>
                            <Text style={{fontWeight:"bold", fontSize:30, textAlign:"center"}}>ATENÇÃO !</Text>
                            <Ionicons name="warning" size={30} color={"red"} style={{position:"absolute", right:"5%", top:"5%"}}></Ionicons>
                            
                            <Text style={{fontWeight:"bold", fontSize:20, textAlign:"center"}}>Voce Tem Certeza Que o Veiculo com a Placa: "{carro.placa}" Saiu Desse local?</Text>

                            <View style={{width:"100%", flexDirection:"row", justifyContent:"space-around"}}>
                                <Botao fontSize={25} fontcolor="white" text="Sim" cor="green" acao={darSaidaFirebase} largura={"45%"} altura={50} ></Botao>
                                <Botao fontSize={25} fontcolor="white" text="Não" cor="red" acao={() => {setConfirmaSaida(false)}} largura={"45%"} altura={50} ></Botao>
                            </View>
                        </TouchableOpacity>
                    </View>
                    

                </TouchableOpacity>
            </Modal>
                    {/* ALERT */}
                    <Alerts 
                    visible={alertData.visible} 
                    hide={() => setAlertData({...alertData, visible: false})}
                    alerta={alertData.mensagem}
                    duration={1500}
                    type={alertData.tipo}
                    />
        </TouchableOpacity>
    )
}