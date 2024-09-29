import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Ensure these icon packs are installed

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>Hey, Ravi!</Text>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <Ionicons name="search" size={24} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search outfits..."
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Button Grid: Outfit Creation, Add Item, Outfit Inspiration */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#6FCF97' }]} onPress={() => navigation.navigate('OutfitCreation')}>
            <Text style={styles.buttonText}>Outfit Creation</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: '#FFE233' }]} onPress={() => navigation.navigate('InventoryTracker')}>
            <Text style={styles.buttonText}>Inventory</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: '#F2994A' }]} onPress={() => navigation.navigate('OutfitInspiration')}>
            <Text style={styles.buttonText}>Outfit Inspiration</Text>
          </TouchableOpacity>
        </View>

        {/* Community Exchange Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Community Exchange</Text>

          <View style={styles.communityContainer}>
            <Text style={styles.description}>Lend your clothes to others in your community.</Text>
            <TouchableOpacity style={styles.communityButton1} onPress={() => navigation.navigate('Lend')}>
              <Text style={styles.buttonText}>Lend Clothes</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.communityContainer}>
            <Text style={styles.description}>Donate items you no longer use to those in need.</Text>
            <TouchableOpacity style={styles.communityButton2} onPress={() => navigation.navigate('Donate')}>
              <Text style={styles.buttonText}>Donate Items</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.communityContainer}>
            <Text style={styles.description}>Trade your items with others for something new.</Text>
            <TouchableOpacity style={styles.communityButton3} onPress={() => navigation.navigate('Trading')}>
              <Text style={styles.buttonText}>Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer Section with Icons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('InventoryTracker')}>
          <MaterialIcons name="inventory" size={24} color="white" />
          <Text style={styles.footerButtonText}>Inventory</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('RepairSuggestions')}>
          <MaterialIcons name="build" size={24} color="white" />
          <Text style={styles.footerButtonText}>Repair</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('SustainableBrands')}>
          <Ionicons name="leaf" size={24} color="white" />
          <Text style={styles.footerButtonText}>Brands</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('UsageInsights')}>
          <Ionicons name="bar-chart" size={24} color="white" />
          <Text style={styles.footerButtonText}>Insights</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('ShopClothes')}>
          <MaterialIcons name="shopping-cart" size={24} color="white" />
          <Text style={styles.footerButtonText}>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('ProductList')}>
          <MaterialIcons name="list" size={24} color="white" />
          <Text style={styles.footerButtonText}>Product List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  content: {
    flexGrow: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '32%',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionContainer: {
    marginVertical: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  communityContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  communityButton1: {
    paddingVertical: 15,
    backgroundColor: '#12a2d2c4',
    borderRadius: 8,
  },
  communityButton2: {
    paddingVertical: 15,
    backgroundColor: '#a9d212c4',
    borderRadius: 8,
  },
  communityButton3: {
    paddingVertical: 15,
    backgroundColor: '#d21265c4',
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  footerButton: {
    alignItems: 'center',
    width: '16%',
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default HomeScreen;