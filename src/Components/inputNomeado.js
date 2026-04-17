import { Text, TextInput, View } from "react-native";
import { css } from '../Components/Styles'




export default function InputNomeado({titulo, onChangeText, conectivo}){



    return(
        <View style={{width:"90%", backgroundColor:"transparent", margin:8}}>
            <Text style={{paddingLeft:"1%", fontWeight:"bold"}}>{titulo}</Text>
            <TextInput
                placeholder={`Insira ${conectivo} ${titulo}`} 
                style={css.inputComBorda} 
                onChangeText={onChangeText}
            />
        </View>
    )
}