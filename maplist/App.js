import React, { useState, useEffect } from 'react';
import {StyleSheet,Text, View, Dimensions, ActivityIndicator, Button,TouchableOpacity,}
from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Lista from './src/pages/Lista/index';
import Cadastro from './src/pages/Cadastro/index';
 
const Stack = createStackNavigator();
 
function Mapa({ navigation }) {
  const [localizacao, setLocalizacao] = useState(null);
  const [erro, setErro] = useState(null);
 
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErro('Permissão para acesso à localização negada!');
        return;
      }
      let local = await Location.getCurrentPositionAsync({});
      setLocalizacao(local);
    })();
  }, []);
 
  if (!localizacao) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Obtendo localização...</Text>
        {erro && <Text>{erro}</Text>}
      </View>
    );
  }
 
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: localizacao.coords.latitude,
          longitude: localizacao.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: localizacao.coords.latitude,
            longitude: localizacao.coords.longitude,
          }}
          title="Sua Localização"
        />
      </MapView>
     
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Lista')}>
          <Text style={styles.menuText}>Lista</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.menuText}>Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Mapa">
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="Lista" component={Lista} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
  },
 map: {
  width: 350,
  height: 500,
  alignSelf: 'center',
  marginTop: 170,
  },
 
  menu: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#b9b9b9',
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  menuButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  menuText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
 