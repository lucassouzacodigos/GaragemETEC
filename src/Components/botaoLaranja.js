import { TouchableOpacity, Text, Image, View } from "react-native";
import { css } from "./Styles";

export default function BotaoLaranja({ textoBotao, imagemBotao, funcao }) {
  return (
    <TouchableOpacity onPress={funcao} style={[css.botaoLaranja]}>
      <Image  source={imagemBotao} />
      <Text style={{color:"white", fontSize:25, fontFamily:"Arial", fontWeight:"bold"}}>{textoBotao}</Text>
    </TouchableOpacity>

  );
}