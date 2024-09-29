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
      <Button title="Search Clothes" onPress={() => navigation.navigate('SearchClothes')} />
      <Button title="Repair Suggestions" onPress={() => navigation.navigate('RepairSuggestions')} />
      <Button title="Outfit Creation" onPress={() => navigation.navigate('OutfitCreation')} /> 
      <Button title="Shop Clothes" onPress={() => navigation.navigate('ShopClothes')}  />  
      <Button title="Sustainable Brands" onPress={() => navigation.navigate('SustainableBrands')} />
      <Button title="Usage Insights" onPress={() => navigation.navigate('UsageInsights')} /> 
      <Button title="Community Exchange" onPress={() => navigation.navigate('CommunityExchange')} />
      <Button title="Product List" onPress={() => navigation.navigate('ProductList')} />
      <Button title="Outfit Inspiration" onPress={() => navigation.navigate('OutfitInspiration')} />
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
