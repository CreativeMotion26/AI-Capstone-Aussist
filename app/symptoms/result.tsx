import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';

export default function SymptomResult() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Symptom Checker</Text>
        <View style={{ width: 24 }} />
      </View> */}

      <ScrollView style={styles.contentContainer}>
        {/* Disease Info */}
        <View style={styles.diseaseCard}>
          <Text style={styles.diseaseTitle}>Seasonal Allergies</Text>
          
          <Text style={styles.sectionTitle}>Overview:</Text>
          <Text style={styles.description}>
            Seasonal allergies, also known as hay fever, are allergic reactions to environmental allergens such as pollen and dust. During specific seasons, typically spring or fall.
          </Text>
          
          <Text style={styles.sectionTitle}>Symptoms:</Text>
          <View style={styles.symptomList}>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.symptomText}>Nasal congestion and runny nose</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.symptomText}>Sneezing</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.symptomText}>Itchy and watery eyes</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.symptomText}>Throat irritation</Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Causes:</Text>
          <Text style={styles.description}>
            The condition is triggered by an immune response to airborne allergens like pollen and dust mites, which are more prevalent during certain seasons.
          </Text>
          
          <Text style={styles.sectionTitle}>Management and Treatment:</Text>
          <View style={styles.symptomList}>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.symptomText}>Medication: Use antihistamines, nasal sprays, or decongestants to alleviate symptoms</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.symptomText}>Environmental Control: Keep windows closed and use air purifiers to reduce indoor allergen levels</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.symptomText}>Consultation with a Specialist: If symptoms are severe, consult an allergist for appropriate treatment</Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Related Diseases:</Text>
          <View style={styles.symptomList}>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.symptomText}>Asthma</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.symptomText}>Chronic sinusitis</Text>
            </View>
          </View>
        </View>

        {/* Learn More Button */}
        <TouchableOpacity 
          style={styles.learnMoreButton}
          onPress={() => router.push({
            pathname: '/symptoms/detail',
          })}
        >
          <Text style={styles.learnMoreText}>Learn More</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  contentContainer: {
    flex: 1,
  },
  diseaseCard: {
    margin: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  diseaseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
  },
  symptomList: {
    marginLeft: 8,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bulletDot: {
    fontSize: 16,
    marginRight: 8,
    color: '#4B5563',
  },
  symptomText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
  },
  learnMoreButton: {
    margin: 16,
    padding: 14,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
  },
  learnMoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
}); 