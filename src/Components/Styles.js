import { StyleSheet, Dimensions } from "react-native";


const { height, width } = Dimensions.get("screen")


export const css = StyleSheet.create({
    AzulPrincipal: "#225AF4",
    VerdeClaro: "#28ee00",


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
        paddingHorizontal:15,
        margin:1,
        backgroundColor:"#F5F5F5",
        width:"100%",
        borderRadius:7,
        borderWidth:1,
        borderColor:"black",
        fontWeight:"bold"
    },
    dropdown: {
        paddingHorizontal: 15,
        margin: 1,
        width: "100%",
        height: 45,
        backgroundColor:"#F5F5F5",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    botaComImg:{
        alignItems:"center",
        justifyContent:"space-around",
        width:50,
        height:50,
        backgroundColor:"#28ee00",
        flexDirection:"row",
        borderRadius:7,
        borderColor: "#225AF4",
        borderWidth:2,
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
    // text
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
    TituloPagina:{
        fontSize:30,
        fontWeight:"bold"
    },
    navBarContainer:{
        width:"100%",
        height:"14%",
        backgroundColor:"white",
        flexDirection:"row",
        alignItems:"start",
        justifyContent:"space-around",
        paddingTop:2,
    },
    navItemsContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        backgroundColor:"#abcdef",
        borderRadius:500,
        height:"60%"
    },
    navBarItens:{
        marginHorizontal:15,
    },
    navItem:{
        alignItems:"center",
        justifyContent:"center",
        height:"100%",
        width:"auto"    
    },
    navItemSelected:{
        alignItems:"center",
        justifyContent:"center",
        height:"70%",
        borderRadius:200,
        width:"auto",
        backgroundColor:"#28ee00", 
        margin:2
    },
    mainScroll:{
        backgroundColor:"white",
        width:"100%",
        height:"auto",
        padding:10
    },
    mainScrollContent:{
        alignItems:"center",
    },
    botoesRegistro:{
        marginVertical:10,
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        flexWrap:"wrap",
    },
    
})