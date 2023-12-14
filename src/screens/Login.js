import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'
import { useMyContextController, login } from '../context'
import { useEffect } from 'react'

const Login = ({ navigation }) => {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(true);
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller
  const texttk = user.trim();
  const textmk = password.trim();
  useEffect(() => {
    if (userLogin != null) {
      if (userLogin.role == "admin") {
        console.log("Trang Admin")
        navigation.navigate("BottomTabScreen")
      }
      else {
        console.log("Trang Customer")
        navigation.navigate("Customer")
      }
    }

  }, [userLogin])
  const handleLogin = async () => {
    if (textmk.length == 0 || texttk.length == 0) {
      Alert.alert("Thông báo!", "Vui lòng nhập tài khoản và mật khẩu", [
        { text: "bỏ qua", style: 'cancel' },
        { text: "ok", style: "default" },
      ])
    }
    else {
      login(dispatch, user, password)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textLogin}>ĐĂNG NHẬP</Text>
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
      <Button
        mode='contained'
        onPress={handleLogin}
        style={{ width: 150, alignSelf: 'center' }}>
        Đăng nhập
      </Button>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text style={styles.textSignup}>Bạn chưa có tài khoản? </Text>
        <Button mode='text'
          onPress={() => navigation.navigate("SigninScreen")}>
          Đăng ký
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