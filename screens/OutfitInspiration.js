import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';

const API_KEY = '8B0IXwgKdjy6o6ilo30TamyvB9KVXy5jcqsTDwiS2MdlKajvNImVIg6J';
const API_URL = 'https://api.pexels.com/v1/search?query=';

const OutfitInspiration = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('outfit'); // Default category

  const fetchImages = async (pageNumber) => {
    setLoading(true);
    try {
      // Correctly use template literals for the URL
      const response = await fetch(`${API_URL}${category}&per_page=15&page=${pageNumber}`, {
        headers: {
          Authorization: API_KEY,
        },
      });
      const data = await response.json();
      if (data.photos) {
        setImages(data.photos);
      } else {
        console.warn('No photos found');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page, category]);

  const handleRefresh = () => {
    setPage((prevPage) => prevPage + 1); // Increment page to fetch new images
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    // Reset to the first page for new category
    setPage(1);
    fetchImages(1); // Fetch new images based on category
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Hey, Ravi!</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          {/* Notification icon can go here */}
        </TouchableOpacity>
      </View>

      {/* Buttons Section */} 
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={[styles.button, styles.uploadButton]} onPress={() => handleCategoryChange('casual fashion')}>
          <Text style={styles.buttonText}>Casual outfits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.createButton]} onPress={() => handleCategoryChange('formal fashion')}>
          <Text style={styles.buttonText}>Formal outfits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.scheduleButton]} onPress={() => handleCategoryChange('sport fashion')}>
          <Text style={styles.buttonText}>Sport outfits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.statsButton]} onPress={() => handleCategoryChange('party fashion')}>
          <Text style={styles.buttonText}>Party Outfits</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {images.map((image) => (
            <View key={image.id} style={styles.imageContainer}>
              <Image source={{ uri: image.src.large }} style={styles.image} />
            </View>
          ))}
          <TouchableOpacity style={styles.neonButton} onPress={handleRefresh}>
            <Text style={styles.buttonText}>Refresh Images</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  notificationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    width: '23%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#00ccff',
  },
  createButton: {
    backgroundColor: '#d19fe8',
  },
  scheduleButton: {
    backgroundColor: '#bfd939',
  },
  statsButton: {
    backgroundColor: '#ff914d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  neonButton: {
    backgroundColor: '#bfd939',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 5,
    shadowColor: '#333',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginTop: 20,
  },
});

export default OutfitInspiration;