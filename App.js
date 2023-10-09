import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import * as ScreenOrientation  from 'expo-screen-orientation';
import Home from './src/Screens/Home';
import Details from './src/Screens/Details';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Profile from './src/Screens/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

export default function App() {

  const [orientation, setOrientation] = useState('portrait'); // Estado para almacenar la orientación actual

  useEffect(() => {

    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify([]);
        await AsyncStorage.setItem('lastSongs', jsonValue);
      } catch (e) {
        console.log(e);
      }
    }
    storeData();
    
    const updateOrientation = async () => {
      const currentOrientation = await ScreenOrientation.getOrientationAsync();

      if (currentOrientation === 3 || currentOrientation === 4) {
        setOrientation('landscape');
      } else {
        setOrientation('portrait');
      }
    };

    updateOrientation();

    const subscription = ScreenOrientation.addOrientationChangeListener(updateOrientation);

    return () => {
      // Limpia la suscripción cuando el componente se desmonta
      subscription.remove();
    };
  }, []);
 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animation: 'slide_from_bottom'}}>
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={({navigation}) => ({
            title: 'Top Tracks from Mexico',
            headerStyle: {
              backgroundColor: '#162238',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18,
            },
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Profile')}
                title="Profile"
                color="#000"
                style={{borderRadius: 50  }}
              />
            ),
          })}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile}
          options={{
            title: 'My Profile',
            headerStyle: {
              backgroundColor: '#162238',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18,
            }
          }}
        />
        <Stack.Screen 
          name="Details" 
          component={Details}
          options={{
            title: 'Top Tracks from Mexico',
            headerStyle: {
              backgroundColor: '#162238',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18,
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}