import { Text, TextInput, View } from "react-native";
import { css } from '../Components/Styles'




export default function InputNomeado({titulo, onChangeText, conectivo, children, value, tituloSize, tituloCor, secureTextEntry}){



    return(
        <View style={{width:"90%", backgroundColor:"transparent", margin:8}}>
            <Text style={{paddingLeft:"1%", fontWeight:"bold", fontSize: tituloSize, color:tituloCor}}>{titulo}</Text>
            <View style={{backgroundColor:"transparent", flexDirection:"row"}}>
                <TextInput
                    value={value}
                    placeholder={`Insira ${conectivo} ${titulo}`} 
                    style={[css.inputComBorda, {}]} 
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                />
                <View style={{backgroundColor:"transparent", position:"absolute", right:0, width:"auto", height:"100%", alignItems:"center", justifyContent:"center"   }}>
                    {children}
                </View>
            </View>
        </View>
    )
}