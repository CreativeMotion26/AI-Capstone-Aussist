import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useTranslation } from '../../../_context/TranslationContext';

const ticketOptions = [
  {
    id: '1',
    title: 'Ways to Pay',
    desc: 'Choose from Opal, contactless, or cash payment methods.',
    icon: 'credit-card',
    color: '#03A9F4',
    subTabs: [
      {
        id: '1',
        title: 'Opal',
        desc: 'Opal cards are smartcard tickets that can be used to pay for travel. If you hold a Concession, Child/Youth or Gold Senior/Pensioner Opal card, you will pay reduced fares.',
        button: {
          title: 'Learn more about Opal',
          url: 'https://transportnsw.info/tickets-fares/opal'
        }
      },
      {
        id: '2',
        title: 'Contactless',
        desc: 'You can pay for your fare by using your credit/debit card with the contactless symbol or a digital wallet, such as Apple Pay, Google Pay, or Samsung Pay.',
        button: {
          title: 'Learn more about Contactless pay',
          url: 'https://transportnsw.info/tickets-fares/contactless-payments'
        }
      },
      {
        id: '3',
        title: 'Opal Single Tickets',
        desc: 'If you don\'t have an Opal card or contactless payment option, you must purchase an Opal single trip ticket to travel. Opal single tickets are only available for metro, train, ferry and light rail.',
        button: {
          title: 'Learn more about Single Tickets',
          url: 'https://transportnsw.info/tickets-fares/fares/opal-single-tickets'
        }
      }
    ]
  },
  {
    id: '2',
    title: 'Fares',
    desc: 'Check fare prices and daily caps for your trip.',
    icon: 'attach-money',
    color: '#4CAF50'
  },
  {
    id: '3',
    title: 'Manage your payments',
    desc: 'Top up, view history, and manage your account.',
    icon: 'settings',
    color: '#FF9800'
  }
];

export default function TicketsAndFares() {
  const { selectedLanguage, translateAll, registerText, translatedTexts } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState('1');

  useEffect(() => {
    // 번역할 텍스트 등록
    registerText("Tickets and Fares");
    registerText("How to pay for your travel");
    ticketOptions.forEach(option => {
      registerText(option.title);
      registerText(option.desc);
      if (option.subTabs) {
        option.subTabs.forEach(tab => {
          registerText(tab.title);
          registerText(tab.desc);
          if (tab.button) {
            registerText(tab.button.title);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    translateAll(selectedLanguage);
  }, [selectedLanguage]);

  const handleLearnMore = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: translatedTexts["Tickets and Fares"] || "Tickets and Fares",
          headerBackTitle: 'Back',
          headerShown: false
        }} 
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {translatedTexts["Tickets and Fares"] || "Tickets and Fares"}
            </Text>
            <Text style={styles.headerSubtitle}>
              {translatedTexts["How to pay for your travel"] || "How to pay for your travel"}
            </Text>
          </View>
          <View style={styles.servicesContainer}>
            {/* Ways to Pay 카드 */}
            <View style={styles.cardContainer}>
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => setExpanded(!expanded)}
                activeOpacity={0.8}
              >
                <View style={styles.iconContainer}>
                  <MaterialIcons name={ticketOptions[0].icon as any} size={24} color="#000" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.serviceTitle}>
                    {translatedTexts[ticketOptions[0].title] || ticketOptions[0].title}
                  </Text>
                  <Text style={styles.serviceDesc}>
                    {translatedTexts[ticketOptions[0].desc] || ticketOptions[0].desc}
                  </Text>
                </View>
                <MaterialIcons
                  name={expanded ? 'expand-less' : 'expand-more'}
                  size={28}
                  color="#1976D2"
                  style={{ marginLeft: 8 }}
                />
              </TouchableOpacity>
              {expanded && ticketOptions[0].subTabs && (
                <View style={styles.cardContent}>
                  <View style={styles.tabContainer}>
                    {ticketOptions[0].subTabs.map((tab) => (
                      <TouchableOpacity
                        key={tab.id}
                        style={[
                          styles.tabButton,
                          selectedTab === tab.id && styles.tabButtonActive,
                          tab.id === '1' && styles.tabButtonOpal,
                          tab.id === '2' && styles.tabButtonContactless,
                          tab.id === '3' && styles.tabButtonSingle
                        ]}
                        onPress={() => setSelectedTab(tab.id)}
                      >
                        <Text style={[styles.tabText, selectedTab === tab.id && styles.tabTextActive]}>
                          {translatedTexts[tab.title] || tab.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.tabContent}>
                    <Text style={styles.tabDescription}>
                      {translatedTexts[ticketOptions[0].subTabs.find(tab => tab.id === selectedTab)?.desc || ''] ||
                       ticketOptions[0].subTabs.find(tab => tab.id === selectedTab)?.desc}
                    </Text>
                    {ticketOptions[0].subTabs.find(tab => tab.id === selectedTab)?.button && (
                      <TouchableOpacity
                        style={styles.learnMoreButton}
                        onPress={() => handleLearnMore(ticketOptions[0].subTabs.find(tab => tab.id === selectedTab)?.button?.url || '')}
                      >
                        <Text style={styles.learnMoreText}>
                          {translatedTexts[ticketOptions[0].subTabs.find(tab => tab.id === selectedTab)?.button?.title || ''] ||
                           ticketOptions[0].subTabs.find(tab => tab.id === selectedTab)?.button?.title}
                        </Text>
                        <MaterialIcons name="open-in-new" size={16} color="#1976D2" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            </View>
            {/* 나머지 카드 */}
            {ticketOptions.slice(1).map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.cardContainer}
                onPress={() => {
                  if (option.id === '2') {
                    router.push('/screens/transport/2/fares' as any);
                  } else if (option.id === '3') {
                    router.push('/screens/transport/2/manage' as any);
                  }
                }}
              >
                <View style={styles.cardHeader}> 
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={option.icon as any} size={24} color="#000" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.serviceTitle}>
                      {translatedTexts[option.title] || option.title}
                    </Text>
                    <Text style={styles.serviceDesc}>
                      {translatedTexts[option.desc] || option.desc}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#1976D2" />
                </View>
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
  header: {
    padding: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  servicesContainer: {
    padding: 15,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  cardContent: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  serviceDesc: {
    fontSize: 14,
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 1,
    borderRadius: 6,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  tabButtonOpal: {
    width: 65,
  },
  tabButtonContactless: {
    width: 115,
  },
  tabButtonSingle: {
    width: 170,
  },
  tabButtonActive: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1976D2',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#1976D2',
  },
  tabContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
  },
  tabDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#666',
  },
  learnMoreText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 5,
  },
}); 