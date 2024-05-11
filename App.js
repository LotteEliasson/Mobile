
import { NavigationContainer, Stack } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AuthPage from './AuthPage';
import TestPage from './TestPage';
import MapPage from './MapPage';

export default function App(){

  const Stack = createNativeStackNavigator();

  return(

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='AuthPage'
        screenOptions={{ headerShown: false}}
      >
        <Stack.Screen name="AuthPage" component={AuthPage} />
        <Stack.Screen name="TestPage" component={MapPage} />
        <Stack.Screen name="TestPage" component={TestPage} />

      </Stack.Navigator>
    </NavigationContainer>


  )



}