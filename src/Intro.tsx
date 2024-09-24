import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from "@react-navigation/native";
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";


function Intro() : JSX.Element {
    console.log("-- Intro()")

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>()

   useFocusEffect(React.useCallback(() => {
    setTimeout(async ()=> {

        let userId = await AsyncStorage.getItem('userId')
        let autoLogin = await AsyncStorage.getItem('AutoLogin')
        let isAutoLogin = userId ? true : false

        if(isAutoLogin && autoLogin == '1') {
            navigation.push("Main")
        }
        // else if(isAutoLogin && autoLogin == '0') {
        //     navigation.push("Main_Setting")
        // } 
        else {
            AsyncStorage.removeItem('userId').then(()=> {
                navigation.push("Login")
                
            })
        }
    }, 2000)
   }, []))

    

    return (
        <SafeAreaView style={styles.container}>
            <Icon name='taxi' size={100} color={'#3498db'}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
})

export default Intro