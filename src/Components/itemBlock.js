import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "./Styles";
import Botao from "./botao"
import { useState } from "react";




export default function itemBlock({children}){
    return (
        <View style={[css.FlexCenter, {backgroundColor:"white", width:"90%", height:"auto", flexDirection:"column", justifyContent:"center", elevation:1, borderRadius:10, borderWidth:0.5, marginVertical:15}]}>

            {children}

        </View>
    )
}