import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useEffect, useState } from "react";
import api from './API'
import AsyncStorage from "@react-native-async-storage/async-storage";

function Main_Map() : JSX.Element {
    console.log("-- Main_Map()")

    const [userId, setUserId] = useState('')
    const [showBtn, setShowBtn] = useState(false)
    const [startAddr, setStartAddr] = useState('')
    const [endAddr, setEndAddr] = useState('')
    
    useEffect(() => {
        const loadId = async () => {
            try{
                const id = await AsyncStorage.getItem('userId')
                if(id !== null) {
                    setUserId(id)
                }
            }
            catch (error) {
                console.error('Failed to load userId', error)
            }
        }

        loadId()
    },[])

    const onStartAddrChange = (addr:string) => {
        setStartAddr(addr)
    }

    const onEndAddrChange = (addr:string) => {
        setEndAddr(addr)
    }

    const handleLongPress = async (event :any) =>{
        setShowBtn(true)
    }

    const handleAddMarker = (title:string) => {
        setShowBtn(false)
    }

/** Day 03 실습 */
    const callAddr = async () =>{
        
        api.callAddr(userId,startAddr, '0', '0', endAddr, '0', '0')
        .then( response => {
            console.log('API call_addr / data = ' + JSON.stringify(response.data[0]))
            let {code, message} = response.data[0]
            console.log('API call_addr / code = ' + code + ', message = ' + message)

            if (code ==0 ){
                Alert.alert('호출', message)
            } 
            else{
                Alert.alert('오류', message, [{
                    text: '확인',
                    onPress: ()=> console.log('Cancel Press'),
                    style:'cancel'
                }])
            }
        })
        .catch( err => {
            console.log(JSON.stringify(err))
        })
    }
/********************************************** */


    return ( 
        <SafeAreaView style={styles.container}>
            {/** 지도 자리 */}
            <View style={[styles.container, {transform: [{scaleX:1}, {scaleY:2}]}]} >
                <Icon name="building" size={300} color={'#3498db'}
                onPress={()=> {setShowBtn(false)}}
                onLongPress={handleLongPress} />
            </View>

            <View style={{position:'absolute', width:'100%', height:'100%', padding:10}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <TextInput style={styles.input} placeholder={'출발지'} onChangeText={onStartAddrChange}/>
                        <TextInput style={styles.input} placeholder={'도착지'} onChangeText={onEndAddrChange}/>
                    </View>
                    <TouchableOpacity style={[styles.button, {marginLeft:10, justifyContent:'center'}]} onPress={callAddr}>
                        <Text style={styles.buttonText}>호출</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/** 내 위치 */}
            <TouchableOpacity style={[{position:'absolute', bottom:20, right:20}]}>
                <Icon name="crosshairs" size={40} color={'#3498db'}/>
            </TouchableOpacity>

            {showBtn && <View style={{position:'absolute', top:hp(50)-45, left:wp(50)-75, height:90, width:150}}>
                <TouchableOpacity style={[styles.button, {flex:1, marginVertical:1}]}
                onPress={() => handleAddMarker('출발지') }
                >
                    <Text style={styles.buttonText}>출발지로 등록</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {flex:1}]}
                onPress={() => handleAddMarker('도착지') }
                >
                    <Text style={styles.buttonText}>도착지로 등록</Text>
                </TouchableOpacity>
            </View>
            }

            
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
        backgroundColor: '#3495db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,

    },
    buttonDisable : {
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

        height: 40,
        borderWidth: 2,
        borderColor: 'gray',
        marginVertical : 1,
        padding : 10
    }
})
export default Main_Map