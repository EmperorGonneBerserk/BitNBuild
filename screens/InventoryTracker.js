import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, FlatList, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Card } from 'react-native-paper';
import { DonationContext } from './DonationContext';
import { LendContext } from './LendContext';
import { TradeContext } from './TradeContext'; // Import trade context
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

const InventoryTracker = () => {
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const { setDonatedItems } = useContext(DonationContext);
  const { setLentItems } = useContext(LendContext);
  const { setTradedItems } = useContext(TradeContext); // Access trade items
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInventory(); // Fetch inventory from Firestore when component mounts
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const inventoryCollection = collection(db, 'inventory');
      const q = query(inventoryCollection, where('addedBy', '==', auth.currentUser.uid)); 
      const inventorySnapshot = await getDocs(q);
      const inventoryList = inventorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInventory(inventoryList);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch inventory.');
    } finally {
      setLoading(false);
    }
  };

  const addItemToInventory = async () => {
    if (!itemName || !itemCategory || !itemImage) {
      Alert.alert('Error', 'Please fill in all fields and select an image.');
      return;
    }

    try {
      const newItem = {
        name: itemName,
        category: itemCategory,
        image: itemImage,
        status: 'available', // Default status
        type: '', // This will be set later when the user chooses to lend, donate, or trade
        addedBy: auth.currentUser.uid,
        addedAt: new Date(),
      };
      const docRef = await addDoc(collection(db, 'inventory'), newItem);
      setInventory([...inventory, { id: docRef.id, ...newItem }]);
      setItemName('');
      setItemCategory('');
      setItemImage(null);
      Alert.alert('Success', 'Item added to inventory.');
    } catch (error) {
      Alert.alert('Error', 'Failed to add item.');
    }
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setItemImage(result.assets[0].uri);
    }
  };

  // Function to mark the item as lent
  const lendItem = async (item) => {
    await updateDoc(doc(db, 'inventory', item.id), { status: 'lent', type: 'lend' });
    setLentItems(prevItems => [...prevItems, { ...item, status: 'lent', type: 'lend' }]);
    removeItem(item.id); // Remove from the current user's local list
    Alert.alert('Success', `${item.name} has been lent!`);
  };

  // Function to mark the item as donated
  const donateItem = async (item) => {
    await updateDoc(doc(db, 'inventory', item.id), { status: 'donated', type: 'donate' });
    setDonatedItems(prevItems => [...prevItems, { ...item, status: 'donated', type: 'donate' }]);
    removeItem(item.id);
    Alert.alert('Success', `${item.name} has been donated!`);
  };

  // Function to mark the item as traded
  const tradeItem = async (item) => {
    await updateDoc(doc(db, 'inventory', item.id), { status: 'traded', type: 'trade' });
    setTradedItems(prevItems => [...prevItems, { ...item, status: 'traded', type: 'trade' }]);
    removeItem(item.id);
    Alert.alert('Success', `${item.name} has been traded!`);
  };

  const removeItem = (itemId) => {
    setInventory(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
        <Text style={styles.itemText}>Name: {item.name}</Text>
        <Text style={styles.itemText}>Category: {item.category}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Lend" onPress={() => lendItem(item)} />
          <Button title="Donate" onPress={() => donateItem(item)} />
          <Button title="Trade" onPress={() => tradeItem(item)} />
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
      <Text style={styles.title}>Your Inventory</Text>
      
      {/* Form for adding a new item */}
      <View style={styles.form}>
        <TextInput
          placeholder="Item Name"
          value={itemName}
          onChangeText={setItemName}
          style={styles.input}
        />
        <TextInput
          placeholder="Category"
          value={itemCategory}
          onChangeText={setItemCategory}
          style={styles.input}
        />
        <Button title="Select Image" onPress={selectImage} />
        {itemImage && <Image source={{ uri: itemImage }} style={styles.imagePreview} />}
        <Button title="Add Item" onPress={addItemToInventory} />
      </View>

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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InventoryTracker;
