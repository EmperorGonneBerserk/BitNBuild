import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { LendContext } from './LendContext'; // Import LendContext

const LendScreen = () => {
  const { lentItems } = useContext(LendContext); // Get lent items from the context

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>Name: {item.name}</Text>
      <Text>Category: {item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lent Items</Text>
      {lentItems.length > 0 ? (
        <FlatList
          data={lentItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id} // Ensure unique keys
        />
      ) : (
        <Text style={styles.noItemsText}>No items lent yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noItemsText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default LendScreen;
