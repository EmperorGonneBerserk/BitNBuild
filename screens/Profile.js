import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { auth, db } from '../firebase'; // Adjust the path as needed
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { width, height } = Dimensions.get('window');

  // Increased number of circle positions
  const [circlePositions] = useState([
    { emoji: '👕', color: 'rgba(255, 87, 51, 0.7)', path: 'circle' },
    { emoji: '👖', color: 'rgba(51, 255, 87, 0.7)', path: 'ellipse' },
    { emoji: '💄', color: 'rgba(51, 87, 255, 0.7)', path: 'circle' },
    { emoji: '👗', color: 'rgba(255, 204, 51, 0.7)', path: 'ellipse' },
    { emoji: '👠', color: 'rgba(204, 51, 255, 0.7)', path: 'circle' },
    { emoji: '👒', color: 'rgba(51, 204, 255, 0.7)', path: 'ellipse' },
    { emoji: '👚', color: 'rgba(255, 165, 0, 0.7)', path: 'circle' },
    { emoji: '👟', color: 'rgba(75, 0, 130, 0.7)', path: 'ellipse' },
    { emoji: '👞', color: 'rgba(255, 20, 147, 0.7)', path: 'circle' },
    { emoji: '🧣', color: 'rgba(0, 191, 255, 0.7)', path: 'ellipse' },
  ]);

  const animatedValues = useRef(circlePositions.map(() => new Animated.Value(0))).current;

  // New animated background color
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = auth.currentUser.uid; // Get the current user's ID
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        setName(userDoc.data().name);
      }
    };

    fetchUserData();
    animateCircles();
    animateBackground();
  }, []);

  const animateCircles = () => {
    circlePositions.forEach((_, index) => {
      const duration = 3000; // Duration of each full animation cycle

      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValues[index], {
            toValue: 1,
            duration: duration,
            useNativeDriver: false,
            easing: Easing.linear,
          }),
          Animated.timing(animatedValues[index], {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }),
        ])
      ).start();
    });
  };

  const animateBackground = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundColor, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundColor, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const renderCircles = () => {
    return circlePositions.map((circle, index) => {
      const translateX = animatedValues[index].interpolate({
        inputRange: [0, 1],
        outputRange: [
          circle.path === 'circle'
            ? width / 3 + Math.cos((index * Math.PI) / 3) * 300 // Circular movement
            : width / 3 + Math.cos((index * Math.PI) / 3) * 200, // Elliptical movement
          width / 3 + Math.cos((index * Math.PI) / 3 + Math.PI) * 300,
        ],
      });

      const translateY = animatedValues[index].interpolate({
        inputRange: [0, 1],
        outputRange: [
          circle.path === 'circle'
            ? height / 3 + Math.sin((index * Math.PI) / 3) * 300 // Circular movement
            : height / 3 + Math.sin((index * Math.PI) / 3) * 500, // Elliptical movement
          height / 3 + Math.sin((index * Math.PI) / 3 + Math.PI) * 100,
        ],
      });

      return (
        <Animated.View
          key={index}
          style={[
            styles.circle,
            { backgroundColor: circle.color, transform: [{ translateX }, { translateY }] },
          ]}
        >
          <Text style={styles.emoji}>{circle.emoji}</Text>
        </Animated.View>
      );
    });
  };

  // Interpolating background color
  const backgroundColorInterpolation = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#c4d5da', '#c6a6be'], // Change colors as desired
  });

  const handleUpdateProfile = async () => {
    try {
      const userId = auth.currentUser.uid;
      await updateDoc(doc(db, 'users', userId), { name });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage(error.message);
    }
  };

  if (!userData) return <Text>Loading...</Text>;

  return (
    <Animated.View style={[styles.container, { backgroundColor: backgroundColorInterpolation }]}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TouchableOpacity onPress={handleUpdateProfile} style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
      {renderCircles()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  errorMessage: {
    color: 'red',
  },
  updateButton: {
    backgroundColor: '#ff6f61',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  updateButtonText: {
    color: '#fff',
  },
  circle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  emoji: {
    fontSize: 30,
  },
});

export default ProfileScreen;
