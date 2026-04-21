import { Stack } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../Components/Styles"
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import BotaoComImg from "./botaoComImg";
import Botao from "./botao";
import { addDoc, collection, Timestamp, getDocs, getDoc, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Services/FirebaseParams";




export default function RegistroBlock({carro, refresh}){

    const [modalState, setModalState] = useState(false)
    const [confirmaSaida, setConfirmaSaida] = useState(false)


    const horaEntrada = carro.entrada?.toDate()
    const horaConvertida = horaEntrada.getHours().toString().padStart(2, "0") + 
    ":" + horaEntrada.getMinutes().toString().padStart(2, "0")

    const requestSaida = () => {
        setConfirmaSaida(true)
        console.log(carro.saida)
    }

    const darSaidaFirebase = async () => {
        await updateDoc(doc(db, "movimentacoes", carro.id), {
            saida: Timestamp.now()
        });
        
        setConfirmaSaida(false)
        setModalState(false)
        refresh()
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
                <Text style={[css.bola, {backgroundColor: carro.status == null ? "green" : "red"}]} > </Text>
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

            <Modal visible={confirmaSaida} animationType="fade" transparent >
                {/* Wrapper */}
                <View style={{width:"100%", height:"100%", backgroundColor: "rgba(0,0,0,0.9)", alignItems:"center", justifyContent:"center", borderRadius:10}}>
                    {/* Conteúdo */}
                    <View style={{width:"80%", height:"auto", backgroundColor:"white", alignItems:"center", justifyContent:"center", borderRadius:10}}>
                        <TouchableOpacity onPress={() => setConfirmaSaida(false)}>
                            <Text style={{fontWeight:"bold", fontSize:30, textAlign:"center"}}>ATENÇÃO !</Text>
                            <Ionicons name="warning" size={30} color={"red"} style={{position:"absolute", right:"5%", top:"5%"}}></Ionicons>
                            
                            <Text style={{fontWeight:"bold", fontSize:20, textAlign:"center"}}>Voce Tem Certeza Que o Veiculo com a Placa: "{carro.placa}" Saiu Desse local?</Text>

                            <View style={{width:"100%", flexDirection:"row", justifyContent:"space-around"}}>
                                <Botao text="Sim" cor="green" acao={darSaidaFirebase} largura={"45%"} ></Botao>
                                <Botao text="Não" cor="red" acao={() => {setConfirmaSaida(false)}} largura={"45%"} ></Botao>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </Modal>
        </TouchableOpacity>
    )
}