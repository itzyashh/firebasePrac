
import React, { useEffect, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import routes from '../../navigation/routes'
import { RootStackParamList } from '../../navigation/MainNavigation'
import auth from '@react-native-firebase/auth';
import { s } from './Login.style'
import { Button, Icon, Input, Layout } from '@ui-kitten/components'
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducers/userReducer';



interface LoginProps {
  navigation: NativeStackNavigationProp<RootStackParamList,typeof routes.LOGIN>
}

const Login: React.FC<LoginProps> = ({navigation}) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState()
  const [intializing, setInitializing] = useState(true)

  const onAuthStateChanged = (user: any) => {
    console.log(user)
    setUser(user)
    const userInfo = {
      email: user?.email,
      id: user?.uid,
      name: user?.displayName
    }
    console.log('userInfo234', userInfo)
    dispatch(login(userInfo))
    if (intializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber
  }, [])


  const onSignInPress = async () => {

    try {
      await auth().signInWithEmailAndPassword(email, password)
      console.log('User signed in!')
      //user info
console.log('user',auth().currentUser)
const userInfo = {
  email: auth().currentUser?.email,
  id: auth().currentUser?.uid,
  name: auth().currentUser?.displayName
}
      dispatch(login(userInfo))
    } catch (e) {
      console.error(e)
    }
  }

  const onSignUpPress = () => {
    navigation.navigate(routes.SIGNUP)
  }

  return <Layout style={s.container}>

    <View style={s.inputContainer}>
    <Input 
        keyboardType='email-address'
        onChangeText={setEmail}
        autoCapitalize='none'
        placeholder='Email' />
    <Input placeholder='Password' 
    secureTextEntry
    onChangeText={setPassword}
    />
    </View>

    <Button
    onPress={onSignInPress}
    >Sign In</Button>



    <View style={s.gBtnContainer}>
    <Button onPress={onSignUpPress}>Sign Up</Button>
    <Button>Google</Button>
    </View>  

  </Layout>
}

export default Login