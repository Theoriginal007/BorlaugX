import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const EducationScreen = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  const categories = {
    "Soil Health and Nutrient Management": {
      soilBasics: {
        title: "Introduction to Soil Health and Fertility",
        content: "Soil health is fundamental for agricultural productivity. Healthy soils support plant growth by providing essential nutrients, water retention, and a balanced ecosystem. The importance of maintaining soil fertility cannot be overstated, as it ensures long-term food security and sustainable farming practices."
      },
      nutrientCycles: {
        title: "Understanding Nutrient Cycles in Soil",
        content: "Nutrient cycles in the soil involve the processes of nutrient availability, uptake by plants, and replenishment. Understanding these cycles helps in managing soil fertility and avoiding overuse or depletion of essential elements like nitrogen, phosphorus, and potassium."
      },
      soilTesting: {
        title: "Soil Testing and Nutrient Deficiencies",
        content: "Soil testing is an important practice to determine nutrient levels and pH in the soil. Regular soil testing helps identify deficiencies and excesses of nutrients, enabling better fertilization practices and improved crop yield."
      },
      organicFarming: {
        title: "Organic Farming and Soil Health",
        content: "Organic farming practices prioritize soil health by reducing the use of synthetic chemicals and fertilizers. These practices focus on crop rotations, cover cropping, and composting to improve soil structure, enhance microbial activity, and prevent soil degradation."
      }
    },
    "Fertilizers and Soil Amendment": {
      organicFertilizers: {
        title: "Using Organic Fertilizers for Soil Health",
        content: "Organic fertilizers, such as compost, manure, and cover crops, help improve soil structure and add organic matter. They release nutrients slowly, reducing the risk of nutrient leaching and enhancing soil biodiversity."
      },
      chemicalFertilizers: {
        title: "Chemical Fertilizers and Their Role in Agriculture",
        content: "Chemical fertilizers are widely used to address nutrient deficiencies in soil. While effective, they can lead to soil acidification, nutrient imbalances, and environmental pollution if not used responsibly. Proper application rates and timing are crucial."
      },
      micronutrients: {
        title: "Micronutrients and Their Importance in Soil",
        content: "Micronutrients such as zinc, copper, and boron are essential for plant growth, even in small quantities. These nutrients often get depleted from soils and may require supplementation to ensure healthy crop development."
      },
      soilAmendments: {
        title: "Soil Amendments for Improving Soil Structure",
        content: "Soil amendments like lime, gypsum, and biochar help improve soil texture, aeration, and drainage. These materials are used to adjust soil pH, enhance nutrient availability, and boost overall soil health."
      }
    },
    "Soil Conservation and Management": {
      erosionControl: {
        title: "Erosion Control Techniques for Soil Conservation",
        content: "Soil erosion is a major threat to soil health and agricultural productivity. Methods like contour plowing, terracing, and planting cover crops can help reduce erosion and maintain soil integrity."
      },
      cropRotation: {
        title: "Crop Rotation and Its Benefits for Soil Health",
        content: "Crop rotation is a practice that helps maintain soil fertility by alternating the types of crops grown on a piece of land. It reduces the risk of soil nutrient depletion and pest buildup, promoting healthy soils."
      },
      waterManagement: {
        title: "Water Management for Sustainable Soil Health",
        content: "Proper water management techniques, such as drip irrigation and rainwater harvesting, help reduce soil erosion, prevent waterlogging, and ensure that nutrients are efficiently delivered to crops."
      },
      soilRehabilitation: {
        title: "Soil Rehabilitation Techniques for Degraded Land",
        content: "Soil degradation can occur due to overuse, poor management, or climate impacts. Rehabilitation techniques like reforestation, terracing, and applying organic matter can restore soil health and make it suitable for agriculture again."
      }
    },
    "Soil and Climate Change": {
      carbonSequestration: {
        title: "Soil Carbon Sequestration and Climate Change Mitigation",
        content: "Soil acts as a carbon sink, storing carbon in the form of organic matter. Practices such as no-till farming, cover cropping, and agroforestry help increase soil carbon sequestration, mitigating climate change."
      },
      soilTemperature: {
        title: "Soil Temperature and Its Impact on Plant Growth",
        content: "Soil temperature affects nutrient availability, water retention, and microbial activity. Understanding the relationship between soil temperature and plant growth can help optimize farming practices in changing climates."
      },
      droughtResilience: {
        title: "Building Soil Resilience Against Drought",
        content: "Soils with good structure and high organic matter content are better able to retain moisture. Techniques like mulching, using drought-resistant crops, and improving soil organic content can enhance soil resilience to drought."
      }
    },
    "Soil Science and Research": {
      soilMicrobiology: {
        title: "The Role of Soil Microorganisms in Soil Health",
        content: "Soil microorganisms, including bacteria, fungi, and earthworms, play a critical role in nutrient cycling, soil structure, and disease suppression. Understanding soil microbiology is essential for improving soil health and sustainability."
      },
      soilPhysics: {
        title: "Soil Physics: Understanding Soil Properties",
        content: "Soil physics deals with the physical properties of soil, such as texture, structure, and porosity. These properties determine how water, air, and nutrients move through the soil, which directly impacts crop growth."
      },
      advancedSoilTech: {
        title: "Advanced Soil Technologies for Precision Agriculture",
        content: "Advancements in soil science, such as soil sensors, GIS mapping, and precision agriculture tools, allow farmers to monitor soil health more effectively and make data-driven decisions for soil management."
      }
    },
    "Soil Fertilization Strategies": {
      balancedFertilization: {
        title: "Balanced Fertilization for Sustainable Agriculture",
        content: "Balanced fertilization ensures that crops receive the right amount of nutrients needed for optimal growth. It involves applying the appropriate amounts of nitrogen, phosphorus, and potassium in a way that matches crop needs and soil health."
      },
      slowReleaseFertilizers: {
        title: "Benefits of Slow-Release Fertilizers",
        content: "Slow-release fertilizers gradually release nutrients over time, reducing nutrient leaching and increasing the efficiency of fertilization. This approach helps maintain soil fertility in the long term and minimizes environmental impact."
      },
      fertilizerApplicationTechniques: {
        title: "Techniques for Effective Fertilizer Application",
        content: "Proper fertilizer application methods, such as broadcasting, banding, and fertigation, ensure nutrients are effectively utilized by crops. Understanding timing and application rates is key to minimizing wastage and maximizing yield."
      }
    },
    "Soil Health Education and Awareness": {
      soilConservationWorkshops: {
        title: "Soil Conservation Workshops and Training",
        content: "Soil conservation workshops provide farmers and land managers with the knowledge and tools needed to maintain soil health. These workshops cover best practices for soil fertility management, erosion control, and sustainable farming techniques."
      },
      soilAwarenessCampaigns: {
        title: "Soil Health Awareness Campaigns",
        content: "Raising awareness about the importance of soil health is vital for encouraging sustainable agricultural practices. Public campaigns can educate farmers, policymakers, and communities about the role of soil in food security and climate resilience."
      },
      schoolPrograms: {
        title: "Soil Education in Schools",
        content: "Incorporating soil health education into school curricula helps build a future generation of environmentally conscious citizens. School programs that teach students about the science of soil and its role in sustainability are essential for long-term change."
      }
    }
  };
  

  const handleSearch = (text) => {
    setSearchQuery(text.toLowerCase());
  };

  const handleBookmark = (article) => {
    // Add or remove the article from the bookmarked list
    setBookmarkedArticles(prev => {
      if (prev.includes(article)) {
        return prev.filter(item => item !== article);  // Remove if already bookmarked
      } else {
        return [...prev, article];  // Add to bookmarks
      }
    });
  };

  const filteredCategories = Object.keys(categories).filter((category) => 
    category.toLowerCase().includes(searchQuery) ||
    Object.keys(categories[category]).some((articleKey) =>
      categories[category][articleKey].title.toLowerCase().includes(searchQuery)
    )
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles or categories..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>
      <Text style={styles.mainTitle}></Text>
      <ScrollView>
        <View style={styles.bookmarkSection}>
          <Text style={styles.mainTitle}>Bookmarked Articles</Text>
          {bookmarkedArticles.length > 0 ? (
            bookmarkedArticles.map((article, index) => (
              <Text key={index} style={styles.articleTitle}>
                {article.title}
              </Text>
            ))
          ) : (
            <Text>No bookmarked articles.</Text>
          )}
        </View>

        <View style={styles.gridContainer}>
          {filteredCategories.map((category) => (
            <View key={category} style={styles.categoryCard}>
              <TouchableOpacity onPress={() => setExpandedCategory(expandedCategory === category ? null : category)}>
                <Text style={styles.categoryTitle}>{category}</Text>
              </TouchableOpacity>
              {expandedCategory === category && (
                <View style={styles.articleList}>
                  {Object.keys(categories[category]).map((articleKey) => {
                    const article = categories[category][articleKey];
                    return (
                      <View key={articleKey} style={styles.articleCard}>
                        <TouchableOpacity onPress={() => setSelectedArticle(article)}>
                          <Text style={styles.articleTitle}>{article.title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleBookmark(article)}>
                          <Text style={styles.bookmarkText}>
                            {bookmarkedArticles.includes(article) ? "Unbookmark" : "Bookmark"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          ))}
        </View>

        {selectedArticle && (
          <View style={styles.articleContainer}>
            <Text style={styles.articleTitle}>{selectedArticle.title}</Text>
            <Text style={styles.articleContent}>{selectedArticle.content}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take up the full available space
    padding: 16, // Adds padding inside the container
    backgroundColor: '#ECEFF1', // Light gray background color for the container
  },
  articleContainer: {
    flex: 1, // Makes the article container take up full available space
    padding: 16, // Adds padding inside the article container
    backgroundColor: '#FFFFFF', // White background for article container
  },
  mainTitle: {
    fontSize: 26, // Large font size for the main title
    fontWeight: 'bold', // Bold text for the main title
    marginBottom: 20, // Adds spacing below the main title
    textAlign: 'center', // Centers the title horizontally
    color: '#004D40', // Sets the title text color to a dark teal
  },
  gridContainer: {
    flexDirection: 'row', // Arranges the items in a row
    flexWrap: 'wrap', // Allows items to wrap into multiple lines
    justifyContent: 'space-between', // Distributes space evenly between the items
  },
  categoryCard: {
    backgroundColor: '#004D40', // Dark gray background for category cards
    padding: 16, // Adds padding inside category cards
    marginBottom: 20, // Adds spacing below each category card
    marginHorizontal: 8, // Adds horizontal spacing between category cards
    borderRadius: 12, // Rounds the corners of the category card
    width: '45%', // Sets the width of each category card to 45% of its container
    marginVertical: 8, // Adds vertical spacing between category cards
    shadowColor: '#004D40', // Dark teal shadow color for category cards
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (slight vertical shadow)
    shadowOpacity: 0.3, // Transparency of the shadow (30%)
    shadowRadius: 4, // Radius of the shadow blur
  },
  categoryTitle: {
    fontSize: 22, // Sets the font size for the category title
    fontWeight: 'bold', // Makes the category title text bold
    marginBottom: 10, // Adds spacing below the category title
    color: '#FFFFFF', // Sets the category title text color to white
  },
  articleList: {
    flexDirection: 'column', // Arranges article items in a vertical column
  },
  articleCard: {
    backgroundColor: '#263238', // Dark teal background for article cards
    padding: 14, // Adds padding inside article cards
    marginBottom: 12, // Adds spacing below each article card
    borderRadius: 8, // Rounds the corners of the article card
    borderColor: '#004D40', // Dark teal border color for article cards
    borderWidth: 1, // Sets the border width of the article card
    shadowColor: '#004D40', // Black shadow color for article cards
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (slight vertical shadow)
    shadowOpacity: 0.2, // Transparency of the shadow (20%)
    shadowRadius: 4, // Radius of the shadow blur
  },
  articleTitle: {
    fontSize: 18, // Medium font size for the article title
    fontWeight: '600', // Semi-bold font weight for the article title
    color: 'fff', // White color for article title (it should be '#FFFFFF' instead of 'fff')
  },
  articleContent: {
    fontSize: 16, // Sets the font size for the article content
    marginTop: 10, // Adds top margin for spacing
    color: '#004D40', // Sets the text color to dark teal for the article content
  },
  bookmarkText: {
    fontSize: 14, // Sets the font size for bookmark text
    color: '#004D40', // Dark teal color for bookmark text
    marginTop: 6, // Adds spacing above the bookmark text
  },
});


export default EducationScreen;

