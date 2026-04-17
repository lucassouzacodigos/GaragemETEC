import { StyleSheet, Dimensions } from "react-native";


const { height, width } = Dimensions.get("screen")


export const css = StyleSheet.create({
    AzulPrincipal: "#225AF4",


    FlexCenter:{
        alignItems: "center",
        justifyContent: "center",
    },
    safeArea:{
        backgroundColor: "#3DC2FF",
        backgroundColor: "white",
        width: width,
        height: height,
    },
    quadrado:{
        backgroundColor: "white",
        height: "100%",
        width: width,
        borderRadius: 8,
    },
    input:{
        textAlign: "center",
        width: "80%",
        borderBottomWidth: 1,
        borderColor: "black",
        margin: 13,
    },
    inputComBorda:{
        margin:1,
        backgroundColor:"#F5F5F5",
        width:"100%",
        borderRadius:7,
        fontWeight:"bold"
    },
    botao:{
        margin:5,
        fontWeight: "bold",
        height: 30,
        backgroundColor: "#f5f5f5",
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "rgba(53, 53, 53, 1)00ff"
    },
    logoText1:{
        color:"white",
        width:"100%",
        fontSize:70,
        fontWeight:"bold",
    },
    logoText2:{
        paddingBottom:"2%",
        fontSize:70,
        fontWeight:"bold",
    },
})