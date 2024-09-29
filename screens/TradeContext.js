import React, { createContext, useState } from 'react';

// Create a new context for trade
export const TradeContext = createContext();

export const TradeProvider = ({ children }) => {
  const [tradedItems, setTradedItems] = useState([]);

  return (
    <TradeContext.Provider value={{ tradedItems, setTradedItems }}>
      {children}
    </TradeContext.Provider>
  );
};
