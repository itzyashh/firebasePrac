import { View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { s } from './SignUp.style'
import auth from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/MainNavigation';
import routes from '../../navigation/routes';


interface SignUpProps {
      navigation: NativeStackNavigationProp<RootStackParamList,typeof routes.SIGNUP>
    }

const SignUp = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [weakPassword, setWeakPassword] = useState(false)
    console.log(firstName, lastName, email, password)
    const onSignUpPress = () => {
    auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!');
    navigation.navigate(routes.HOME)
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/weak-password') {
            setWeakPassword(true)
        console.log('Password is too weak!');
        }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
    }

  return (
    <Layout style={s.container}>
        <View style={s.inputContainer}>
            <View style={s.nameContainer}>
        <Input
        style={s.input}
        maxLength={15}
        placeholder='First Name' />
        <Input
        style={s.input}
        maxLength={15}
        placeholder='Last Name' />

        </View>
        <Input 
        keyboardType='email-address'
        style={s.input}
        onChangeText={setEmail}
        autoCapitalize='none'
        placeholder='Email' />
        <View>

        <Input 
        style={s.input}
        secureTextEntry
        onChangeText={setPassword}
        status={weakPassword ? 'danger' : 'basic'}
        placeholder='Password' />
        {weakPassword && <Text status='danger' category='c1'>Weak Password</Text>}
        </View>
        <Input 
        style={s.input}
        secureTextEntry
        enterKeyHint='next'
        placeholder='Confirm Password' />

        <View style={s.btnContainer}>
        <Button
        onPress={onSignUpPress}
        style={s.btn}>Sign Up</Button>
        </View>

        </View>
    </Layout>
  )
}

export default SignUp