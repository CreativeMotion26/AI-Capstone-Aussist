// app/symptoms/detail.tsx

import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from '@/app/context/TranslationContext';
import rawConditions from '@/assets/data/Conditions.json'; // import Conditions.json

// Define the shape of each entry in the conditions JSON
interface ConditionDetail {
  ConditionID: string;
  ConditionName: string;
  ShortSummary: string;
  SymptomIDs: string[];
  Link: string;
}

// Cast the imported JSON so we can index by detail entries
const Conditions: Record<string, ConditionDetail> = rawConditions as any;

// Build lookup map from condition name to its detail object
const detailByName: Record<string, ConditionDetail> = {};
Object.values(Conditions).forEach(detail => {
  detailByName[detail.ConditionName] = detail;
});

export default function ConditionDetail() {
  // Read the "condition" param from the URL: ?condition=Asthma (the name)
  const { condition } = useLocalSearchParams<{ condition: string }>();
  const router = useRouter();
  const { registerText, translatedTexts } = useTranslation();
  const t = (key: string) => translatedTexts[key] || key;

  // Lookup the detail entry by condition name
  const detailEntry = condition ? detailByName[condition] : undefined;

  // Register all strings for translation on mount
  useEffect(() => {
    registerText('Back');
    registerText('Overview');
    if (detailEntry) {
      registerText(detailEntry.ConditionName);
      registerText(detailEntry.ShortSummary);
    } else {
      registerText('Condition not found');
    }
  }, []);

  // If we don't find the condition, show an error
  if (!detailEntry) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{t('Condition not found')}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button and title */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {t(detailEntry.ConditionName)}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Overview section */}
        <Text style={styles.sectionTitle}>{t('Overview')}</Text>
        <Text style={styles.description}>
          {t(detailEntry.ShortSummary)}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  backButton: {
    padding: 4
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center'
  },
  contentContainer: {
    padding: 16
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563'
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    color: 'red'
  }
});
