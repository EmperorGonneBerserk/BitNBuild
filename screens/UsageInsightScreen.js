// screens/UsageInsightsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ProgressBarAndroid } from 'react-native';
import Slider from '@react-native-community/slider'; // Correct import for Slider
import { useUsage } from './UsageContextScreen'; // Adjust according to your context file path

const UsageInsightsScreen = () => {
  const { items } = useUsage(); // Assume this returns your items
  const [wardrobeValue, setWardrobeValue] = useState(0);
  const [outfitsWornCount, setOutfitsWornCount] = useState(0);
  const [totalOutfitsCount, setTotalOutfitsCount] = useState(0);
  const [wardrobeUsage, setWardrobeUsage] = useState(0); // Slider state

  useEffect(() => {
    if (items) {
      const totalValue = items.reduce((total, item) => total + item.value, 0);
      const wornCount = items.filter(item => item.worn).length; // Assume item has a 'worn' property
      setWardrobeValue(totalValue);
      setOutfitsWornCount(wornCount);
      setTotalOutfitsCount(items.length);
    }
  }, [items]);

  const wardrobeUsagePercentage = totalOutfitsCount > 0 
    ? (wardrobeUsage / totalOutfitsCount) * 100 
    : 0;

  // Check if items is undefined or loading
  if (!items) {
    return <Text>Loading...</Text>; // Or some fallback UI
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wardrobe Insights</Text>
      
      {/* Card for Total Wardrobe Value */}
      <View style={[styles.card, styles.valueCard]}>
        <Text style={styles.cardHeader}>Total Wardrobe Value</Text>
        <Text style={styles.cardValue}>₹{wardrobeValue.toFixed(2)}</Text>
      </View>

      {/* Card for Wardrobe Usage */}
      <View style={[styles.card, styles.usageCard]}>
        <Text style={styles.cardHeader}>Wardrobe Usage</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={totalOutfitsCount}
          step={1}
          value={wardrobeUsage}
          onValueChange={setWardrobeUsage}
          minimumTrackTintColor="#3F51B5"
          maximumTrackTintColor="#ccc"
        />
        <Text style={styles.percentage}>
          Usage: {wardrobeUsage} / {totalOutfitsCount} outfits worn
        </Text>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={wardrobeUsagePercentage / 100}
          color="#2196F3"
        />
        <Text style={styles.percentage}>
          {wardrobeUsagePercentage.toFixed(2)}%
        </Text>
      </View>

      {/* Card for Outfits Worn Count */}
      <View style={[styles.card, styles.outfitCard]}>
        <Text style={styles.cardHeader}>Outfits Worn</Text>
        <Text style={styles.cardValue}>
          {outfitsWornCount} / {totalOutfitsCount}
        </Text>
        <Text style={styles.percentage}>
          {totalOutfitsCount > 0 ? ((outfitsWornCount / totalOutfitsCount) * 100).toFixed(2) : 0}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  valueCard: {
    backgroundColor: '#FF5722',
  },
  usageCard: {
    backgroundColor: '#3F51B5',
  },
  outfitCard: {
    backgroundColor: '#4CAF50',
  },
  cardHeader: {
    fontSize: 20,
    marginBottom: 10,
    color: '#fff',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  percentage: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    color: '#fff',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
});

export default UsageInsightsScreen;
