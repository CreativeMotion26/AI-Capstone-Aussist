import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';

export default function SymptomDetail() {
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
          
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionCard}>
              <View style={styles.optionIcon}>
                <Ionicons name="document-text-outline" size={24} color="#4299E1" />
              </View>
              <Text style={styles.optionLabel}>Guide to medicine for this symptom</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionCard}>
              <View style={styles.optionIcon}>
                <Ionicons name="information-circle-outline" size={24} color="#4299E1" />
              </View>
              <Text style={styles.optionLabel}>Related Diseases</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionCard}>
              <View style={styles.optionIcon}>
                <Ionicons name="list-outline" size={24} color="#4299E1" />
              </View>
              <Text style={styles.optionLabel}>Symptom Overview</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionCard}>
              <View style={styles.optionIcon}>
                <Ionicons name="medkit-outline" size={24} color="#4299E1" />
              </View>
              <Text style={styles.optionLabel}>Management & Treatment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionCard}
              onPress={() => router.push({
                pathname: '/symptoms/pharmacy',
              })}
            >
              <View style={styles.optionIcon}>
                <Ionicons name="medical-outline" size={24} color="#4299E1" />
              </View>
              <Text style={styles.optionLabel}>Find Pharmacy</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionCard}
              onPress={() => router.push({
                pathname: '/symptoms/hospital',
              })}
            >
              <View style={styles.optionIcon}>
                <Ionicons name="business-outline" size={24} color="#4299E1" />
              </View>
              <Text style={styles.optionLabel}>Find Hospital</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '48%',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
}); 