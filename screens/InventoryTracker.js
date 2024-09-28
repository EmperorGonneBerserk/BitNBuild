import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Card } from 'react-native-paper';
import { DonationContext } from './DonationContext'; // Import the context

const InventoryTracker = ({ navigation }) => {
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemImage, setItemImage] = useState('');
  const { setDonatedItems } = useContext(DonationContext); // Use context
  const [inventory, setInventory] = useState([]); // Initialize inventory

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0]; 
      setItemImage(selectedImage.uri); 
    } else {
      alert('Image selection was canceled or no images were picked.');
    }
  };

  const removeImage = () => {
    setItemImage(null);
  };

  const addItem = () => {
    if (!itemName || !itemCategory) {
      alert('Please enter both item name and category.');
      return;
    }

    const newItem = { id: Math.random().toString(), name: itemName, category: itemCategory, image: itemImage };
    setInventory(currentInventory => [...currentInventory, newItem]);
    resetForm();
  };

  const resetForm = () => {
    setItemName('');
    setItemCategory('');
    setItemImage(null);
  };

  const removeItem = (id) => {
    setInventory(currentInventory => currentInventory.filter(item => item.id !== id));
  };

  const donateItem = (item) => {
    setDonatedItems(prevItems => {
      return [...prevItems, item]; // Add item to donated items
    });
    removeItem(item.id); // Remove from inventory after donation
    navigation.navigate('Donate'); // Just navigate to Donate without passing donated items
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
        <Text style={styles.itemText}>Name: {item.name}</Text>
        <Text style={styles.itemText}>Category: {item.category}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Donate" onPress={() => donateItem(item)} />
        </View>
        <Button title="Remove" onPress={() => removeItem(item.id)} color="red" />
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Item to Inventory</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={itemCategory}
        onChangeText={setItemCategory}
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {itemImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: itemImage }} style={styles.image} />
          <Button title="Remove Image" onPress={removeImage} color="red" />
        </View>
      )}
      <Button title="Add Item" onPress={addItem} />
      <Text style={styles.title}>Your Inventory</Text>
      <FlatList
        data={inventory}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  card: {
    marginVertical: 10,
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
  list: {
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default InventoryTracker;
