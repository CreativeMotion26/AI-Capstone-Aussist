// app/symptoms/result.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from '@/app/context/TranslationContext';
import { conditionsMappings } from '@/app/lib/DataProvider';
import rawConditions from '@/assets/data/Conditions.json';
import TText from '../_components/TText';
// Define the shape of each condition detail entry
interface ConditionDetail {
  ConditionID: string;
  ConditionName: string;
  ShortSummary: string;
  SymptomIDs: string[];
  Link: string;
}

// Cast imported JSON into typed object
const Conditions: Record<string, ConditionDetail> = rawConditions as any;

// Build lookup map from condition name to its detail entry
const conditionNameToDetail: Record<string, ConditionDetail> = {};
Object.values(Conditions).forEach((detail) => {
  conditionNameToDetail[detail.ConditionName] = detail;
});

export default function SymptomResult() {
  // Get selected symptom codes from query params
  const { selected } = useLocalSearchParams<{ selected: string }>();
  // Pull out translation utilities and current language
  //const { registerText, translatedTexts, selectedLanguage } = useTranslation();
  //const t = (key: string) => translatedTexts[key] || key;

  // URL to redirect to when a condition is tapped
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // Register static text for translation
  // useEffect(() => {
  //   registerText('Possible Conditions');
  //   registerText('Common Conditions');
  //   registerText('Redirecting to external site...');
  // }, []);

  // Handle external redirect after a short delay
  useEffect(() => {
    if (redirectUrl) {
      const timer = setTimeout(() => {
        Linking.openURL(redirectUrl);
        setRedirectUrl(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [redirectUrl]);

  // If a redirectUrl is set, show the interstitial screen
  if (redirectUrl) {
    return (
      <SafeAreaView style={styles.redirectContainer}>
        <TText style={styles.redirectText}>
          {('Redirecting to external site...')}
        </TText>
      </SafeAreaView>
    );
  }

  // Split the comma-separated symptom codes
  const symptomCodes = selected ? selected.split(',') : [];

  // Build a flat list of all condition names for frequency analysis
  const allConditionNames = symptomCodes.flatMap((symCode) => {
    const mapping = conditionsMappings.find((m) => m.code === symCode);
    return mapping ? mapping.english : [];
  });

  // Count how many times each condition appears
  const freqMap: Record<string, number> = {};
  allConditionNames.forEach((name) => {
    freqMap[name] = (freqMap[name] || 0) + 1;
  });

  // Extract overlapping conditions (freq >= 2), sort by descending frequency
  const overlappingConditions = Object.entries(freqMap)
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => conditionNameToDetail[name])
    .filter(Boolean);

  // Helper to build translated proxy URL via domain.translate.goog
  const makeTranslatedUrl = (originalLink: string) => {
    // strip protocol and split host/path
    const withoutProto = originalLink.replace(/^https?:\/\//, '');
    const [host, ...pathParts] = withoutProto.split('/');
    // convert dots to hyphens for proxy host
    const hyphenHost = host.split('.').join('-');
    // reassemble with translate.goog and attach query params
    const path = pathParts.join('/');
    return `https://${hyphenHost}.translate.goog/${path}?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Page title */}
      <TText style={styles.title}>{('Possible Conditions')}</TText>

      <ScrollView style={styles.scrollView}>  
        {/* Top section: common overlapping conditions */}
        {overlappingConditions.length > 0 && (
          <View style={styles.section}>
            <TText style={styles.sectionTitle}>{('Common Conditions')}</TText>
            {overlappingConditions.map((detail) => {
              const count = freqMap[detail.ConditionName] || 0;
              // Determine frequency-based style override
              let freqStyle = {};
              if (count >= 4) freqStyle = styles.freq4Card;
              else if (count === 3) freqStyle = styles.freq3Card;
              else if (count === 2) freqStyle = styles.freq2Card;

              return (
                <TouchableOpacity
                  key={detail.ConditionID}
                  style={[styles.card, freqStyle]}
                  onPress={() => setRedirectUrl(makeTranslatedUrl(detail.Link))}
                >
                  <TText style={styles.conditionName}>
                    {(detail.ConditionName)}
                  </TText>
                  <TText style={styles.conditionSummary}>
                    {(detail.ShortSummary)}
                  </TText>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Per-symptom sections: only unique conditions (freq === 1) */}
        {symptomCodes.map((symCode) => {
          const mapping = conditionsMappings.find((m) => m.code === symCode);
          if (!mapping) return null;

          // Filter out overlapping ones
          const uniqueConditions = mapping.english.filter(
            (name) => (freqMap[name] || 0) === 1
          );

          if (uniqueConditions.length === 0) return null;

          return (
            <View key={symCode} style={styles.section}>
              {/* Symptom header */}
              <TText style={styles.sectionTitle}>{(mapping.symptom)}</TText>

              {/* Unique conditions list */}
              {uniqueConditions.map((name) => {
                const detail = conditionNameToDetail[name];
                if (!detail) return null;
                return (
                  <TouchableOpacity
                    key={detail.ConditionID}
                    style={styles.card}
                    onPress={() => setRedirectUrl(makeTranslatedUrl(detail.Link))}
                  >
                    <TText style={styles.conditionName}>
                      {(detail.ConditionName)}
                    </TText>
                    <TText style={styles.conditionSummary}>
                      {(detail.ShortSummary)}
                    </TText>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container for main screen
  container: { flex: 1, backgroundColor: 'white' },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 16,
  },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },

  // Default card style (green for unique/freq===1)
  card: {
    padding: 16,
    backgroundColor: '#E8F5E9',    // light green
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',        // green
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  conditionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  conditionSummary: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  // Frequency-based overrides
  freq2Card: {
    backgroundColor: '#E3F2FD', // blue for freq === 2
    borderColor: '#2196F3',
  },
  freq3Card: {
    backgroundColor: '#FFF3E0', // orange for freq === 3
    borderColor: '#FF9800',
  },
  freq4Card: {
    backgroundColor: '#FFEBEE', // red for freq >= 4
    borderColor: '#F44336',
  },

  // Interstitial redirect screen
  redirectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  redirectText: {
    fontSize: 16,
    color: '#333',
  },
});
