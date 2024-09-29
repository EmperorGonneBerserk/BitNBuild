// screens/RepairSuggestionsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const RepairSuggestionsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Repair Suggestions</Text>
      
      <Text style={styles.subheader}>Common Repairs:</Text>
      <Text style={styles.tip}>
        1. *Sewing Torn Clothes*: Use a needle and thread to sew up any rips or holes. 
        For larger tears, consider using a fabric patch or iron-on patch.
      </Text>
      <Text style={styles.tip}>
        2. *Replacing Buttons*: Keep spare buttons on hand. Use a needle and thread to sew the new button in place.
      </Text>
      <Text style={styles.tip}>
        3. *Fixing Zippers*: For stuck zippers, use a pencil to rub graphite on the teeth to lubricate. If the zipper is broken, consider replacing it.
      </Text>
      <Text style={styles.tip}>
        4. *Hem Pants or Skirts*: Fold the hem up to the desired length and sew it in place. Use fabric tape for a no-sew option.
      </Text>

      <Text style={styles.subheader}>Where to Find Repair Resources:</Text>
      <Text style={styles.tip}>
        - Visit local sewing workshops or community centers that offer classes.
      </Text>
      <Text style={styles.tip}>
        - Look for online tutorials on platforms like YouTube.
      </Text>
      <Text style={styles.tip}>
        - Apps like *Sewing Buddy* or *Fabric* provide tips and video instructions.
      </Text>

      <Text style={styles.header}>Donation Suggestions</Text>
      <Text style={styles.tip}>
        - Consider donating clothes that are in good condition but no longer fit or are rarely worn.
      </Text>
      <Text style={styles.tip}>
        - Look for local charities, shelters, or thrift stores that accept clothing donations.
      </Text>
      <Text style={styles.tip}>
        - Research organizations that specifically accept clothing for the homeless or low-income families.
      </Text>
      <Text style={styles.tip}>
        - Consider using apps like *Give Back* or *ClothingDonations* to schedule pickups.
      </Text>
    </ScrollView>
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  tip: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default RepairSuggestionsScreen;