import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/MainNavigation'
import routes from '../../navigation/routes';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import { logout } from '../../redux/reducers/userReducer';

interface HomeProps {
  navigation: NativeStackNavigationProp<RootStackParamList, typeof routes.HOME>
}

const Home: React.FC<HomeProps> = () => {
  const user = useSelector(state => state.user.userInfo)
  const route = useRoute()
  const dispatch = useDispatch()
  console.log('route', route)


  const onLogoutPress = () => {
    auth().signOut().then(() => {
      dispatch(logout())
      console.log('User signed out!')
    }
    )
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Email:  {user?.email}</Text>
      <Text>Name: {user?.name}</Text>
      <Text>ID: {user?.id}</Text>
      <Button onPress={onLogoutPress}>Logout</Button>
    </View>
  )
}

export default Home