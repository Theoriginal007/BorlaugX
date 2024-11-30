import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Correct import

const packages = [
  { id: '1', name: 'Basic Package for Vegetables', price: '$45', purchaseCount: 200, addedDate: '2024-01-05', rating: 4.0, cropType: 'Vegetables', tools: ['Saturation (% weight)', 'Organic Carbon (% weight)', 'Soil pH'], image: 'https://via.placeholder.com/150?text=Vegetable+Basic+Package' },
  { id: '2', name: 'Basic Package for Fruits', price: '$45', purchaseCount: 180, addedDate: '2024-02-10', rating: 4.2, cropType: 'Fruits', tools: ['Saturation (% weight)', 'Organic Carbon (% weight)', 'Soil pH'], image: 'https://via.placeholder.com/150?text=Fruit+Basic+Package' },
  { id: '3', name: 'Premium Package for Vegetables', price: '$55', purchaseCount: 150, addedDate: '2024-03-15', rating: 4.5, cropType: 'Vegetables', tools: ['Salinity (dS/m)', 'Oxygen Level (%)', 'Saturation (% weight)', 'Organic Carbon (% weight)', 'Soil pH'], image: 'https://via.placeholder.com/150?text=Vegetable+Premium+Package' },
  { id: '4', name: 'Premium Package for Fruits', price: '$55', purchaseCount: 140, addedDate: '2024-04-10', rating: 4.7, cropType: 'Fruits', tools: ['Salinity (dS/m)', 'Oxygen Level (%)', 'Saturation (% weight)', 'Organic Carbon (% weight)', 'Soil pH'], image: 'https://via.placeholder.com/150?text=Fruit+Premium+Package' },
  { id: '5', name: 'Ultimate Package for Vegetables', price: '$65', purchaseCount: 100, addedDate: '2024-05-05', rating: 5.0, cropType: 'Vegetables', tools: ['Saturation (% weight)', 'Organic Carbon (% weight)', 'Soil pH', 'Nitrogen Level', 'Phosphorus Level', 'Potassium Level', 'Salinity (dS/m)', 'Oxygen Level (%)'], image: 'https://via.placeholder.com/150?text=Vegetable+Ultimate+Package' },
  { id: '6', name: 'Ultimate Package for Fruits', price: '$65', purchaseCount: 90, addedDate: '2024-06-10', rating: 5.0, cropType: 'Fruits', tools: ['Saturation (% weight)', 'Organic Carbon (% weight)', 'Soil pH', 'Nitrogen Level', 'Phosphorus Level', 'Potassium Level', 'Salinity (dS/m)', 'Oxygen Level (%)'], image: 'https://via.placeholder.com/150?text=Fruit+Ultimate+Package' },
];
const ShopScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [filteredPackages, setFilteredPackages] = useState(packages);

  const [categoryVisible, setCategoryVisible] = useState(false); // State to toggle Category visibility
  const [ratingVisible, setRatingVisible] = useState(false); // State to toggle Rating visibility
  const [priceRangeVisible, setPriceRangeVisible] = useState(false); // State to toggle Price Range visibility

  const handleFilterChange = () => {
    let filtered = packages;

    // Filter by Crop Type
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(pkg => pkg.cropType === selectedCategory);
    }

    // Filter by Rating
    if (selectedRating !== 'All') {
      filtered = filtered.filter(pkg => pkg.rating >= parseFloat(selectedRating));
    }

    // Filter by Price Range
    if (selectedPriceRange === 'Below $100') {
      filtered = filtered.filter(pkg => parseInt(pkg.price.slice(1)) < 100);
    } else if (selectedPriceRange === 'Above $100') {
      filtered = filtered.filter(pkg => parseInt(pkg.price.slice(1)) >= 100);
    }

    setFilteredPackages(filtered);
  };

  const handlePackagePress = (pkg) => {
    Alert.alert(
      'Package Details',
      `Name: ${pkg.name}\nPrice: ${pkg.price}\nRating: ${pkg.rating}\nCrop Type: ${pkg.cropType}\nTools: ${pkg.tools.join(', ')}`,
      [{ text: 'OK' }]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePackagePress(item)} style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
        <Text style={styles.cropType}>Crop Type: {item.cropType}</Text>
        <Text style={styles.tools}>Tools: {item.tools.join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop for Kits</Text>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        {/* Rating Filter */}
        <TouchableOpacity onPress={() => setRatingVisible(!ratingVisible)} style={styles.filterToggle}>
          <Text style={styles.filterLabel}>Ratings</Text>
        </TouchableOpacity>
        {ratingVisible && (
          <Picker
            selectedValue={selectedRating}
            onValueChange={(itemValue) => setSelectedRating(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="4.0+" value="4.0" />
            <Picker.Item label="4.5+" value="4.5" />
            <Picker.Item label="5.0" value="5.0" />
          </Picker>
        )}

        {/* Price Range Filter */}
        <TouchableOpacity onPress={() => setPriceRangeVisible(!priceRangeVisible)} style={styles.filterToggle}>
          <Text style={styles.filterLabel}>Price Range</Text>
        </TouchableOpacity>
        {priceRangeVisible && (
          <Picker
            selectedValue={selectedPriceRange}
            onValueChange={(itemValue) => setSelectedPriceRange(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Below $100" value="Below $100" />
            <Picker.Item label="Above $100" value="Above $100" />
          </Picker>
        )}

        {/* Collapsible Category Filter */}
        <TouchableOpacity onPress={() => setCategoryVisible(!categoryVisible)} style={styles.filterToggle}>
          <Text style={styles.filterLabel}>Crop Type</Text>
        </TouchableOpacity>
        {categoryVisible && (
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Vegetables" value="Vegetables" />
            <Picker.Item label="Fruits" value="Fruits" />
          </Picker>
        )}

        {/* Apply Filters Button */}
        <TouchableOpacity onPress={handleFilterChange} style={styles.applyButton}>
          <Text style={styles.buttonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Package List */}
      <FlatList
        data={filteredPackages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#004D40', 
  },
  filterContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4, 
  },
  filterLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: "#FFF", 
  },
  picker: {
    height: 50,
    marginBottom: 15,
  },
  filterToggle: {
    padding: 10,
    backgroundColor: '#004D40', 
    borderRadius: 8,
    marginBottom: 5,
  },
  applyButton: {
    backgroundColor: '#004D40', 
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#81C784',
  },
  rating: {
    fontSize: 14,
    color: '#6A0DAD', 
  },
  cropType: {
    fontSize: 14,
    color: '#666',
  },
  tools: {
    fontSize: 12,
    color: '#004D40',
  },
  list: {
    paddingBottom: 20,
  },
});


export default ShopScreen;
