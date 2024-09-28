import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, ActivityIndicator } from 'react-native';

const API_KEY = '8B0IXwgKdjy6o6ilo30TamyvB9KVXy5jcqsTDwiS2MdlKajvNImVIg6J';
const API_URL = 'https://api.pexels.com/v1/search?query=outfit&per_page=15&page=';

const OutfitInspiration = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('outfit'); // Default category

  const fetchImages = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}${pageNumber}`, {
        headers: {
          Authorization: API_KEY,
        },
      });
      const data = await response.json();
      if (data.photos) {
        setImages(data.photos);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const handleRefresh = () => {
    setPage((prevPage) => prevPage + 1); // Increment page to fetch new images
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    // Reset to the first page for new category
    setPage(1);
    // Fetch new images based on category (if API supports category filtering)
    fetchImages(1); // You might need to adjust this if API supports category filtering
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Let's help users discover new ways to style their existing clothes! 
        Explore trending fashion styles and seasonal must-haves.
      </Text>

      {/* Categories Section */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Browse Categories:</Text>
        <View style={styles.categories}>
          <Button title="Casual" onPress={() => handleCategoryChange('casual')} color="#007bff" />
          <Button title="Formal" onPress={() => handleCategoryChange('formal')} color="#007bff" />
          <Button title="Sporty" onPress={() => handleCategoryChange('sporty')} color="#007bff" />
          <Button title="Party" onPress={() => handleCategoryChange('party')} color="#007bff" />
        </View>
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
          <Button title="Refresh Images" onPress={handleRefresh} color="#007bff" />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    width: '100%',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  scrollContainer: {
    padding: 20,
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
});

export default OutfitInspiration;