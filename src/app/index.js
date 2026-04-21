import React, { useEffect, useState } from "react"
import { Text } from "react-native"
import { Redirect } from "expo-router"
import SplashScreen from './(pages)/splash/splashScreen'

export default function IndexPage(){
    const [go, setGo] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setGo(true)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    
    
    if (go) {
        return <Redirect href="/login" />
    } 
    return(
        <SplashScreen/>
    )
    
    return null
}
