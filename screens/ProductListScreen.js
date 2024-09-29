import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Linking } from 'react-native'; // Adjust imports for React Native
import Product from './Product'; // Import the Product component

const SHOPIFY_API_KEY = '8e5acdfcf9fb42e289e5569b6bf47b97';
const SHOPIFY_PASSWORD = '386784dabda56219f63cddff790df59d';
const SHOPIFY_STORE_NAME = 'smart-cupboard';

function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    const url = `https://${SHOPIFY_API_KEY}:${SHOPIFY_PASSWORD}@${SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2021-07/products.json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.products) {
        setProducts(data.products);
      } else {
        setError("No products found");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.productList}>
      {products.map((product) => (
        <Product
          key={product.id}
          title={product.title}
          price={product.variants[0].price}
          imageUrl={product.image?.src} // Use optional chaining
          productUrl={`https://smart-cupboard.myshopify.com/products/${product.handle}`}
        />
      ))}
    </View>
  );
}

// Simple styling for the product list
const styles = StyleSheet.create({
  productList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ProductListScreen;
