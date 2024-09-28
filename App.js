import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DonationProvider } from './screens/DonationContext';
import LoginScreen from './screens/loginscreen';
import HomeScreen from './screens/HomeScreen';
import InventoryScreen from './screens/InventoryScreen';
import AddItemScreen from './screens/AddItemScreen';
import InventoryTracker from './screens/InventoryTracker';
import TradingScreen from './screens/TradingScreen';
import DonateScreen from './screens/DonateScreen';
import LendScreen from './screens/LendingScreen';
import OutfitInspiration from './screens/OutfitInspiration';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/Profile';

// Import Firestore instance from firebase.js
import { db } from './firebase'; // Ensure the correct path
import SignUp from './screens/SignUpScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <DonationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Inventory">
            {props => <InventoryScreen {...props} db={db} />}
          </Stack.Screen>
          <Stack.Screen name="AddItem">
            {props => <AddItemScreen {...props} db={db} />}
          </Stack.Screen>
          <Stack.Screen name="Tracker">
            {props => <InventoryTracker {...props} db={db} />}
          </Stack.Screen>
          <Stack.Screen name="Trading" component={TradingScreen} />
          <Stack.Screen name="Donate" component={DonateScreen} /> 
          <Stack.Screen name="Lend" component={LendScreen} />
          <Stack.Screen name="OutfitInspiration" component={OutfitInspiration} />
        </Stack.Navigator>
      </NavigationContainer>
    </DonationProvider>
  );
}