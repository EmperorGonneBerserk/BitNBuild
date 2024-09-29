import React, { createContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure correct Firebase setup

export const LendContext = createContext();

export const LendProvider = ({ children }) => {
  const [lentItems, setLentItems] = useState([]);

  // Fetch lent items using Firestore's onSnapshot for real-time updates
  useEffect(() => {
    const itemsRef = collection(db, 'inventory');
    const q = query(itemsRef, where('type', '==', 'lend')); // Query for items with type 'lend'

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Lent items updated:", items); // Log fetched items
      setLentItems(items); // Set fetched items in the context
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <LendContext.Provider value={{ lentItems }}>
      {children}
    </LendContext.Provider>
  );
};
