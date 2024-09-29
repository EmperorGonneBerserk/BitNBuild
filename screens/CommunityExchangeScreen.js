import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const CommunityExchangeScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFashionNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything?q=fashion&apiKey=a3056361ae624fdfb591257ab6106047');
        setNews(response.data.articles);
      } catch (err) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchFashionNews();
  }, []);

  const handleActionPress = (action) => {
    Alert.alert(`You selected to ${action} clothes!`);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Pink Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Community Exchange 🔄</Text>
      </View>

      <Text style={styles.subHeader}>
        Trade, donate, or lend clothes in a local or digital community, reducing clutter and promoting sustainability!
      </Text>
      
      {/* Action Buttons with Different Colors */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.tradeButton]} onPress={() => handleActionPress('Trade')}>
          <Text style={styles.actionButtonText}>Trade</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.donateButton]} onPress={() => handleActionPress('Donate')}>
          <Text style={styles.actionButtonText}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.lendButton]} onPress={() => handleActionPress('Lend')}>
          <Text style={styles.actionButtonText}>Lend</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={news}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4ff', // Light background
  },
  headerContainer: {
    backgroundColor: '#FF69B4', // Pink background for the header
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10, // Rounded corners for the header
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text on pink background
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
    color: '#3e4a61',
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  actionButton: {
    padding: 15,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Add shadow for button depth
  },
  tradeButton: {
    backgroundColor: '#1E90FF', // Bright blue
  },
  donateButton: {
    backgroundColor: '#32CD32', // Bright green
  },
  lendButton: {
    backgroundColor: '#FFA500', // Bright orange
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderLeftWidth: 6,
    borderLeftColor: '#FF6B6B',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3e4a61',
    marginBottom: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CommunityExchangeScreen;