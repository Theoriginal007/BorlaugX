import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Button, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const SettingsPage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [image, setImage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('email');
        const savedAuthCode = await AsyncStorage.getItem('authCode');
        const savedIsEnabled = await AsyncStorage.getItem('notificationsEnabled');
        const savedTheme = await AsyncStorage.getItem('darkMode');
        const savedLanguage = await AsyncStorage.getItem('language');

        if (savedEmail) setEmail(savedEmail);
        if (savedAuthCode) setAuthCode(savedAuthCode);
        if (savedIsEnabled !== null) setIsEnabled(JSON.parse(savedIsEnabled));
        if (savedTheme !== null) setIsDarkMode(JSON.parse(savedTheme));
        if (savedLanguage) setSelectedLanguage(savedLanguage);
      } catch (error) {
        console.error('Error loading settings', error);
      }
    };

    loadSettings();
  }, []);

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveSettings = async () => {
    if (!email || !authCode) {
      Alert.alert('Error', 'Please enter both email and authentication code.');
      return;
    }

    setIsSaving(true);
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('authCode', authCode);
      await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(isEnabled));
      await AsyncStorage.setItem('darkMode', JSON.stringify(isDarkMode));
      await AsyncStorage.setItem('language', selectedLanguage);

      Alert.alert('Success', 'Settings saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'There was an issue saving your settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
      <ScrollView style={[styles.container, isDarkMode && styles.darkMode]}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkModeText]}>Profile Settings</Text>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkModeText]}>Email</Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.darkModeInput]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkModeText]}>Authentication Code</Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.darkModeInput]}
              value={authCode}
              onChangeText={setAuthCode}
              placeholder="Enter your authentication code"
              placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
              secureTextEntry
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkModeText]}>Profile Image</Text>
            <TouchableOpacity onPress={handleImagePicker} style={[styles.imagePickerButton, isDarkMode && styles.darkModeButton]}>
              <Text style={styles.buttonText}>Choose Image</Text>
            </TouchableOpacity>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <Text style={[styles.placeholder, isDarkMode && styles.darkModeText]}>No image selected</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkModeText]}>Notification Settings</Text>
          <View style={styles.switchGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkModeText]}>Enable Notifications</Text>
            <Switch
              value={isEnabled}
              onValueChange={(value) => setIsEnabled(value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkModeText]}>Language Preferences</Text>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkModeText]}>Select Language</Text>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
              style={[styles.picker, isDarkMode && styles.darkModeInput]}
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Spanish" value="Spanish" />
              <Picker.Item label="French" value="French" />
              <Picker.Item label="German" value="German" />
            </Picker>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkModeText]}>Theme Settings</Text>
          <View style={styles.switchGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkModeText]}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={(value) => setIsDarkMode(value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkModeText]}>Security Settings</Text>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkModeText]}>Change Password</Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.darkModeInput]}
              secureTextEntry
              placeholder="Enter new password"
              placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkModeText]}>Additional Settings</Text>
          <TouchableOpacity
            onPress={saveSettings}
            style={[styles.saveButton, isDarkMode && styles.darkModeButton]}
            disabled={isSaving}
          >
            <Text style={styles.buttonText}>{isSaving ? 'Saving...' : 'Save Settings'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkMode: {
    backgroundColor: '#333',
  },
  darkModeText: {
    color: '#fff',
  },
  darkModeInput: {
    backgroundColor: '#555',
    color: '#fff',
  },
  darkModeButton: {
    backgroundColor: '#4CAF50',
  },
  section: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  switchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#004D40',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePickerButton: {
    backgroundColor: '#004D40',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  placeholder: {
    color: '#888',
    fontStyle: 'italic',
  },
});

export default SettingsPage;
