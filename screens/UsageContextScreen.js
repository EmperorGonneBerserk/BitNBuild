// UsageContext.js
import React, { createContext, useContext, useState } from 'react';

const UsageContext = createContext();

export const UsageProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const updateUsage = (id) => {
    // Implement your update logic here
  };

  return (
    <UsageContext.Provider value={{ items, addItem, removeItem, updateUsage }}>
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (!context) {
    throw new Error('useUsage must be used within a UsageProvider');
  }
  return context;
};
