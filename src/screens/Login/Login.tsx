
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
import { GoogleSignin } from '@react-native-google-signin/google-signin';



interface LoginProps {
  navigation: NativeStackNavigationProp<RootStackParamList,typeof routes.LOGIN>
}

const Login: React.FC<LoginProps> = ({navigation}) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState()
  const [intializing, setInitializing] = useState(true)

  GoogleSignin.configure({
    webClientId:'1085548693715-4oe3rkppk8b7p0oa2vttp01tk1joigmr.apps.googleusercontent.com'
  });
async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

  const onAuthStateChanged = (user: any) => {
    console.log(user)
    setUser(user)
    const userInfo = {
      email: user?.email,
      id: user?.uid,
      name: user?.displayName
    }
    console.log('userInfo234', userInfo)
    if (user) {
      dispatch(login(userInfo))
    }
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
    <Button
    onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    >Google</Button>
    </View>  

  </Layout>
}

export default Login