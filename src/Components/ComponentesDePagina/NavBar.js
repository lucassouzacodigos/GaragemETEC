import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { css } from '../Styles'
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useState } from 'react';



export default function NavBar(props){

    const router = useRouter()
    const pagina = usePathname()
    const iconSize = 30
    const isActive = (rota) => pagina === rota

    return(
        <View style={css.navBarContainer}>
            <View style={css.navItemsContainer}>

                <TouchableOpacity onPress={() => router.replace("/home")} style={isActive("/home")? css.navItemSelected : css.navItem}>
                    <Ionicons 
                        name={pagina == "/home" ? "home" : "home-outline"} 
                        size={iconSize} color="black" 
                        style={css.navBarItens} 
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace("/cadastros/cadastroCarro")} style={isActive("/cadastros/cadastroCarro")? css.navItemSelected : css.navItem}>
                    <Ionicons 
                        name={pagina == "/cadastros/cadastroCarro" ? "car" : "car-outline"} 
                        size={iconSize} color="black" 
                        style={css.navBarItens} 
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace("/cadastros/cadastroUsuario")} style={isActive("/cadastros/cadastroUsuario")? css.navItemSelected : css.navItem}>
                    <Ionicons 
                        name={pagina == "/cadastros/cadastroUsuario" ? "person-add" : "person-add-outline"} 
                        size={iconSize} color="black" 
                        style={css.navBarItens} 
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace("/controle/entrada")} style={isActive("/controle/entrada")? css.navItemSelected : css.navItem}>
                    <Ionicons 
                        name={pagina == "/controle/entrada" ? "log-in" : "log-in-outline"} 
                        size={iconSize} color="black" 
                        style={css.navBarItens} 
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace("/controle/saida")} style={isActive("/controle/saida")? css.navItemSelected : css.navItem}>
                    <Ionicons 
                        name={pagina == "/controle/saida" ? "log-out" : "log-out-outline"} 
                        size={iconSize} color="black" 
                        style={css.navBarItens} 
                    />
                </TouchableOpacity>

                



            </View>
            
        </View>
    )
}