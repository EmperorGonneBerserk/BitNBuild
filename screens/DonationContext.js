// DonationContext.js
import React, { createContext, useState } from 'react';

export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [donatedItems, setDonatedItems] = useState([]);

  return (
    <DonationContext.Provider value={{ donatedItems, setDonatedItems }}>
      {children}
    </DonationContext.Provider>
  );
};
