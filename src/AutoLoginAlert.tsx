import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import {useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

function AutoLoginAlert() : JSX.Element {
    console.log("-- AutoLoginAlert()")

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>()


    const gotoMain = () => {
        AsyncStorage.setItem('AutoLogin', '1').then( ()=>{
            navigation.push('Main')
        })
    }

    const gotoMainSetting = () => {
        AsyncStorage.setItem('AutoLogin', '0').then( ()=>{
            navigation.push('Main')
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    자동 로그인을 하시겠습니까?
                </Text>
            </View>

            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={gotoMain} >
                    <Text style={styles.buttonText}>예</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {marginTop:5}]} onPress={gotoMainSetting} >
                    <Text style={styles.buttonText}>아니요</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    button : {
        width:'70%',
        backgroundColor: '#3495db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,

    },
    buttonText : {
        color:'white',
        fontSize: 16,
        textAlign: 'center'
    },
    text : {
        color:'black',
        fontSize: 16,
        textAlign: 'center'
    },
})

export default AutoLoginAlert