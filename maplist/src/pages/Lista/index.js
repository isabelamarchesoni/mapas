import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function ListaLocais() {
  const [db, setDb] = useState(null);
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    (async () => {
      const database = await SQLite.openDatabaseAsync('database.db');
      setDb(database);

      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS localizacao (
          id_local INTEGER PRIMARY KEY AUTOINCREMENT,
          ds_local TEXT NOT NULL,
          latitude REAL,
          longitude REAL
        );
      `);

      fetchLocais(database);
    })();
  }, []);

  const fetchLocais = async (database = db) => {
    if (!database) return;
    const result = await database.getAllAsync('SELECT * FROM localizacao;');
    setLocais(result);
  };

  const removerLocal = async (id) => {
    if (!db) return;
    await db.runAsync('DELETE FROM localizacao WHERE id_local = ?;', [id]);
    fetchLocais();
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemLoc}>
      <Text style={styles.locTexto}>{item.ds_local}</Text>
      <TouchableOpacity onPress={() => removerLocal(item.id_local)} style={styles.botaoExcluir}>
        <Text style={{ color: 'white' }}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Localizações</Text>

      <FlatList
        data={locais}
        keyExtractor={item => item.id_local.toString()}
        renderItem={renderItem}
        style={{ padding: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemLoc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e3e3e3',
    borderRadius: 5,
    marginBottom: 10,
  },
  locTexto: {
    flex: 1,
    fontSize: 16,
  },
  botaoExcluir: {
    backgroundColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
});
