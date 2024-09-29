import React, { createContext, useEffect, useState } from 'react';
import { db } from '../firebase'; // Adjust the import based on your structure
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [donatedItems, setDonatedItems] = useState([]); // Donated items of the current user
  const [allDonatedItems, setAllDonatedItems] = useState([]); // All donated items from all users

  useEffect(() => {
    // Fetch all donated items from Firestore with error handling
    const unsubscribe = onSnapshot(
      collection(db, 'donatedItems'),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAllDonatedItems(items); // Set all donated items
      },
      (error) => {
        console.error('Error fetching donated items:', error); // Error handling
      }
    );

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  // Function to add a donated item associated with a specific user
  const addDonatedItem = async (item, userId) => {
    try {
      const itemWithUser = { ...item, userId }; // Add user ID to the item
      await addDoc(collection(db, 'donatedItems'), itemWithUser);
      
      // Update the donated items for the current user
      setDonatedItems((currentItems) => [...currentItems, itemWithUser]);
    } catch (error) {
      console.error('Error adding donated item:', error); // Error handling
    }
  };

  return (
    <DonationContext.Provider value={{ donatedItems, setDonatedItems, allDonatedItems, addDonatedItem }}>
      {children}
    </DonationContext.Provider>
  );
};
