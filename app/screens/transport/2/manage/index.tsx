import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useTranslation } from '../../../../_context/TranslationContext';
import { useRouter } from 'expo-router';

type PaymentOption = {
  id: string;
  title: string;
  desc?: string;
  icon: string;
  url?: string;
};

const paymentOptions: PaymentOption[] = [
  {
    id: '1',
    title: 'Activate your new Opal card',
    desc: 'Get started with your new Opal card',
    icon: 'play-circle-outline',
    url: 'https://transportnsw.info/tickets-fares/opal/manage-your-card/activate-opal-card',
  },
  {
    id: '2',
    title: 'Register your Opal card',
    desc: 'Protect your balance and get additional benefits',
    icon: 'person-add',
    url: 'https://transportnsw.info/tickets-fares/opal/manage-your-card/register-your-opal-card',
  },
  {
    id: '3',
    title: 'Top up your Opal card',
    desc: 'Add value or set up auto top up',
    icon: 'account-balance-wallet',
    url: 'https://transportnsw.info/tickets-fares/opal/top-up-your-opal-card',
  },
  {
    id: '4',
    title: 'Transport Connect',
    desc: 'Connect your payment card to travel',
    icon: 'contactless',
    url: 'https://transportnsw.info/tickets-fares/fares/transport-connect',
  },
  {
    id: '5',
    title: 'Check your Opal Card Balance',
    desc: 'View your current balance and transaction history',
    icon: 'account-balance',
    url: 'https://transportnsw.info/tickets-fares/opal-login#/login',
  },
  {
    id: '6',
    title: 'Transfer balance and block card',
    desc: 'Transfer balance to a new card or block a lost card',
    icon: 'swap-horiz',
    url: 'https://transportnsw.info/tickets-fares/opal/manage-your-card/transfer-balance-block-card',
  },
  {
    id: '7',
    title: 'Opal refunds and fare adjustments',
    desc: 'Request refunds or fare adjustments',
    icon: 'receipt-long',
    url: 'https://transportnsw.info/tickets-fares/opal/manage-your-card/opal-refunds-fare-adjustments',
  },
];

export default function ManagePayments() {
  const { selectedLanguage, translateAll, registerText, translatedTexts } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 번역할 텍스트 등록
    registerText("Download the Opal Travel app");
    paymentOptions.forEach(option => {
      registerText(option.title);
      registerText(option.desc || '');
    });
  }, []);

  useEffect(() => {
    translateAll(selectedLanguage);
  }, [selectedLanguage]);

  const handleOptionPress = (option: PaymentOption) => {
    if (option.url) {
      router.push({pathname: '/_components/WebTranslate', params: {url: option.url}});
    } else {
      setSelectedOption(prev => prev === option.id ? null : option.id);
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: translatedTexts["Manage your payments"] || "Manage your payments",
          headerBackTitle: 'Back',
          headerShown: true
        }} 
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            {/* Download App Buttons */}
            <View style={styles.downloadSection}>
              <Text style={styles.downloadTitle}>
                {translatedTexts["Download the Opal Travel app"] || "Download the Opal Travel app"}
              </Text>
              <View style={styles.downloadContainer}>
                <TouchableOpacity
                  onPress={() => router.push({pathname: '/_components/WebTranslate', params: {url: 'https://apps.apple.com/au/app/opal-travel/id941006607'}})}
                  style={styles.textStoreButton}
                >
                  <Image
                    source={require('../../../../assets/images/appstore.jpg')}
                    style={styles.fullImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push({pathname: '/_components/WebTranslate', params: {url: 'https://play.google.com/store/apps/details?id=au.com.opal.travel&hl=en&pli=1'}})}
                  style={styles.textStoreButton}
                >
                  <Image
                    source={require('../../../../assets/images/googleplay.jpg')}
                    style={styles.fullImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Payment Options */}
            {paymentOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  selectedOption === option.id && styles.selectedCard
                ]}
                onPress={() => handleOptionPress(option)}
              >
                <View style={styles.optionHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={option.icon as any} size={30} color="#222" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.optionTitle}>
                      {translatedTexts[option.title] || option.title}
                    </Text>
                    {option.desc && (
                      <Text style={styles.optionDesc}>
                        {translatedTexts[option.desc] || option.desc}
                      </Text>
                    )}
                  </View>
                  {!option.url && (
                    <MaterialIcons 
                      name={selectedOption === option.id ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                      size={24} 
                      color="#666" 
                    />
                  )}
                  {option.url && (
                    <MaterialIcons 
                      name="open-in-new" 
                      size={20} 
                      color="#1976D2" 
                    />
                  )}
                </View>
                {selectedOption === option.id && !option.url && (
                  <View style={styles.optionContent}>
                  </View>
                )}
              </TouchableOpacity>
            ))}
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
  },
  downloadSection: {
    marginBottom: 5,
  },
  downloadTitle: {
    fontSize: 18,
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
    marginBottom: 12,
    paddingHorizontal: 0,
  },
  textStoreButton: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  fullImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  selectedCard: {
    borderWidth: 1,
    borderColor: '#1976D2',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 4,
  },
  optionDesc: {
    fontSize: 14,
    color: '#666',
  },
  optionContent: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
}); 