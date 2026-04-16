import { Stack } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao"
import { useState } from "react";
import Header from "../../Components/header"
import ItemBlock from "../../Components/itemBlock"





export default function home(){






    return(

        <SafeAreaView style={[css.safeArea, css.FlexCenter]}>
            <Stack.Screen options={{headerShown: false}} />

            
            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start"}]}>
                <Header></Header>
                
                <ScrollView style={{width:"100%", backgroundColor:"transparent"}} contentContainerStyle={{alignItems:"center", marginTop:10}}>

                    <ItemBlock>
                        <View style={{backgroundColor:"pink"}}>
                            <Text>aaa</Text>
                            <Text>bbb</Text>
                            <Text>ccc</Text>
                        </View>
                    </ItemBlock>
                        
                    <ItemBlock>
                        <Text>aaa</Text>
                        <Text>DDD</Text>
                        <Text>ccc</Text>
                    </ItemBlock>

                    <ItemBlock/>
                    <ItemBlock/>
                    <ItemBlock/>
                    
                </ScrollView>

            </View>

        </SafeAreaView>
    )
}