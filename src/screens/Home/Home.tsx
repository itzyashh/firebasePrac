import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/MainNavigation'
import routes from '../../navigation/routes';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

interface HomeProps {
  navigation: NativeStackNavigationProp<RootStackParamList, typeof routes.HOME>
}

const Home: React.FC<HomeProps> = () => {
  const user = useSelector(state => state.user.userInfo)
  const route = useRoute()
  console.log('route', route)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Email:  {user?.email}</Text>
      <Text>Name: {user?.name}</Text>
      <Text>ID: {user?.id}</Text>
    </View>
  )
}

export default Home