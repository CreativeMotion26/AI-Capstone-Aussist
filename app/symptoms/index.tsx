import React, { useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TText from '../components/TText';

const symptoms = [
  'Symptom 1',
  'Symptom 2',
  'Symptom 3',
  'Symptom 4',
  'Symptom 5',
  'Symptom 6',
  'Symptom 7',
  'Symptom 8',
  'Symptom 9',
  'Symptom 10',
];

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const goToResult = () => {
    if (selectedSymptoms.length > 0) {
      router.push({
        pathname: '/symptoms/result',
      });
    }
  };

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Please select your current symptoms"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Emergency Call Section */}
      <View style={styles.emergencyCard}>
        <TText style={styles.emergencyTitle}>Emergency Call</TText>
        <TText style={styles.emergencyDescription}>
          For immediate assistance in an emergency, please use the numbers below:
        </TText>
        <TText style={styles.emergencySubtitle}>Fire: 000</TText>
        <TText style={styles.emergencySubtitle}>Ambulance: 000</TText>
        <TText style={styles.emergencySubtitle}>Police: 000</TText>
        <TText style={styles.emergencyNote}>
          In a critical situation, these contacts provide the quickest route to safety and emergency services. Ensure your phone is location-enabled to allow for swift assistance.
        </TText>
      </View>

      {/* Symptoms List */}
      <ScrollView style={styles.symptomsContainer}>
        {symptoms
          .filter(symptom => symptom.toLowerCase().includes(searchText.toLowerCase()))
          .map((symptom, index) => (
            <TouchableOpacity
              key={index}
              style={styles.symptomItem}
              onPress={() => toggleSymptom(symptom)}
            >
              <TText style={styles.symptomText}>{symptom}</TText>
              <View style={[
                styles.checkCircle,
                selectedSymptoms.includes(symptom) && styles.checkCircleSelected
              ]}>
                {selectedSymptoms.includes(symptom) && (
                  <View style={styles.checkInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* Result Button */}
      <TouchableOpacity 
        style={[
          styles.resultButton,
          selectedSymptoms.length === 0 && styles.resultButtonDisabled
        ]}
        onPress={goToResult}
        disabled={selectedSymptoms.length === 0}
      >
        <TText style={styles.resultButtonText}>Go to Result</TText>
      </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 8,
    paddingLeft: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  emergencyCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#90CAF9',
    borderRadius: 12,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  emergencyDescription: {
    fontSize: 14,
    color: 'white',
    marginBottom: 12,
  },
  emergencySubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  emergencyNote: {
    fontSize: 13,
    color: 'white',
    marginTop: 8,
  },
  symptomsContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  symptomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  symptomText: {
    fontSize: 16,
    color: '#333',
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleSelected: {
    borderColor: '#4CAF50',
  },
  checkInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  resultButton: {
    margin: 16,
    padding: 14,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
  },
  resultButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  resultButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
}); 