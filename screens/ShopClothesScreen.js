import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const ShopClothesScreen = () => {
  // Mocked e-commerce store items with links
  const shopItems = [
    { id: '1', name: 'Stylish Sneakers', price: '$50', url: 'https://www.amazon.com/s?k=sneakers' },
    { id: '2', name: 'Leather Jacket', price: '$120', url: 'https://www.amazon.com/s?k=leather+jacket' },
    { id: '3', name: 'Cotton T-Shirt', price: '$20', url: 'https://www.amazon.com/s?k=cotton+tshirt' },
    { id: '4', name: 'Denim Jeans', price: '$60', url: 'https://www.amazon.com/s?k=denim+jeans' },
  ];

  const handleBuyItem = (url) => {
    // Redirect to the URL for purchasing the item
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Online Store</Text>
      <FlatList
        data={shopItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name} - {item.price}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={() => handleBuyItem(item.url)}>
              <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ShopClothesScreen;