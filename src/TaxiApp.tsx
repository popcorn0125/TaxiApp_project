import { SafeAreaView, StyleSheet, Text } from "react-native";
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import Intro from './Intro'
import Main from './Main'
import Login from "./Login";
import Register from "./Register";
import NickNameScreen from "./Main_Setting_NickName";
import AutoLoginAlert from './AutoLoginAlert';
import Main_Setting from "./Main_Setting";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


function TaxiApp() : JSX.Element {
    console.log("-- TaxiApp()")

    const Stack = createStackNavigator()


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Intro' component={Intro}
                options={{headerShown: false}} />
                <Stack.Screen name='Login' component={Login}
                options={{headerShown: false}} />
                <Stack.Screen name='Rigster' component={Register}
                options={{headerShown: true, title:'회원가입'}} />
                <Stack.Screen name='Main' component={Main}
                options={{headerShown: false}} />
                <Stack.Screen name='NickName' component={NickNameScreen}
                options={{headerShown: false}} />
                <Stack.Screen name='LoginAlert' component={AutoLoginAlert}
                options={{headerShown: false}} />
                {/* <Stack.Screen name="Main_Setting" component={Main_Setting} 
                /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )

}

const styles = StyleSheet.create({
    textBlack: {
        fontSize: 18,
        color: 'black'
    },
    textBlue: {
        fontSize: 18,
        color: 'blue'
    }
})

export default TaxiApp