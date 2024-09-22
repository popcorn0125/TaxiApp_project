import { SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";

function Main_Setting() : JSX.Element {
    console.log("-- Main_Setting()")

    const [autologin, setAutoLogin] = useState('')

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>()

    const onLogOut = () => {
        AsyncStorage.removeItem('userId').then(()=> {
            navigation.popToTop()
        })
    }

    useEffect(() => {
        const settingAutoLogin = async () => {
            try {
                const auto = await AsyncStorage.getItem('AutoLogin')
                if(auto == '0'){
                    setAutoLogin('자동 로그인 활성화가 필요합니다.')
                } else {
                    setAutoLogin('자동 로그인 활성화 완료...')
                }
            }
            catch(error) {
                console.error('Failed to load AutoLogin', error)
            }
        }

        settingAutoLogin()
    },[])

    let arrSetMenu = [
        {id:0, name:'로그아웃'},
        {id:1, name:'닉네임 설정'},
        {id:2, name:autologin}
    ]


    return (
        <SafeAreaView style={styles.container}>
            <FlatList style={{width:'100%'}}
            data={arrSetMenu}
            renderItem={({item})=>{
                console.log('row = ' + JSON.stringify(item))
                if(item.id ===0){
                    return (
                        <TouchableOpacity style={[styles.container]} onPress={onLogOut}>
                            <Text style={styles.textForm}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }
                else if(item.id === 1) {
                    return (
                        <TouchableOpacity style={[styles.container]} onPress={() => navigation.navigate("NickName")}>
                            <Text style={styles.textForm}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }
                else if(item.id === 2) {
                    return (
                        <View style={styles.container}>
                            <Text style={styles.text}>
                                {item.name}
                            </Text>
                        </View>
                    )
                }
            }}
            keyExtractor={(item:any)=>item.id}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    textForm : {
        borderWidth: 1,
        borderColor : '#3498db',
        padding : 20,
        width : '100%',
        fontSize : 18,
        textAlign : 'center',
        color: '#3498db',
        marginBottom: 2
    },
    text : {
        color:'black',
        fontSize: 16,
    }
})

export default Main_Setting