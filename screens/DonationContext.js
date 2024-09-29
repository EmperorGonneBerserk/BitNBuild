// DonationContext.js
import React, { createContext, useEffect, useState } from 'react';
import { db } from '../firebase'; // Adjust the import based on your structure
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [donatedItems, setDonatedItems] = useState([]); // Donated items of the current user
  const [allDonatedItems, setAllDonatedItems] = useState([]); // All donated items from all users

  useEffect(() => {
    // Fetch all donated items from Firestore
    const unsubscribe = onSnapshot(collection(db, 'donatedItems'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllDonatedItems(items); // Set all donated items
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  const addDonatedItem = async (item) => {
    try {
      await addDoc(collection(db, 'donatedItems'), item);
      // Optionally, update donated items for the current user
      setDonatedItems(currentItems => [...currentItems, item]);
    } catch (error) {
      console.error('Error adding donated item:', error);
    }
  };

  return (
    <DonationContext.Provider value={{ donatedItems, setDonatedItems, allDonatedItems, addDonatedItem }}>
      {children}
    </DonationContext.Provider>
  );
};
