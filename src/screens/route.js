import "react-native-gesture-handler";
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useMyContextController } from '../context'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Login'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Customer from "./Customer";
import Signin from "./Signin";
import Home from "./Home";
import BottomTab from "./BottomTab";
import DetailService from "./DetailService";
import EditServiceScreen from "./EditService";
const Stack = createStackNavigator()

const Router = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController()
  const { userLogin } = controller;
  console.log(userLogin);
  // useEffect(() => {
  //   if (userLogin == null) { navigation.navigate("Login") }
  // }, [userLogin])
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={Login} options={{ headerShown: null }} />
      <Stack.Screen name="CustomerScreen" component={Customer} />
      <Stack.Screen name="SigninScreen" component={Signin} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="BottomTabScreen" component={BottomTab} options={{ headerShown: false }} />
      <Stack.Screen name="DetailServiceScreen" component={DetailService} options={{title: "Chi tiết sản phẩm"}}/>
      <Stack.Screen name="EditServiceScreen" component={EditServiceScreen}/>
    </Stack.Navigator>
  )
}

export default Router

const styles = StyleSheet.create({})