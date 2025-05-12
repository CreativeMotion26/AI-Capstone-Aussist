import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, StatusBar } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../_lib/theme';
import TText from '../../_components/TText';
import { useTranslation } from '../../_context/TranslationContext';

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
    image: require('../../assets/images/comm.jpg'),
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
    image: require('../../assets/images/west.jpg'),
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
    image: require('../../assets/images/nab.jpg'),
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
    image: require('../../assets/images/anz.jpg'),
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
  const insets = useSafeAreaInsets();
  const [expandedBanks, setExpandedBanks] = useState<string[]>([]);
  const [expandedTips, setExpandedTips] = useState<string[]>([]);
  const { selectedLanguage, translateAll, registerText, translatedTexts } = useTranslation();

  const toggleBank = (bankId: string) => {
    setExpandedBanks(prev => 
      prev.includes(bankId) 
        ? prev.filter(id => id !== bankId)
        : [...prev, bankId]
    );
  };

  const toggleTips = (tipId: string) => {
    setExpandedTips(prev => 
      prev.includes(tipId) 
        ? prev.filter(id => id !== tipId)
        : [...prev, tipId]
    );
  };

  useEffect(() => {
    // 번역할 텍스트 등록
    registerText("Banking Services");
    registerText("Find the right bank for you");
    registerText("Compare banking services and find the best option for your needs");
    registerText("Open your Bank Account");
    registerText("Choose from Australia's major banks");
    registerText("Banking Tips");
    registerText("Essential tips for managing your finances");
    registerText("Essential Banking Tips");
    registerText("Budgeting Tips");
    registerText("Learn how to manage your money effectively");
    registerText("Smart Budgeting Strategies");
    registerText("About Financial Claims Scheme");
    registerText("National Debt Helpline");
    registerText("Centrelink - Financial Assistance");
    registerText("Learn more about FCS");
    registerText("Learn more about banking tips on moneysmart.gov.au");
    registerText("Learn more about budgeting tips on moneysmart.gov.au");
    registerText("Visit Centrelink");
    registerText("Call 1800 007 007");
    registerText("Open your account with");
    registerText("Always keep your bank details secure and never share your PIN or passwords");
    registerText("Set up online banking and mobile app for convenient access");
    registerText("Enable transaction notifications to monitor your account activity");
    registerText("Regularly check your account statements for any unauthorized transactions");
    registerText("Record your income and track all money coming in");
    registerText("List all your expenses including fixed costs and unexpected expenses");
    registerText("Set your spending limit and plan for your 'wants'");
    registerText("Create a savings goal and adjust your budget regularly");
    registerText("The Financial Claims Scheme (FCS) is an Australian Government initiative that may apply in the event of a financial institution becoming insolvent. The FCS can provide protection and quick access to deposits in banks, building societies and credit unions up to $250,000 per account holder per institution.");
    registerText("Free financial counseling service available to help you manage your debts and financial difficulties. They provide confidential advice and support.");
    registerText("Centrelink provides various financial support services for eligible individuals, including:");
    registerText("Raising kids");
    registerText("Living arrangements");
    registerText("Ageing");
    registerText("Work");
    registerText("Education");
    registerText("Health and disability");

    bankOptions.forEach(option => {
      // 은행 이름은 번역하지 않음
      option.features.forEach(feature => registerText(feature));
    });
  }, []);

  useEffect(() => {
    translateAll(selectedLanguage);
  }, [selectedLanguage]);

  const handleCardPress = (optionId: string) => {
    const option = bankOptions.find(opt => opt.id === optionId);
    if (option?.url) {
      router.push({
        pathname: '/_components/WebTranslate',
        params: { url: option.url }
      });
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: translatedTexts["Banking Services"] || "Banking Services",
          headerBackTitle: 'Back'
        }} 
      />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
            {translatedTexts["Find the right bank for you"] || "Find the right bank for you"}
          </Text>
          <TText style={{ fontSize: 16, color: 'white' }}>
            {translatedTexts["Compare banking services and find the best option for your needs"] || "Compare banking services and find the best option for your needs"}
          </TText>
        </View>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Open Bank Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translatedTexts["Open your Bank Account"] || "Open your Bank Account"}</Text>
            <Text style={styles.sectionDesc}>{translatedTexts["Choose from Australia's major banks"] || "Choose from Australia's major banks"}</Text>
            
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
                        <Text style={styles.featureText}>{translatedTexts[feature] || feature}</Text>
                      </View>
                    ))}
                    <TouchableOpacity 
                      style={styles.learnMoreButton}
                      onPress={() => handleCardPress(bank.id)}
                    >
                      <Text style={styles.learnMoreText}>{translatedTexts["Open your account with"] || "Open your account with"} {bank.name}</Text>
                      <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
                    </TouchableOpacity>
                    <View style={styles.downloadSection}>
                      <View style={styles.downloadContainer}>
                        <TouchableOpacity
                          onPress={() => handleCardPress(bank.id)}
                          style={styles.storeButton}
                        >
                          <Image
                            source={require('../../assets/images/appstore.jpg')}
                            style={styles.storeImage}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleCardPress(bank.id)}
                          style={styles.storeButton}
                        >
                          <Image
                            source={require('../../assets/images/googleplay.jpg')}
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

            {/* Banking Tips Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translatedTexts["Banking Tips"] || "Banking Tips"}</Text>
            <Text style={styles.sectionDesc}>{translatedTexts["Essential tips for managing your finances"] || "Essential tips for managing your finances"}</Text>
            
            <TouchableOpacity
              style={styles.tipCard}
              onPress={() => toggleTips('banking')}
            >
              <View style={styles.tipHeader}>
                <View style={styles.textContainer}>
                  <Text style={styles.tipTitle}>{translatedTexts["Essential Banking Tips"] || "Essential Banking Tips"}</Text>
                </View>
                <MaterialIcons 
                  name={expandedTips.includes('banking') ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                  size={24} 
                  color="#1976D2" 
                />
              </View>
              {expandedTips.includes('banking') && (
                <View style={styles.expandedContent}>
                  <View style={styles.featureItem}>
                    <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                    <Text style={styles.featureText}>{translatedTexts["Always keep your bank details secure and never share your PIN or passwords"] || "Always keep your bank details secure and never share your PIN or passwords"}</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                    <Text style={styles.featureText}>{translatedTexts["Set up online banking and mobile app for convenient access"] || "Set up online banking and mobile app for convenient access"}</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                    <Text style={styles.featureText}>{translatedTexts["Enable transaction notifications to monitor your account activity"] || "Enable transaction notifications to monitor your account activity"}</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                    <Text style={styles.featureText}>{translatedTexts["Regularly check your account statements for any unauthorized transactions"] || "Regularly check your account statements for any unauthorized transactions"}</Text>
                  </View>
                  <View style={styles.linkContainer}>
                    <TouchableOpacity 
                      style={styles.learnMoreButton}
                      onPress={() => router.push({
                        pathname: '/_components/WebTranslate',
                        params: { url: 'https://moneysmart.gov.au/banking' }
                      })}
                    >
                      <Text style={styles.learnMoreText}>{translatedTexts["Learn more about banking tips on moneysmart.gov.au"] || "Learn more about banking tips on moneysmart.gov.au"}</Text>
                      <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>

            {/* Budgeting Tips Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{translatedTexts["Budgeting Tips"] || "Budgeting Tips"}</Text>
              <Text style={styles.sectionDesc}>{translatedTexts["Learn how to manage your money effectively"] || "Learn how to manage your money effectively"}</Text>
              
              <TouchableOpacity
                style={styles.tipCard}
                onPress={() => toggleTips('budgeting')}
              >
                <View style={styles.tipHeader}>
                  <View style={styles.textContainer}>
                    <Text style={styles.tipTitle}>{translatedTexts["Smart Budgeting Strategies"] || "Smart Budgeting Strategies"}</Text>
                  </View>
                  <MaterialIcons 
                    name={expandedTips.includes('budgeting') ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                    size={24} 
                    color="#1976D2" 
                  />
                </View>
                {expandedTips.includes('budgeting') && (
                  <View style={styles.expandedContent}>
                    <View style={styles.featureItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>{translatedTexts["Record your income and track all money coming in"] || "Record your income and track all money coming in"}</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>{translatedTexts["List all your expenses including fixed costs and unexpected expenses"] || "List all your expenses including fixed costs and unexpected expenses"}</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>{translatedTexts["Set your spending limit and plan for your 'wants'"] || "Set your spending limit and plan for your 'wants'"}</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>{translatedTexts["Create a savings goal and adjust your budget regularly"] || "Create a savings goal and adjust your budget regularly"}</Text>
                    </View>
                    <View style={styles.linkContainer}>
                      <TouchableOpacity 
                        style={styles.learnMoreButton}
                        onPress={() => router.push({
                          pathname: '/_components/WebTranslate',
                          params: { url: 'https://moneysmart.gov.au/budgeting/how-to-do-a-budget' }
                        })}
                      >
                        <Text style={styles.learnMoreText}>{translatedTexts["Learn more about budgeting tips on moneysmart.gov.au"] || "Learn more about budgeting tips on moneysmart.gov.au"}</Text>
                        <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
                      </TouchableOpacity>
                    </View>
            </View>
                )}
              </TouchableOpacity>
          </View>

            {/* Financial Claims Scheme Section */}
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>{translatedTexts["About Financial Claims Scheme"] || "About Financial Claims Scheme"}</Text>
            <View style={styles.infoCard}>
                <Text style={styles.infoText}>
                  {translatedTexts["The Financial Claims Scheme (FCS) is an Australian Government initiative that may apply in the event of a financial institution becoming insolvent. The FCS can provide protection and quick access to deposits in banks, building societies and credit unions up to $250,000 per account holder per institution."] || 
                   "The Financial Claims Scheme (FCS) is an Australian Government initiative that may apply in the event of a financial institution becoming insolvent. The FCS can provide protection and quick access to deposits in banks, building societies and credit unions up to $250,000 per account holder per institution."}
                </Text>
                <TouchableOpacity 
                  style={styles.learnMoreButton}
                  onPress={() => router.push({
                    pathname: '/_components/WebTranslate',
                    params: { url: 'https://www.fcs.gov.au/' }
                  })}
                >
                  <Text style={styles.learnMoreText}>{translatedTexts["Learn more about FCS"] || "Learn more about FCS"}</Text>
                  <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
                </TouchableOpacity>
              </View>
            </View>

            {/* National Debt Helpline Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{translatedTexts["National Debt Helpline"] || "National Debt Helpline"}</Text>
              <View style={styles.infoCard}>
                <Text style={styles.infoText}>
                  {translatedTexts["Free financial counseling service available to help you manage your debts and financial difficulties. They provide confidential advice and support."] || 
                   "Free financial counseling service available to help you manage your debts and financial difficulties. They provide confidential advice and support."}
                </Text>
                <TouchableOpacity 
                  style={styles.learnMoreButton}
                  onPress={() => Linking.openURL('tel:1800007007')}
                >
                  <Text style={styles.learnMoreText}>{translatedTexts["Call 1800 007 007"] || "Call 1800 007 007"}</Text>
                  <MaterialIcons name="phone" size={20} color="#1976D2" />
                </TouchableOpacity>
            </View>
          </View>

            {/* Centrelink Section */}
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>{translatedTexts["Centrelink - Financial Assistance"] || "Centrelink - Financial Assistance"}</Text>
            <View style={styles.infoCard}>
                <Text style={styles.infoText}>
                  {translatedTexts["Centrelink provides various financial support services for eligible individuals, including:"] || 
                   "Centrelink provides various financial support services for eligible individuals, including:"}
                </Text>
                <View style={styles.featureItem}>
                  <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                  <Text style={styles.featureText}>{translatedTexts["Raising kids"] || "Raising kids"}</Text>
                </View>
                <View style={styles.featureItem}>
                  <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                  <Text style={styles.featureText}>{translatedTexts["Living arrangements"] || "Living arrangements"}</Text>
                </View>
                <View style={styles.featureItem}>
                  <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                  <Text style={styles.featureText}>{translatedTexts["Ageing"] || "Ageing"}</Text>
                </View>
                <View style={styles.featureItem}>
                  <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                  <Text style={styles.featureText}>{translatedTexts["Work"] || "Work"}</Text>
                </View>
                <View style={styles.featureItem}>
                  <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                  <Text style={styles.featureText}>{translatedTexts["Education"] || "Education"}</Text>
                </View>
                <View style={styles.featureItem}>
                  <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                  <Text style={styles.featureText}>{translatedTexts["Health and disability"] || "Health and disability"}</Text>
                </View>
                <View style={styles.linkContainer}>
                  <TouchableOpacity 
                    style={styles.learnMoreButton}
                    onPress={() => router.push({
                      pathname: '/_components/WebTranslate',
                      params: { url: 'https://www.servicesaustralia.gov.au/' }
                    })}
                  >
                    <Text style={styles.learnMoreText}>{translatedTexts["Visit Centrelink"] || "Visit Centrelink"}</Text>
                    <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        </View>
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
    marginBottom: 4,
  },
  sectionDesc: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
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
    fontWeight: '600',
    color: '#222',
  },
  expandedContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#444',
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    width: '100%',
  },
  learnMoreText: {
    color: '#1976D2',
    fontWeight: '500',
    marginRight: 8,
    textAlign: 'center',
    flex: 1,
  },
  downloadSection: {
    marginTop: 16,
  },
  downloadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storeButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#000',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeImage: {
    width: '100%',
    height: 40,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 16,
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
}); 