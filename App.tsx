import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './src/navigation/MainNavigation'
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
    <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
    </ApplicationProvider>
    </Provider>
  )
}

export default App