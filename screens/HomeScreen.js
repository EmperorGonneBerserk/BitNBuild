import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Go to Inventory" onPress={() => navigation.navigate('Inventory')} />
      <Button title="Add Item" onPress={() => navigation.navigate('AddItem')} />
      <Button title="Inventory Tracker" onPress={() => navigation.navigate('Tracker')} />
      <Button title="Go to Trading" onPress={() => navigation.navigate('Trading')} />
      <Button title="Donate Items" onPress={() => navigation.navigate('Donate')} />
      <Button title="Lend Items" onPress={() => navigation.navigate('Lend')} />
      <Button title="OutfitInspiration" onPress={() => navigation.navigate('OutfitInspiration')} />
    </View>
  );
};

// Optional styles to improve layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default HomeScreen;
