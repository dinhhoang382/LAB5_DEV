import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'

const Login = ({navigation}) => {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [passwordR, setPasswordR] = useState("")
  const [showPassword, setShowPassword] = useState(true);
  const handleSignup = async () => {
    const texttk = user.trim();
    const textmk = password.trim();
    if (textmk.length == 0 || texttk.length == 0 || passwordR.trim().length == 0) {
      Alert.alert("Thông báo!", "Vui lòng nhập tài khoản và mật khẩu", [
        { text: "bỏ qua", style: 'cancel' },
        { text: "ok", style: "default" },
      ])
    }
    else if(password != passwordR){
        Alert.alert("Thông báo!", "Mật khẩu và mật khẩu nhập lại không trùng khớp!", [
            { text: "ok", style: "default" },
          ])
    }
    else {
      await auth().createUserWithEmailAndPassword(user, password)
      .then(
        setUser(null),
        setPassword(null),
        Alert.alert("Thông báo!", "Đăng ký thành công",[{text: ok}]),
        navigation.navigate("Login"),
        console.log("Đăng ký thành công!")
      )
      .catch(e => console.error(e))
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textLogin}>ĐĂNG KÝ</Text>
      <TextInput mode='outlined'
        style={styles.textInput}
        label="Tài khoản"
        cursorColor='red'
        value={user}
        onChangeText={(user) => setUser(user)}
      />
      <TextInput mode='outlined'
        style={styles.textInput}
        label="Mật khẩu"
        cursorColor='red'
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={showPassword}
        right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={() => setShowPassword(!showPassword)} />}
      />
      <TextInput mode='outlined'
        style={styles.textInput}
        label="Nhập lại mật khẩu"
        cursorColor='red'
        value={passwordR}
        onChangeText={(passwordR) => setPasswordR(passwordR)}
        secureTextEntry={showPassword}
        right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={() => setShowPassword(!showPassword)} />}
      />
      <Button
        mode='contained'
        onPress={handleSignup}
        style={{ width: 150, alignSelf: 'center' }}>
        Đăng ký
      </Button>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text style={styles.textSignup}>Bạn đã có tài khoản? </Text>
        <Button mode='text'
          onPress={() => navigation.navigate("Login")}>
          Đăng nhập
        </Button>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  textLogin: {
    color: '#2ea',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  },
  textSignup: {
    fontWeight: 'bold',
    marginTop: 10
  },
  textInput: {
    width: '90%'
  }
})