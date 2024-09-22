import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInput } from "react-native-gesture-handler";
import {useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login() : JSX.Element {
    console.log("-- Login()")

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>()

    const [userId, setUserId] = useState('')
    const [userPw, setUserPw] = useState('')
    const [disable, setDisable] = useState(true)
    const [nickname, setNickname] = useState('')
    const [successCount, setSuccessCount] = useState(0)

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
                const storedUserId = await AsyncStorage.getItem('preLoginUserId')
                if(storedUserId !== null) {
                    setUserId(storedUserId)
                }
            }
            catch (error) {
                console.error('Failed to load userid', error)
            }
        }

        loadNickname()
        loadUserId()
    },[])

    useEffect(() => {
        console.log('성공 횟수가 변경되었습니다:', successCount);
        if(successCount == 0) return
        if(successCount == 3) {
            gotoRegister();
        } else {
            Alert.alert('로그인 실패','아이디 또는 비밀번호를 다시 입력해주세요')
        }
    }, [successCount]);



    const onIdChange = (newId:string) => {
        newId && userPw ? setDisable(false) : setDisable(true)
        setUserId(newId)
    }

    const onPwChange = (newPw : string) => {
        newPw && userId ? setDisable(false) : setDisable(true)
        setUserPw(newPw)
    }

    const gotoRegister = () => {
        navigation.push("Rigster")
    }

    const gotoMain = () => {
        if(userPw == '1') {
            AsyncStorage.setItem('userId', userId).then( () => {
                navigation.push("LoginAlert")
            })
            .catch()
            .finally
        } else {
            console.log('저장전 : ' + successCount)
            setSuccessCount(successCount+1)
        }
    }

    const getNickname = () => {
        if(nickname.trim() == '' || nickname.trim() == null) {
            return false
        }
        return true
    }

    const isDisable = () => {
        if(userId.trim() == '' || userId == null) return false
        else return true
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Icon name='taxi' size={80} color={'#3498db'}/>
            </View>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder={"아이디를 입력하세요"}
                onChangeText={onIdChange} value={userId} />
                
                <TextInput style={styles.input} placeholder={"비밀번호를 입력하세요"} secureTextEntry={true} 
                onChangeText={onPwChange} editable={isDisable()}/>
                <Text style={styles.text}>
                    {getNickname() ? `최근 사용자 닉네임: ${nickname}` : '최근 사용자 없음.'}
                </Text>
            </View>

            <View style={styles.container}>
                <TouchableOpacity style={disable ? styles.buttonDisable : styles.button} disabled={disable} onPress={gotoMain}>
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {marginTop:5}]} onPress={gotoRegister}>
                    <Text style={styles.buttonText}>회원가입</Text>
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

export default Login