import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const OutfitCreationScreen = ({ route }) => {
  const { date } = route.params || { date: 'No date provided' }; // Default value
  const [outfitDescription, setOutfitDescription] = useState('');
  const [outfitType, setOutfitType] = useState('Upper Wear'); // Default type
  const [image, setImage] = useState(null);

  const handleCreateOutfit = () => {
    // Handle outfit creation logic here
    if (!outfitDescription || !image) {
      Alert.alert('Error', 'Please provide an outfit description and an image.');
      return;
    }
    console.log('Outfit created for:', date);
    console.log('Outfit description:', outfitDescription);
    console.log('Outfit type:', outfitType);
    // You can also navigate back or show a success message
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Outfit for {date}</Text>
      
      {/* Outfit Type Selection */}
      <View style={styles.typeContainer}>
        {['Upper Wear', 'Middle Wear', 'Lower Wear'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.typeButton, outfitType === type && styles.selectedTypeButton]}
            onPress={() => setOutfitType(type)}
          >
            <Text style={styles.typeButtonText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Outfit Description Input */}
      <TextInput
        placeholder="Describe your outfit"
        value={outfitDescription}
        onChangeText={setOutfitDescription}
        style={styles.input}
      />
      
      {/* Image Picker */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imagePlaceholder}>Pick an image from your gallery</Text>
        )}
      </TouchableOpacity>

      {/* Save Outfit Button */}
      <Button title="Save Outfit" onPress={handleCreateOutfit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  typeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  selectedTypeButton: {
    backgroundColor: '#007BFF',
  },
  typeButtonText: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginBottom: 20,
  },
  imagePlaceholder: {
    color: '#888',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});

export default OutfitCreationScreen;