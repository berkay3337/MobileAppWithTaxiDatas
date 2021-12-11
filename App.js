import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import Type1 from './src/screens/Type1';
import Type2 from './src/screens/Type2';
import Type3 from './src/screens/Type3';
import Date from './src/screens/Date';



const Stack = createStackNavigator();


const App = () => {

   
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Ana Menü' }}
        />
        <Stack.Screen name="Type1" component={Type1} />
        <Stack.Screen name="Type2" component={Type2} />
        <Stack.Screen name="Type3" component={Type3} />
        <Stack.Screen name="Date" component={Date} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
 