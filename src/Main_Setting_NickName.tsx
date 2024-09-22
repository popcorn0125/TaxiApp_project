import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const NickNameScreen = () => {
    const [nickname, setNickname] = useState('')
    const[inputNickname, setInputNickname] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {
        const loadNickname = async () => {
            try{
                const storedNickname = await AsyncStorage.getItem('nickname')
                if(storedNickname !== null) {
                    setNickname(storedNickname)
                }
            }
            catch (error) {
                console.error('Failed to load nickname', error)
            }
        }

        const loadUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId')
                if(storedUserId !== null) {
                    setUserId(storedUserId)
                }
            }
            catch(error) {
                console.error('Failed to load userId', error)
            }
        }

        loadNickname()
        loadUserId()
    })

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>()

    const onLogOut = () => {
        AsyncStorage.removeItem('userId').then(()=> {
            navigation.popToTop()
        })
    }

    const saveNickname = async () => {
        if(inputNickname === '') {
            Alert.alert('오류', '닉네임을 입력하세요')
            return
        }

        try{
            await AsyncStorage.setItem('nickname', inputNickname)
            setNickname(inputNickname)
            // Alert.alert('성공','닉네임이 저장되었습니다.')
            await AsyncStorage.setItem('preLoginUserId', userId)
            onLogOut()
        }
        catch(error) {
            console.error('Failed to save nickname', error)
            Alert.alert('오류', '닉네임 저장을 실패했습니다.')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="닉네임 입력"
                value={inputNickname}
                onChangeText={setInputNickname}
                />
                <TouchableOpacity style={styles.button} onPress={saveNickname}>
                    <Text style={styles.buttonText} >저장</Text>
                </TouchableOpacity>
                <Text style={styles.text}>
                    {nickname ? `현재 닉네임: ${nickname}` : '닉네임이 설정하지 않았습니다.'}
                </Text>
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
    buttonDisable : {
        width:'70%',
        backgroundColor: 'gray',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,

    },
    buttonText : {
        color:'white',
        fontSize: 16,
        textAlign: 'center'
    },
    input : {
        width: '70%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginVertical : 10,
        padding : 10
    },
    text : {
        color:'black',
        fontSize: 16,
        textAlign: 'center'
    },
})


export default NickNameScreen

