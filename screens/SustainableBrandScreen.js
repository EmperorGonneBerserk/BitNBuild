// screens/SustainableBrandsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';

const brandsData = [
  {
    id: '1',
    name: 'Patagonia',
    description: 'Outdoor clothing and gear, known for its environmental activism.',
    priceRange: '₹1500 - ₹5000',
    link: 'https://www.patagonia.com/',
  },
  {
    id: '2',
    name: 'Everlane',
    description: 'Transparent pricing and ethical factories for modern basics.',
    priceRange: '₹1200 - ₹4000',
    link: 'https://www.everlane.com/',
  },
  {
    id: '3',
    name: 'Reformation',
    description: 'Fashionable clothing with sustainability at its core.',
    priceRange: '₹2000 - ₹7000',
    link: 'https://www.thereformation.com/',
  },
  {
    id: '4',
    name: 'People Tree',
    description: 'Pioneering sustainable and fair trade fashion.',
    priceRange: '₹1000 - ₹3000',
    link: 'https://www.peopletree.co.uk/',
  },
  {
    id: '5',
    name: 'Nisolo',
    description: 'Ethically made shoes and accessories at a fair price.',
    priceRange: '₹2500 - ₹8000',
    link: 'https://nisolo.com/',
  },
];

const SustainableBrandsScreen = () => {
  const renderBrandItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => Linking.openURL(item.link)}
    >
      <Text style={styles.brandName}>{item.name}</Text>
      <Text style={styles.brandDescription}>{item.description}</Text>
      <Text style={styles.priceRange}>Price Range: {item.priceRange}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sustainable Clothing Brands</Text>
      <FlatList
        data={brandsData}
        renderItem={renderBrandItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  brandDescription: {
    fontSize: 14,
    marginVertical: 5,
  },
  priceRange: {
    fontSize: 14,
    color: '#666',
  },
});

export default SustainableBrandsScreen;