import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as Location from 'expo-location';

export default function Cadastro() {
  const [input, setInput] = useState('');
  const [coords, setCoords] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada para acessar localização.');
        return;
      }
      const local = await Location.getCurrentPositionAsync({});
      setCoords(local.coords);
    })();

    SQLite.openDatabaseAsync('database.db').then(database => {
      setDb(database);
      database.execAsync(`
        CREATE TABLE IF NOT EXISTS localizacao (
          id_local INTEGER PRIMARY KEY AUTOINCREMENT,
          ds_local TEXT NOT NULL,
          latitude REAL,
          longitude REAL
        );
      `);
    });
  }, []);

  const adicionar = async () => {
    if (!input.trim() || !coords || !db) return;

    await db.runAsync(
      'INSERT INTO localizacao (ds_local, latitude, longitude) VALUES (?, ?, ?);',
      [input, coords.latitude, coords.longitude]
    );

    Alert.alert('Local salvo com sucesso!');
    setInput('');
  };

  return (
    <View style={styles.containerInput}>
      <TextInput
        style={styles.input}
        placeholder="Digite um local"
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity style={styles.addButton} onPress={adicionar}>
        <Text style={{ color: 'white' }}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    marginTop: 40,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#000',
    borderWidth: 1,
    padding: 20,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#848484',
    borderWidth: 1,
    padding: 20,
    borderRadius: 5,
    borderColor: 'white',
  },
});
