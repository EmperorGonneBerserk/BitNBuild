import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarIntegrationScreen = ({ navigation }) => {
  // Function to handle navigation to Outfit Creation screen with a specific date
  const createOutfit = (date) => {
    navigation.navigate('Outfit Creation', { date });
  };

  // Function to handle the press of the button, creating an outfit for today
  const handleCreateOutfitPress = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    createOutfit(today); // Navigate to Outfit Creation screen with today's date
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>What are you wearing today?</Text>

      {/* Calendar Component */}
      <Calendar
        onDayPress={(day) => createOutfit(day.dateString)} // Navigate with the selected date from the calendar
        markingType={'custom'}
        markedDates={{
          '2024-09-28': { selected: true, selectedColor: '#6200EE' }, // Example of a marked date
        }}
        theme={{
          selectedDayBackgroundColor: '#6200EE',
          todayTextColor: '#6200EE',
          dayTextColor: '#333',
          monthTextColor: '#6200EE',
          arrowColor: '#6200EE',
        }}
        style={styles.calendar}
      />

      {/* Button to Create Outfit for Today */}
      <TouchableOpacity style={styles.button} onPress={handleCreateOutfitPress}>
        <Text style={styles.buttonText}>Create Outfit for Today</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // Light background color for the container
  },
  header: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Dark color for text
    fontWeight: 'bold',
  },
  calendar: {
    borderRadius: 10,
    elevation: 4, // Shadow effect for the calendar
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200EE', // Primary button color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 5, // Shadow effect for button
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CalendarIntegrationScreen;
