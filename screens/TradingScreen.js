import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Modal, TouchableOpacity, Alert, Clipboard } from 'react-native';
import { db, auth } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, query, where } from 'firebase/firestore';

const TradingScreen = () => {
  const [itemName, setItemName] = useState('');
  const [tradedItems, setTradedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tradeUserId, setTradeUserId] = useState('');
  const [interactionModalVisible, setInteractionModalVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [receiverItems, setReceiverItems] = useState([]); // New state to hold receiver's items

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentUserId(user.uid);
    } else {
      Alert.alert('Not logged in', 'Please log in to continue.');
    }
  }, []);

  useEffect(() => {
    if (currentUserId) {
      const q = query(collection(db, 'tradedItems'), where('ownerId', '==', currentUserId));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTradedItems(items);
      });

      return () => unsubscribe();
    }
  }, [currentUserId]);

  // Fetch receiver's items when tradeUserId is updated
  useEffect(() => {
    if (tradeUserId) {
      const q = query(collection(db, 'tradedItems'), where('ownerId', '==', tradeUserId));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReceiverItems(items);
      });

      return () => unsubscribe();
    }
  }, [tradeUserId]);

  const addItemToTrade = async () => {
    if (!itemName) {
      alert('Please enter an item name.');
      return;
    }

    const newItem = { name: itemName, ownerId: currentUserId, status: 'available' };
    await addDoc(collection(db, 'tradedItems'), newItem);
    setItemName('');
  };

  const initiateTrade = async () => {
    if (!selectedItem || !tradeUserId) {
      alert('Please select an item and enter a user ID to trade with.');
      return;
    }

    // Check if the receiver has items to trade
    if (receiverItems.length === 0) {
      alert(`User ID ${tradeUserId} has no items available for trade.`);
      return;
    }

    setInteractionModalVisible(true);
  };

  const confirmTrade = async () => {
    const tradeRequest = {
      itemId: selectedItem.id,
      fromUserId: currentUserId,
      toUserId: tradeUserId,
    };

    await addDoc(collection(db, 'tradeRequests'), tradeRequest);
    Alert.alert('Trade Request Sent', `Trade request sent to user ID ${tradeUserId}`);
    setModalVisible(false);
  };

  const copyUserIdToClipboard = () => {
    Clipboard.setString(currentUserId);
    Alert.alert('User ID Copied', 'Your user ID has been copied to the clipboard.');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.name}</Text>
      <Text>Status: {item.status}</Text>
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

      <TextInput
        style={styles.input}
        placeholder="Enter user ID to trade with"
        value={tradeUserId}
        onChangeText={setTradeUserId}
      />
      <Button title="Copy My User ID" onPress={copyUserIdToClipboard} />

      <FlatList
        data={tradedItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to trade {selectedItem?.name} with user ID {tradeUserId}?</Text>
            <TouchableOpacity onPress={initiateTrade} style={styles.button}>
              <Text style={styles.buttonText}>Initiate Trade</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={interactionModalVisible}
        onRequestClose={() => setInteractionModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Confirm trade with user ID {tradeUserId}?</Text>
            <TouchableOpacity onPress={confirmTrade} style={styles.button}>
              <Text style={styles.buttonText}>Confirm Trade</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setInteractionModalVisible(false)} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
