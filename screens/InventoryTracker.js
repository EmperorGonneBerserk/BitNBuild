import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, FlatList, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Card } from 'react-native-paper';
import { DonationContext } from './DonationContext';
import { db, auth } from '../firebase'; // Import Firebase and auth instance
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'; // Firestore functions

const InventoryTracker = ({ navigation }) => {
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemImage, setItemImage] = useState('');
  const { setDonatedItems, setAllDonatedItems } = useContext(DonationContext);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    fetchInventory(); // Fetch inventory from Firestore when component mounts
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const inventoryCollection = collection(db, 'inventory');
      const q = query(inventoryCollection, where('addedBy', '==', auth.currentUser.uid)); // Fetch only items added by the current user
      const inventorySnapshot = await getDocs(q);
      const inventoryList = inventorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInventory(inventoryList);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch inventory.');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setItemImage(selectedImage.uri);
    } else {
      Alert.alert('Image selection', 'Image selection was canceled or no images were picked.');
    }
  };

  const removeImage = () => {
    setItemImage(null);
  };

  const addItem = async () => {
    if (!itemName || !itemCategory) {
      Alert.alert('Validation', 'Please enter both item name and category.');
      return;
    }

    const newItem = {
      name: itemName,
      category: itemCategory,
      image: itemImage,
      addedBy: auth.currentUser.uid, // Add the user's ID to the item data
    };

    try {
      const docRef = await addDoc(collection(db, 'inventory'), newItem); // Add to Firestore
      setInventory(currentInventory => [...currentInventory, { id: docRef.id, ...newItem }]);
      resetForm();
      Alert.alert('Success', 'Item added to inventory successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to inventory.');
    }
  };

  const resetForm = () => {
    setItemName('');
    setItemCategory('');
    setItemImage(null);
  };

  const removeItem = (id) => {
    setInventory(currentInventory => currentInventory.filter(item => item.id !== id));
  };

  const donateItem = async (item) => {
    try {
      const donationItem = {
        ...item,
        donatedBy: auth.currentUser.uid, // Track who donated the item
        visibleTo: 'all', // Mark the item as visible to all users
      };

      // Add the donated item to the 'donations' collection
      await addDoc(collection(db, 'donations'), donationItem);

      // Remove the item from the user's inventory
      removeItem(item.id);
      setDonatedItems(prevItems => [...prevItems, item]);
      setAllDonatedItems(prevItems => [...prevItems, item]);

      Alert.alert('Success', 'Item donated successfully!');
      navigation.navigate('Donate');
    } catch (error) {
      Alert.alert('Error', 'Failed to donate item.');
    }
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InventoryTracker;
