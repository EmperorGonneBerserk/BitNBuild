import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../firebase'; // Import Firestore instance

const AddItemScreen = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddItem = async () => {
    if (itemName && quantity) {
      setLoading(true);
      setMessage('');
      console.log('Attempting to add item:', { name: itemName, quantity: parseInt(quantity) });

      try {
        const inventoryRef = collection(db, 'inventory');

        // Add the item to Firestore
        await addDoc(inventoryRef, {
          name: itemName,
          quantity: parseInt(quantity),
        });

        console.log('Item successfully added!');
        setItemName('');
        setQuantity('');
        setMessage('Item added successfully!');
      } catch (error) {
        console.error('Error adding item: ', error);
        setMessage('Error adding item, please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setMessage('Please fill in both fields.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Add Item" onPress={handleAddItem} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      {message ? <Text style={{ marginTop: 20 }}>{message}</Text> : null}
    </View>
  );
};

export default AddItemScreen;
