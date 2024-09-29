import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, TextInput, Linking, Animated } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const SearchClothesScreen = () => {
  const [activeTab, setActiveTab] = useState('Camera Roll');
  const [image, setImage] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation for fade effect

  const predefinedItems = [
    { id: '1', name: 'Shoes' },
    { id: '2', name: 'Jacket' },
    { id: '3', name: 'Sweater' },
    { id: '4', name: 'Blazer' },
  ];

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      fadeIn(); // Start animation when an image is selected
    }
  };

  const openGoogleSearch = () => {
    Linking.openURL('https://www.google.com/search?tbm=isch&q=clothing');
  };

  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Camera Roll')}>
          <Text style={activeTab === 'Camera Roll' ? styles.activeTab : styles.tab}>Camera Roll</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Database')}>
          <Text style={activeTab === 'Database' ? styles.activeTab : styles.tab}>Database</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openGoogleSearch}>
          <Text style={activeTab === 'Web' ? styles.activeTab : styles.tab}>Web</Text>
        </TouchableOpacity>
      </View>

      {/* Active Tab Content */}
      {activeTab === 'Camera Roll' && (
        <View style={styles.content}>
          <Button title="Pick an image from camera roll" onPress={pickImage} color="#6200EE" />
          {image && (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.imageSelectedText}>Image Selected</Text>
            </Animated.View>
          )}
        </View>
      )}

      {activeTab === 'Database' && (
        <FlatList
          data={predefinedItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9', // Light background color
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    fontSize: 18,
    color: '#888',
    padding: 10,
  },
  activeTab: {
    fontSize: 18,
    color: '#6200EE', // Active tab color
    fontWeight: 'bold',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#6200EE', // Underline for active tab
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSelectedText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6200EE',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#FFF', // White background for items
    borderRadius: 5, // Rounded corners
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#6200EE',
    borderRadius: 20,
    padding: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SearchClothesScreen;
