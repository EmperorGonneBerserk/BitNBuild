import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DonationProvider } from './screens/DonationContext';
import { UsageProvider } from './screens/UsageContextScreen'; 
import { LendProvider } from './screens/LendContext';
import { TradeProvider } from './screens/TradeContext'; // Import TradeProvider
import LoginScreen from './screens/loginscreen';
import HomeScreen from './screens/HomeScreen';
import InventoryScreen from './screens/InventoryScreen';
import InventoryTracker from './screens/InventoryTracker';
import TradingScreen from './screens/TradingScreen';
import DonateScreen from './screens/DonateScreen';
import LendScreen from './screens/LendingScreen';
import OutfitInspiration from './screens/OutfitInspiration';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/Profile';
import SearchClothesScreen from './screens/SearchClothesScreen';
import OutfitCreationScreen from './screens/OutfitCreation';
import RepairSuggestionsScreen from './screens/RepairSuggestionsScreen';
import ShopClothesScreen from './screens/ShopClothesScreen';
import SustainableBrandsScreen from './screens/SustainableBrandScreen';
import UsageInsightsScreen from './screens/UsageInsightScreen';
import CommunityExchangeScreen from './screens/CommunityExchangeScreen';
import ProductListScreen from './screens/ProductListScreen';
import CalendarIntegrationScreen from './screens/CalenderIntegrationScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator setup
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: { display: 'none' }, // Hide the tab bar for all screens
    }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Inventory" component={InventoryScreen} />
      <Tab.Screen name="Trading" component={TradingScreen} />
      <Tab.Screen name="Donate" component={DonateScreen} />
      <Tab.Screen name="Lend" component={LendScreen} />
      <Tab.Screen name="InventoryTracker" component={InventoryTracker} 
      />
    </Tab.Navigator>
  );
};

// Drawer Navigator setup
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Tabs">
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen name="ProductList" component={ProductListScreen} />
      <Drawer.Screen name="SearchClothes" component={SearchClothesScreen} />
      <Drawer.Screen name="OutfitCreation" component={OutfitCreationScreen} />
      <Drawer.Screen name="RepairSuggestions" component={RepairSuggestionsScreen} />
      <Drawer.Screen name="ShopClothes" component={ShopClothesScreen} />
      <Drawer.Screen name="SustainableBrands" component={SustainableBrandsScreen} />
      <Drawer.Screen name="UsageInsights" component={UsageInsightsScreen} />
      <Drawer.Screen name="OutfitInspiration" component={OutfitInspiration} />
      <Drawer.Screen name="CommunityExchange" component={CommunityExchangeScreen} />
      <Drawer.Screen name="CalenderIntegration" component={CalendarIntegrationScreen}/>
    </Drawer.Navigator>
  );
};

// Main App function
export default function App() {
  return (
    <DonationProvider>
      <UsageProvider>
        <LendProvider>
          <TradeProvider> 
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                  name="Login" 
                  component={LoginScreen} 
                  options={{ headerShown: false }} 
                />
                <Stack.Screen 
                  name="SignUp" 
                  component={SignUpScreen} 
                  options={{ headerShown: false }} 
                />
                <Stack.Screen 
                  name="Drawer" 
                  component={DrawerNavigator} 
                  options={{ headerShown: false }} 
                />
              </Stack.Navigator>
            </NavigationContainer>
          </TradeProvider>
        </LendProvider>
      </UsageProvider>
    </DonationProvider>
  );
}
