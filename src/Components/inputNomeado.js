import { Text, TextInput, View } from "react-native";
import { css } from '../Components/Styles'




export default function InputNomeado({titulo, onChangeText}){



    return(
        <View style={{width:"90%"}}>
            <Text>{titulo}</Text>
            <TextInput
                placeholder={titulo} 
                style={css.inputComBorda} 
                onChangeText={onChangeText}
            />
        </View>
    )
}