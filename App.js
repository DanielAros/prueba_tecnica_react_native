import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import {DeviceMotion} from 'expo-sensors';
import * as ScreenOrientation  from 'expo-screen-orientation';
import Home from './src/Screens/Home';



export default function App() {

  const [orientation, setOrientation] = useState('portrait'); // Estado para almacenar la orientación actual

  useEffect(() => {
    const updateOrientation = async () => {
      const currentOrientation = await ScreenOrientation.getOrientationAsync();
      
      // console.log('Current Orientation', currentOrientation)
      if (currentOrientation === 3 || currentOrientation === 4) {
        // El teléfono está en posición horizontal
        setOrientation('landscape');
      } else {
        // El teléfono está en posición vertical
        setOrientation('portrait');
      }
    };

    updateOrientation(); // Llama a la función para configurar la orientación inicial

    const subscription = ScreenOrientation.addOrientationChangeListener(updateOrientation);

    return () => {
      // Limpia la suscripción cuando el componente se desmonta
      subscription.remove();
    };
  }, []);
 
  return (
    <View style={styles.container}>
      <Home/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
