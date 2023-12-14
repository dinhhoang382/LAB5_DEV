import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useEffect } from 'react';
import { MyContextControllerProvider } from './src/context';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/screens/route';

const intial = () => {
  const USER = firestore().collection("USER")
  const admin = {
    name: "admin",
    phone: "0899760010",
    address: "Binh Duong",
    image: 'https://pbs.twimg.com/media/EE6tWrXX4AAo-zS.jpg',
    email: 'hoang382.wk@gmail.com',
    password: '123456',
    role: "admin"
  }
  USER.doc(admin.email).onSnapshot(u=>{
    if(!u.exists)
    {
      auth().createUserWithEmailAndPassword(admin.email, admin.password).
      then(()=>
      USER.doc(admin.email).set(admin))
      .then(()=>console.log("Add new user admin"))
    }
  })
}
export default App =()=>{
  useEffect(()=>{
    intial()
  },[])
  return(
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
    </MyContextControllerProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
