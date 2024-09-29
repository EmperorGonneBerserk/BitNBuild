import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { DonationContext } from './DonationContext';
import { db } from '../firebase'; // Import your Firestore instance
import { collection, onSnapshot } from 'firebase/firestore'; // Import Firestore utilities

const DonateScreen = ({ navigation }) => {
  const { allDonatedItems } = useContext(DonationContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'donations'), // Listening to 'donations' collection
      (snapshot) => {
        const updatedDonatedItems = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSortedItems(updatedDonatedItems);
        setLoading(false);
      },
      (error) => {
        setError('Failed to load donated items.');
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Donated Items</Text>

      {sortedItems.length === 0 ? (
        <Text style={styles.emptyText}>No donated items available.</Text>
      ) : (
        <FlatList
          data={sortedItems}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('ItemDetails', { item })} 
            >
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCategory}>Category: {item.category}</Text>
              {/* Display any other relevant data */}
              <Text style={styles.itemDonor}>Donated By: {item.donatedBy}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      )}
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
    marginVertical: 20,
  },
  card: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemCategory: {
    fontSize: 16,
    color: 'gray',
  },
  itemDonor: {
    fontSize: 14,
    color: 'darkgray',
  },
});

export default DonateScreen;
