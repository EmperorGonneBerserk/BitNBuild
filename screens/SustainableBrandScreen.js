// screens/SustainableBrandsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Animated, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importing icons from Expo

const brandsData = [
  {
    id: '1',
    name: 'Patagonia',
    description: 'Outdoor clothing and gear, known for its environmental activism.',
    priceRange: '₹1500 - ₹5000',
    link: 'https://www.patagonia.com/',
    icon: 'leaf',
  },
  {
    id: '2',
    name: 'Everlane',
    description: 'Transparent pricing and ethical factories for modern basics.',
    priceRange: '₹1200 - ₹4000',
    link: 'https://www.everlane.com/',
    icon: 'tshirt-crew',
  },
  {
    id: '3',
    name: 'Reformation',
    description: 'Fashionable clothing with sustainability at its core.',
    priceRange: '₹2000 - ₹7000',
    link: 'https://www.thereformation.com/',
    icon: 'leaf',
  },
  {
    id: '4',
    name: 'People Tree',
    description: 'Pioneering sustainable and fair trade fashion.',
    priceRange: '₹1000 - ₹3000',
    link: 'https://www.peopletree.co.uk/',
    icon: 'earth',
  },
  {
    id: '5',
    name: 'Nisolo',
    description: 'Ethically made shoes and accessories at a fair price.',
    priceRange: '₹2500 - ₹8000',
    link: 'https://nisolo.com/',
    icon: 'shoe-heel',
  },
];

const SustainableBrandsScreen = () => {
  const animatedValue = new Animated.Value(0);

  const animateCard = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      animatedValue.setValue(0);
    });
  };

  const renderBrandItem = ({ item }) => {
    const scale = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.05],
    });

    return (
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => {
          animateCard();
          Linking.openURL(item.link);
        }}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <View style={styles.brandInfo}>
            <MaterialCommunityIcons name={item.icon} size={28} color="#fff" style={styles.brandIcon} />
            <Text style={styles.brandName}>{item.name}</Text>
          </View>
          <Text style={styles.brandDescription}>{item.description}</Text>
          <Text style={styles.priceRange}>Price Range: {item.priceRange}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://imgs.search.brave.com/gCrvrJoxC6mdjLKnicWST4CN8cSy2-M-sCpFXEAbl_A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzgwLzE3LzMw/LzM2MF9GXzQ4MDE3/MzA1N190YTY1eW1n/ZzR5Y25jcnNwZlh2/Z29CNDNEQjBaVXk4/cy5qcGc' }} // Replace with your desired background image
      style={styles.container}
      imageStyle={{ opacity: 0.6 }} // Adjusts the opacity of the background image
    >
      <Text style={styles.header}>SUSTAINABLE CLOTHING BRANDS</Text>
      <FlatList
        data={brandsData}
        renderItem={renderBrandItem}
        keyExtractor={item => item.id}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black', // White text for header
    fontWeight: 'bold',
  },
  card: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(172, 152, 151, 0.242)', // Semi-transparent background color for cards
    marginBottom: 15,
    elevation: 5,
    shadowColor: 'rgba(46, 44, 44, 0.501)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  brandInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  brandIcon: {
    marginRight: 10,
    backgroundColor: '#c01f45', // Blue background for icons
    padding: 5,
    borderRadius: 50,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black', // White text for brand name
  },
  brandDescription: {
    fontSize: 16,
    color: 'black', // White text for description
  },
  priceRange: {
    fontSize: 14,
    color: '#a0213f', // Yellow color for price range
  },
});

export default SustainableBrandsScreen;