import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const GalleryPicker = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // Track if the analysis is in progress
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    (async () => {
      // Request permission to access media library
      const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(mediaLibraryPermission.granted);
    })();
  }, []);

  const handleImagePicker = async () => {
    // If permission to access the media library is not granted, alert the user
    if (!hasPermission) {
      Alert.alert('Permission to access the image library is required!');
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4], // Adjust the aspect ratio of the selected image
      quality: 1, // Set the quality of the image
    });

    // If the user selected an image, update the state
    if (!result.canceled) {
      setImage(result.assets[0].uri); // Store the image URI in your state
      setIsAnalyzing(true); // Start analyzing the image
      setFeedback(''); // Clear previous feedback
      
      // Simulate an analysis process with a delay
      setTimeout(() => {
        setIsAnalyzing(false); // Stop the analysis process
        setFeedback(generateSoilFeedback());
      }, 3000); // Set the analysis time (3 seconds in this case)
    }
  };

  // Simulate generating soil feedback based on the image analysis
  const generateSoilFeedback = () => {
    // Here you could add more complex logic based on the soil analysis
    const feedbackMessages = [
      "The soil looks healthy, well-balanced in texture, and is free from pests. It's well-moisturized, making it great for planting!",
      "The soil appears slightly dry. Consider watering it to improve the moisture level. No pests detected.",
      "The soil looks a bit compacted, which could affect plant root growth. Consider aerating it. No pests or issues detected.",
      "The soil is a bit too sandy, which may cause drainage issues. It’s low on moisture. You might need to amend it with organic matter.",
      "Everything looks great! The soil texture is ideal, with no pests or damage, and the moisture level is perfect for healthy plant growth.",
      "The soil seems a little too moist, which could lead to root rot. Consider improving drainage and reducing watering.",
    ];
    
    // Return a random feedback message to simulate analysis results
    const randomIndex = Math.floor(Math.random() * feedbackMessages.length);
    return feedbackMessages[randomIndex];
  };

  if (hasPermission === null) {
    return <Text>Requesting permissions...</Text>;
  }

  if (!hasPermission) {
    return <Text>Permission to access the media library is required!</Text>;
  }

  return (
    <View style={styles.container}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          {isAnalyzing ? (
            <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />
          ) : (
            <Text style={styles.feedbackText}>{feedback}</Text>
          )}
        </>
      ) : (
        <Text style={styles.placeholderText}>Pick an image of your soil from your gallery, and we will analyze it for you!</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleImagePicker} style={styles.button}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
  },
  button: {
    backgroundColor: '#004D40',
    padding: 15,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  spinner: {
    marginVertical: 20,
  },
  feedbackText: {
    fontSize: 18,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default GalleryPicker;
