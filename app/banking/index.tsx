import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

type BankOption = {
  id: string;
  name: string;
  image: any;
  features: string[];
  url: string;
};

const bankOptions: BankOption[] = [
  {
    id: '1',
    name: 'Commonwealth',
    image: require('../assets/images/comm.jpg'),
    features: [
      'No monthly account fees for the first 12 months',
      'Free international money transfers',
      'Multilingual support available',
      'Digital banking in multiple languages'
    ],
    url: 'https://www.commbank.com.au/moving-to-australia.html?ei=stage_MoveToAus'
  },
  {
    id: '2',
    name: 'Westpac',
    image: require('../assets/images/west.jpg'),
    features: [
      'No monthly account fees for the first year',
      'Free ATM withdrawals',
      'International transfer fee waiver',
      'Language help and translation services'
    ],
    url: 'https://www.westpac.com.au/personal-banking/bank-accounts/transaction/new-arrivals/'
  },
  {
    id: '3',
    name: 'NAB',
    image: require('../assets/images/nab.jpg'),
    features: [
      'No monthly account fees',
      'Free ATM withdrawals',
      'International money transfer services',
      'Multilingual customer support'
    ],
    url: 'https://www.nab.com.au/personal/bank-accounts'
  },
  {
    id: '4',
    name: 'ANZ',
    image: require('../assets/images/anz.jpg'),
    features: [
      'No monthly account fees for migrants',
      'Free international money transfers',
      'Multilingual banking support',
      'Digital banking in multiple languages'
    ],
    url: 'https://www.anz.com.au/personal/bank-accounts/everyday-accounts/migrant-banking/'
  },
];

export default function BankingScreen() {
  const [expandedBanks, setExpandedBanks] = useState<string[]>([]);

  const toggleBank = (bankId: string) => {
    setExpandedBanks(prev => 
      prev.includes(bankId) 
        ? prev.filter(id => id !== bankId)
        : [...prev, bankId]
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Banking & Finance',
          headerBackTitle: 'Back'
        }} 
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Open Bank Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Open your Bank Account</Text>
            <Text style={styles.sectionDesc}>Choose from Australia's major banks</Text>
            
            {bankOptions.map((bank) => (
              <TouchableOpacity
                key={bank.id}
                style={styles.bankCard}
                onPress={() => toggleBank(bank.id)}
              >
                <View style={styles.bankHeader}>
                  <View style={styles.iconContainer}>
                    <Image source={bank.image} style={styles.bankImage} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.bankName}>{bank.name}</Text>
                  </View>
                  <MaterialIcons 
                    name={expandedBanks.includes(bank.id) ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                    size={24} 
                    color="#1976D2" 
                  />
                </View>
                {expandedBanks.includes(bank.id) && (
                  <View style={styles.expandedContent}>
                    {bank.features.map((feature, index) => (
                      <View key={index} style={styles.featureItem}>
                        <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                    <TouchableOpacity 
                      style={styles.learnMoreButton}
                      onPress={() => Linking.openURL(bank.url)}
                    >
                      <Text style={styles.learnMoreText}>Open your account with {bank.name}</Text>
                      <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
                    </TouchableOpacity>
                    <View style={styles.downloadSection}>
                      <View style={styles.downloadContainer}>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(
                            bank.id === '1' ? 'https://apps.apple.com/au/app/commbank/id310251202' :
                            bank.id === '2' ? 'https://apps.apple.com/au/app/westpac/id299111811' :
                            bank.id === '3' ? 'https://apps.apple.com/au/app/nab-mobile-banking/id373434223' :
                            'https://apps.apple.com/au/app/anz-australia/id870929663'
                          )}
                          style={styles.storeButton}
                        >
                          <Image
                            source={require('../assets/images/appstore.jpg')}
                            style={styles.storeImage}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(
                            bank.id === '1' ? 'https://play.google.com/store/apps/details?id=com.commbank.netbank' :
                            bank.id === '2' ? 'https://play.google.com/store/apps/details?id=org.westpac.bank&hl=en_AU' :
                            bank.id === '3' ? 'https://play.google.com/store/apps/details?id=au.com.nab.mobile&hl=en_AU' :
                            'https://play.google.com/store/apps/details?id=com.anz.android.gomoney&hl=en_AU'
                          )}
                          style={styles.storeButton}
                        >
                          <Image
                            source={require('../assets/images/googleplay.jpg')}
                            style={styles.storeImage}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Managing Finances Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Manage your Finances</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Online Banking Setup</Text>
              <Text style={styles.infoDesc}>Learn how to set up and use Internet Banking and Mobile Apps safely</Text>
              <Text style={styles.infoTitle}>International Money Transfer</Text>
              <Text style={styles.infoDesc}>Compare options and fees for sending money overseas</Text>
            </View>
          </View>

          {/* Saving and Budgeting Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saving and Budgeting</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Account Types</Text>
              <Text style={styles.infoDesc}>• Everyday Transaction Accounts{'\n'}• Savings Accounts{'\n'}• Term Deposits</Text>
            </View>
          </View>

          {/* Government Support Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Government Financial Support</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Centrelink Services</Text>
              <Text style={styles.infoDesc}>Find out about financial assistance available for eligible migrants</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 15,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  bankCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bankHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
  },
  bankImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 2,
  },
  expandedContent: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 8,
  },
  infoDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.6,
    borderColor: '#666',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  learnMoreText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
    marginRight: 8,
  },
  downloadSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  downloadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    marginBottom: 10,
  },
  downloadContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
    paddingHorizontal: 0,
  },
  storeButton: {
    flex: 1,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  storeImage: {
    width: '110%',
    height: '100%',
    borderRadius: 8,
  },
}); 