import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LendScreen = ({ route }) => {
  const item = route.params?.item; // Safely access route.params

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No item data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lend Item</Text>
      <Text>Name: {item.name}</Text>
      <Text>Category: {item.category}</Text>
      {/* Additional functionality for lending */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default LendScreen;
