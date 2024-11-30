import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Switch,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { lightTheme, darkTheme } from '../theme'; // Adjust paths as necessary
import { Appearance } from 'react-native';
import i18n from 'i18next'; // Import i18n for language changes

// Importing individual settings components
import AboutSettings from './AboutSettings';
import PrivacyPolicy from './PrivacyPolicy';
import TermsConditions from './TermsConditions';
import Help from './Help'; // Assuming you have a Help component

export default class AccessSettings extends Component {
  state = {
    notificationsEnabled: false,
    remindersEnabled: false,
    symptoms: '',
    farmingPractices: '',
    farmingTools: '',
    notes: '',
    isDarkMode: false,
    theme: lightTheme,
    feedback: '',
    language: 'English',
    languages: [
      'English',
      'Kiswahili',
      'Spanish',
      'French',
      'German',
      'Chinese',
      'Italian',
      'Portuguese',
      'Russian',
      'Japanese',
      'Korean',
      'Arabic',
      'Turkish',
      'Hindi',
      'Bengali',
      'Urdu',
    ],
    showTerms: false,
    showPrivacyPolicy: false,
    showHelp: false,
    showAbout: false,
  };

  toggleSwitch = (field) => {
    this.setState((prevState) => ({
      [field]: !prevState[field],
    }));
  };

  handleLanguageChange = (selectedLanguage) => {
    this.setState({ language: selectedLanguage });
    i18n.changeLanguage(selectedLanguage.toLowerCase()); // Change language using i18n
  };

  handleThemeToggle = () => {
    this.setState(
      (prevState) => ({
        isDarkMode: !prevState.isDarkMode,
        theme: !prevState.isDarkMode ? darkTheme : lightTheme,
      }),
      () => {
        Appearance.setColorScheme(this.state.isDarkMode ? 'dark' : 'light');
      }
    );
  };

  handleSubmitFeedback = () => {
    Alert.alert('Feedback Submitted', `Your feedback: ${this.state.feedback}`);
    this.setState({ feedback: '' });
  };

  toggleSection = (section) => {
    this.setState((prevState) => ({
      [section]: !prevState[section],
    }));
  };

  render() {
    const {
      notificationsEnabled,
      remindersEnabled,
      symptoms,
      farmingPractices,
      farmingTools,
      notes,
      feedback,
      language,
      languages,
      theme,
      showTerms,
      showPrivacyPolicy,
      showHelp,
      showAbout,
    } = this.state;

    return (
      <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]} showsVerticalScrollIndicator={true}>
        {/* Notifications & Reminders */}
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.textColor }]}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => this.toggleSwitch('notificationsEnabled')}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.textColor }]}>Enable Reminders</Text>
          <Switch
            value={remindersEnabled}
            onValueChange={() => this.toggleSwitch('remindersEnabled')}
          />
        </View>

        {/* Symptoms, Farming Practices, and Tools Inputs */}
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.textColor }]}>Symptoms</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.borderColor }]}
            value={symptoms}
            onChangeText={(text) => this.setState({ symptoms: text })}
            placeholder="Enter symptoms"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.textColor }]}>Farming Practices</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.borderColor }]}
            value={farmingPractices}
            onChangeText={(text) => this.setState({ farmingPractices: text })}
            placeholder="Enter farming practices"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.textColor }]}>Farming Tools</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.borderColor }]}
            value={farmingTools}
            onChangeText={(text) => this.setState({ farmingTools: text })}
            placeholder="Enter farming tools"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.textColor }]}>Notes</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.borderColor }]}
            value={notes}
            onChangeText={(text) => this.setState({ notes: text })}
            placeholder="Enter notes"
            multiline
          />
        </View>

        {/* Language Picker */}
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.textColor }]}>Select Language</Text>
          <Picker
            selectedValue={language}
            onValueChange={this.handleLanguageChange}
            style={[styles.picker, { color: theme.textColor }]}
          >
            {languages.map((lang, index) => (
              <Picker.Item key={index} label={lang} value={lang} />
            ))}
          </Picker>
        </View>

        {/* Feedback Section */}
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.textColor }]}>Feedback</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.borderColor }]}
            value={feedback}
            onChangeText={(text) => this.setState({ feedback: text })}
            placeholder="Enter your feedback"
            multiline
          />
          <Button title="Submit Feedback" onPress={this.handleSubmitFeedback} />
        </View>

        {/* Theme Toggle */}
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.textColor }]}>Dark Mode</Text>
          <Switch
            value={this.state.isDarkMode}
            onValueChange={this.handleThemeToggle}
          />
        </View>

        {/* Collapsible Sections */}
        <TouchableOpacity onPress={() => this.toggleSection('showTerms')} style={styles.toggleSection}>
          <Text style={[styles.toggleText, { color: theme.textColor, padding: 10, backgroundColor: '#004D40' }]}>Terms & Conditions</Text>
        </TouchableOpacity>
        {showTerms && <TermsConditions />}

        <TouchableOpacity onPress={() => this.toggleSection('showPrivacyPolicy')} style={styles.toggleSection}>
          <Text style={[styles.toggleText, { color: theme.textColor }]}>Privacy Policy</Text>
        </TouchableOpacity>
        {showPrivacyPolicy && <PrivacyPolicy />}

        <TouchableOpacity onPress={() => this.toggleSection('showHelp')} style={styles.toggleSection}>
          <Text style={[styles.toggleText, { color: theme.textColor }]}>Help</Text>
        </TouchableOpacity>
        {showHelp && <Help />}

        {/* Add sufficient space before "About" */}
        <View style={{ marginBottom: 20 }} />

        <TouchableOpacity onPress={() => this.toggleSection('showAbout')} style={styles.toggleSection}>
          <Text style={[styles.toggleText, { color: theme.textColor }]}>About</Text>
        </TouchableOpacity>
        {showAbout && <AboutSettings />}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Overall padding for the screen
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginVertical: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  picker: {
    height: 50,
  },
  toggleSection: {
    paddingVertical: 10,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Add marginBottom to push the content down to avoid overlap
  aboutSection: {
    marginTop: 20, // Adds space before the About section
    marginBottom: 20, // Adds space after the About section to prevent overlap
  },
});
