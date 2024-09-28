import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Modal, TouchableOpacity } from 'react-native';
import { db } from '../firebase'; // Adjust the import based on your Firebase setup
import { collection, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore'; // Import Firestore functions

const TradingScreen = () => {
  const [itemName, setItemName] = useState('');
  const [tradedItems, setTradedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch items from Firestore on component mount
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tradedItems'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTradedItems(items);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Function to add items to trade
  const addItemToTrade = async () => {
    if (!itemName) {
      alert('Please enter an item name.');
      return;
    }

    const newItem = { name: itemName, ownerId: 'userId' }; // Replace 'userId' with actual user ID
    await addDoc(collection(db, 'tradedItems'), newItem);
    setItemName(''); // Clear input
  };

  // Function to initiate trade
  const initiateTrade = async () => {
    if (!selectedItem) return;

    // Assuming the current user ID is 'currentUserId'
    const currentUserId = 'currentUserId'; // Replace with actual user ID

    const itemRef = doc(db, 'tradedItems', selectedItem.id);
    await updateDoc(itemRef, {
      tradingWith: currentUserId,
      status: 'trading',
    });

    setModalVisible(false); // Close modal
  };

  // Function to render each traded item
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.name}</Text>
      <Button title="Trade" onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trading Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter item to trade"
        value={itemName}
        onChangeText={setItemName}
      />
      <Button title="Add to Trade" onPress={addItemToTrade} />

      <FlatList
        data={tradedItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* Modal for Trade Confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to trade {selectedItem?.name}?</Text>
            <TouchableOpacity onPress={initiateTrade} style={styles.button}>
              <Text style={styles.buttonText}>Confirm Trade</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    width: '100%',
  },
  itemContainer: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default TradingScreen;
