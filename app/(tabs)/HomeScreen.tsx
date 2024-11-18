import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { supabase } from '../supabaseClient';

type Grupo = {
  id: string;
  nome: string;
  descricao: string;
};

export default function HomeScreen({ navigation }: any) {
  const [grupos, setGrupos] = useState<Grupo[]>([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  async function fetchGroups() {
    const { data, error } = await supabase.from('grupos').select('*');
    if (error) {
      console.error('Erro ao buscar grupos:', error);
    } else {
      setGrupos(data);
    }
  }

  const renderGroup = ({ item }: { item: Grupo }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('GroupDetails', { groupId: item.id })}
      style={styles.card}
    >
      <Text style={styles.groupName}>{item.nome}</Text>
      <Text style={styles.groupDescription}>{item.descricao}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Você Logou</Text>
      <FlatList
        data={grupos}
        renderItem={renderGroup}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1F2C73',
  },
  list: {
    width: '100%',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  card: {
    backgroundColor: '#1F2C73',
    padding: 20,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  groupDescription: {
    fontSize: 14,
    color: '#D0D0D0',
    marginTop: 5,
  },
});
