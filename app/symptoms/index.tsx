// app/symptoms/index.tsx

import React, { useState } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { symptoms } from '@/app/lib/DataProvider';
import TText from '../_components/TText';

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const insets = useSafeAreaInsets();

  // toggle a symptom in the selected list, but allow max 4 selections
  const toggleSymptom = (symptomCode: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptomCode)) {
        // if already selected, always allow deselect
        return prev.filter(c => c !== symptomCode);
      }
      // if not selected and already 4, ignore
      if (prev.length >= 4) {
        return prev;
      }
      // otherwise add
      return [...prev, symptomCode];
    });
  };

  // navigate to result page with selected codes
  const goToResult = () => {
    if (selectedSymptoms.length) {
      router.push({
        pathname: '/symptoms/result',
        params: { selected: selectedSymptoms.join(',') },
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
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
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Symptoms List */}
      <ScrollView style={styles.symptomsContainer}>
        {symptoms
          .filter(symptom =>
            symptom.english.toLowerCase().includes(searchText.toLowerCase())
          )
          .map(symptom => {
            const isSelected = selectedSymptoms.includes(symptom.code);
            const isDisabled = !isSelected && selectedSymptoms.length >= 4;
            return (
              <TouchableOpacity
                key={symptom.code}
                onPress={() => toggleSymptom(symptom.code)}
                disabled={isDisabled}
                style={[
                  styles.symptomItem,
                  isSelected && styles.symptomItemSelected,
                  isDisabled && styles.symptomItemDisabled
                ]}
              >
                <TText style={styles.symptomText}>{symptom.english}</TText>
                <View
                  style={[
                    styles.checkCircle,
                    isSelected && styles.checkCircleSelected,
                  ]}
                >
                  {isSelected && <View style={styles.checkInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>

      {/* Result Button */}
      <TouchableOpacity
        style={[
          styles.resultButton,
          selectedSymptoms.length === 0 && styles.resultButtonDisabled,
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
  container: { flex: 1, backgroundColor: 'white' },
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
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 40, fontSize: 16, color: '#333' },

  symptomsContainer: { flex: 1, marginHorizontal: 16 },
  symptomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  symptomItemSelected: {
    backgroundColor: '#E0F7FA', // highlight selected
  },
  symptomItemDisabled: {
    opacity: 0.5,             // dim disabled
  },
  symptomText: { fontSize: 16, color: '#333' },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleSelected: { borderColor: '#4CAF50' },
  checkInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#4CAF50' },

  resultButton: {
    margin: 16,
    padding: 14,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
  },
  resultButtonDisabled: { backgroundColor: '#9CA3AF' },
  resultButtonText: { fontSize: 16, fontWeight: '600', color: 'white' },
});
