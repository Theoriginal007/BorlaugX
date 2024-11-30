import React, { useState } from 'react';
import { View, Text, ScrollView, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Icon for "leaf"
import { PieChart } from 'react-native-chart-kit';

const WelcomeScreen = () => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [state, setState] = useState({
    loading: false,
    recommendations: "Improvement in pH level and nitrogen is needed for optimal growth.",
    saturation: 70,
    organicCarbon: 4,
    phLevel: 7,
    nitrogen: 0.5,
    phosphorus: 15,
    potassium: 300,
    salinity: 5,
    oxygenLevel: 7,
  });

  // Dummy render function for PieChart, replace it with actual implementation.
  const renderPieChart = (title, value, max, color) => {
    const data = [
      {
        name: title,
        population: value,
        color: color,
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Remaining',
        population: max - value,
        color: '#e0e0e0',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];
  
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{title}</Text>
        <PieChart
          data={data}
          width={150} // Width of the PieChart
          height={150} // Height of the PieChart
          chartConfig={{
            backgroundColor: '#e0e0e0',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelFontSize: 5, // Adjust font size of the percentage labels
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute // Shows the value in the center
          hasLegend={false} // Remove legend if not needed
        />
      </View>
    );
  };
  

  const handleSoilAnalysis = () => {
    setState({ ...state, loading: true });
    // Simulate API call and set loading state to false after 3 seconds
    setTimeout(() => {
      setState({ ...state, loading: false });
    }, 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <FontAwesome name="leaf" size={40} color="#34b233" style={styles.icon} />
        <Text style={styles.welcomeTitle}>Welcome to BourlagX</Text>
        <Text style={styles.welcomeText}>
          BourlagX is your real-time soil health companion, providing quick insights into your soil's quality. Regular updates ensure you have up-to-the-minute information on your soil parameters, so you can take immediate action for optimal plant growth.
        </Text>
      </View>

      {/* Info Section with Colorful Boxes */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Soil Quality Analysis</Text>
          <Text style={styles.infoText}>
            This app helps you analyze soil quality by assessing key parameters like pH level, nitrogen, phosphorus, and more. 
            It provides you with detailed insights into the health of your soil and helps you make informed decisions.
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Personalized Recommendations</Text>
          <Text style={styles.infoText}>
            Based on the analysis, we provide personalized recommendations to improve your soil health. 
            Whether it's adding fertilizers or adjusting pH, we guide you toward optimal conditions for your plants.
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Actionable Insights</Text>
          <Text style={styles.infoText}>
            The app gives you actionable insights into each aspect of your soil, from nitrogen levels to salinity, 
            helping you achieve the best growing conditions for your plants.
          </Text>
        </View>
      </View>

      {/* Soil Analysis Section */}
      <Text style={styles.title}>Soil Analysis</Text>
      <Button title="Analyze Soil" onPress={handleSoilAnalysis} />
      <Button 
        title={showAnalysis ? "Hide Analysis" : "Show Analysis"} 
        onPress={() => setShowAnalysis(!showAnalysis)} 
        style={styles.toggleButton}
      />

      {state.loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}

      {showAnalysis && !state.loading && state.recommendations && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Analysis:</Text>
          <Text style={styles.recommendationText}>{state.recommendations}</Text>

          {/* Chart Row for Soil Parameters */}
          <View style={styles.chartRow}>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Saturation</Text>
              {renderPieChart('Saturation', state.saturation, 100, '#66cc66')}
            </View>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Organic Carbon</Text>
              {renderPieChart('Organic Carbon', state.organicCarbon, 5, '#ffcc00')}
            </View>
          </View>

          <View style={styles.chartRow}>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>pH Level</Text>
              {renderPieChart('pH Level', state.phLevel, 14, '#ff6666')}
            </View>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Nitrogen</Text>
              {renderPieChart('Nitrogen', state.nitrogen, 1, '#ff9900')}
            </View>
          </View>

          <View style={styles.chartRow}>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Phosphorus</Text>
              {renderPieChart('Phosphorus', state.phosphorus, 20, '#3399ff')}
            </View>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Potassium</Text>
              {renderPieChart('Potassium', state.potassium, 400, '#0099cc')}
            </View>
          </View>

          <View style={styles.chartRow}>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Salinity</Text>
              {renderPieChart('Salinity', state.salinity, 10, '#ff66cc')}
            </View>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Oxygen Level</Text>
              {renderPieChart('Oxygen Level', state.oxygenLevel, 10, '#00ccff')}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#004D40', 
  },
  welcomeContainer: {
    padding: 20,
    backgroundColor: '#e1f7d5',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004D40', 
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 15,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoBox: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004D40', 
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#004D40', 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', 
  },
  toggleButton: {
    marginBottom: 15,
  },
  loading: {
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  recommendationText: {
    fontSize: 16,
    color: '#004D40', 
    marginBottom: 20,
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  chartContainer: {
    width: '48%',
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 10,
  },
  chart: {
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f39c12', // Orange color for action
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3, // For Android shadow effect
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  chartValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default WelcomeScreen;
