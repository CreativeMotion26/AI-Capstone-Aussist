import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../_lib/theme';
import TText from '../../_components/TText';
import { useTranslation } from '../../_context/TranslationContext';

const legalServices = [
  {
    id: 'legal-1',
    name: 'Legal Aid NSW',
    desc: 'Free legal help for eligible people in NSW',
    url: 'https://www.legalaid.nsw.gov.au/',
    icon: 'menu-book',
  },
  {
    id: 'legal-2',
    name: 'RACS (Refugee Advice & Casework Service)',
    desc: 'Free legal advice for refugees and asylum seekers',
    url: 'https://www.racs.org.au/',
    icon: 'support-agent',
  },
];

const migrationSupport = [];

const victimSupport = [
  {
    id: 'victim-1',
    name: 'NSW Police',
    desc: 'Contact police in an emergency (000) or for non-urgent help (131 444)',
    url: 'https://www.police.nsw.gov.au/',
    icon: 'local-police',
  },
  {
    id: 'victim-2',
    name: 'Victims Services NSW',
    desc: 'Support for victims of crime',
    url: 'https://www.victimsservices.justice.nsw.gov.au/',
    icon: 'volunteer-activism',
  },
];

const legalHelp = [
  {
    id: '1',
    name: 'Immigration Advice and Rights Centre (IARC)',
    desc: 'Free legal advice and assistance for migrants experiencing vulnerability in NSW',
    url: 'https://iarc.org.au/',
    icon: 'gavel',
  },
  {
    id: 'migration-1',
    name: 'Registered Migration Agents',
    desc: 'Find a registered migration agent for visa advice',
    url: 'https://www.mara.gov.au/',
    icon: 'person-search',
  },
];

export default function LegalScreen() {
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
  const insets = useSafeAreaInsets();
  const [expandedOptions, setExpandedOptions] = useState<string[]>([]);
  const { selectedLanguage, translateAll, registerText, translatedTexts } = useTranslation();

  useEffect(() => {
    // 번역할 텍스트 등록
    registerText("Legal Services");
    registerText("Get legal help and support");
    registerText("Find legal services and resources for migrants");
    registerText("Legal Help for Migrants");
    registerText("Free legal services for migrants and refugees");
    registerText("Fairwork Ombudsman");
    registerText("Australia's workplace regulator");
    registerText("The Fairwork Ombudsman is Australia's workplace regulator. They help employees and employers understand their workplace rights and responsibilities.");
    registerText("Visit Fairwork Ombudsman");
    registerText("Visa and Immigration Support");
    registerText("Professional help with visa and immigration matters");
    registerText("Victim Support");
    registerText("Support services for victims of crime");
    registerText("Visit");
    registerText("Legal Aid NSW provides free legal services to disadvantaged people in NSW. They offer legal advice, representation, and community legal education. Services include family law, criminal law, civil law, and more.");
    registerText("RACS provides free legal advice and assistance to refugees and asylum seekers in Australia. They help with protection visa applications, family reunion, and other immigration matters.");
    registerText("The Office of the Migration Agents Registration Authority (OMARA) regulates migration agents in Australia. They maintain a register of qualified migration agents who can provide professional visa and migration advice.");
    registerText("NSW Police provides emergency assistance 24/7. Call 000 for life-threatening emergencies or 131 444 for non-urgent police assistance. They handle crime reporting, investigations, and community safety.");
    registerText("Victims Services NSW provides support and assistance to victims of violent crime in NSW. They offer counselling, financial assistance, and help with the justice system process.");
    registerText("Free legal advice and support services");
    registerText("Immigration Advice and Rights Centre (IARC)");
    registerText("Free legal advice and assistance for migrants experiencing vulnerability in NSW");
    registerText("IARC is a specialist community legal centre with over 35 years' experience in migration law. They provide free legal information, advice, and casework services to migrants experiencing vulnerability in NSW. Their services include immigration and domestic violence support, visa assistance, and community legal education.");

    legalServices.forEach(service => {
      registerText(service.name);
      registerText(service.desc);
    });
    migrationSupport.forEach(service => {
      registerText(service.name);
      registerText(service.desc);
    });
    victimSupport.forEach(service => {
      registerText(service.name);
      registerText(service.desc);
    });
    legalHelp.forEach(help => {
      registerText(help.name);
      registerText(help.desc);
    });
  }, []);

  useEffect(() => {
    translateAll(selectedLanguage);
  }, [selectedLanguage]);

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleCardPress = (optionId: string) => {
    const option = legalServices.find(opt => opt.id === optionId) || 
                  migrationSupport.find(opt => opt.id === optionId) || 
                  victimSupport.find(opt => opt.id === optionId) ||
                  (optionId === 'fairwork' ? {
                    id: 'fairwork',
                    name: 'Fairwork Ombudsman',
                    url: 'https://www.fairwork.gov.au/'
                  } : null);
    if (option?.url) {
      router.push({pathname: '/_components/WebTranslate', params: {url: option.url}});
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: translatedTexts["Legal Services"] || "Legal Services",
          headerBackTitle: 'Back'
        }} 
      />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
            {translatedTexts["Get legal help and support"] || "Get legal help and support"}
          </Text>
          <TText style={{ fontSize: 16, color: 'white' }}>
            {translatedTexts["Find legal services and resources for migrants"] || "Find legal services and resources for migrants"}
          </TText>
        </View>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Legal Help for Migrants */}
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>{translatedTexts["Legal Help for Migrants"] || "Legal Help for Migrants"}</Text>
              <Text style={styles.sectionDesc}>{translatedTexts["Free legal services for migrants and refugees"] || "Free legal services for migrants and refugees"}</Text>
            {legalServices.map(service => (
              <TouchableOpacity
                key={service.id}
                style={styles.card}
                  onPress={() => toggleCard(service.id)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                      <MaterialIcons name={service.icon as any} size={24} color="#0284C7" />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.siteName}>{translatedTexts[service.name] || service.name}</Text>
                      <Text style={styles.siteDesc}>{translatedTexts[service.desc] || service.desc}</Text>
                    </View>
                    <MaterialIcons 
                      name={expandedCards[service.id] ? 'expand-less' : 'expand-more'} 
                      size={24} 
                      color="#0284C7" 
                    />
                  </View>
                  {expandedCards[service.id] && (
                    <View style={styles.expandedContent}>
                      <Text style={styles.infoText}>
                        {service.id === 'legal-1' ? 
                          (translatedTexts["Legal Aid NSW provides free legal services to disadvantaged people in NSW. They offer legal advice, representation, and community legal education. Services include family law, criminal law, civil law, and more."] ||
                          "Legal Aid NSW provides free legal services to disadvantaged people in NSW. They offer legal advice, representation, and community legal education. Services include family law, criminal law, civil law, and more.") :
                          (translatedTexts["RACS provides free legal advice and assistance to refugees and asylum seekers in Australia. They help with protection visa applications, family reunion, and other immigration matters."] ||
                          "RACS provides free legal advice and assistance to refugees and asylum seekers in Australia. They help with protection visa applications, family reunion, and other immigration matters.")}
                      </Text>
                      <TouchableOpacity 
                        style={styles.learnMoreButton}
                        onPress={() => handleCardPress(service.id)}
                      >
                        <Text style={styles.learnMoreText}>{translatedTexts["Visit"] || "Visit"} {translatedTexts[service.name] || service.name}</Text>
                        <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
              {legalHelp.map(help => (
                <TouchableOpacity
                  key={help.id}
                  style={styles.card}
                  onPress={() => toggleCard(help.id)}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.iconContainer}>
                      <MaterialIcons name={help.icon as any} size={24} color="#0284C7" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.siteName}>{translatedTexts[help.name] || help.name}</Text>
                      <Text style={styles.siteDesc}>{translatedTexts[help.desc] || help.desc}</Text>
                    </View>
                    <MaterialIcons 
                      name={expandedCards[help.id] ? 'expand-less' : 'expand-more'} 
                      size={24} 
                      color="#0284C7" 
                    />
                  </View>
                  {expandedCards[help.id] && (
                    <View style={styles.expandedContent}>
                      <Text style={styles.infoText}>
                        {translatedTexts["IARC is a specialist community legal centre with over 35 years' experience in migration law. They provide free legal information, advice, and casework services to migrants experiencing vulnerability in NSW. Their services include immigration and domestic violence support, visa assistance, and community legal education."] ||
                         "IARC is a specialist community legal centre with over 35 years' experience in migration law. They provide free legal information, advice, and casework services to migrants experiencing vulnerability in NSW. Their services include immigration and domestic violence support, visa assistance, and community legal education."}
                      </Text>
                      <TouchableOpacity 
                        style={styles.learnMoreButton}
                        onPress={() => handleCardPress(help.id)}
                      >
                        <Text style={styles.learnMoreText}>{translatedTexts["Visit"] || "Visit"} {translatedTexts[help.name] || help.name}</Text>
                        <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
                      </TouchableOpacity>
                </View>
                  )}
              </TouchableOpacity>
            ))}
          </View>

            {/* Fairwork Ombudsman Section */}
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>{translatedTexts["Fairwork Ombudsman"] || "Fairwork Ombudsman"}</Text>
              <TouchableOpacity
                style={styles.card}
                onPress={() => toggleCard('fairwork')}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name="balance" size={24} color="#0284C7" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{translatedTexts["Fairwork Ombudsman"] || "Fairwork Ombudsman"}</Text>
                    <Text style={styles.siteDesc}>{translatedTexts["Australia's workplace regulator"] || "Australia's workplace regulator"}</Text>
                  </View>
                  <MaterialIcons 
                    name={expandedCards['fairwork'] ? 'expand-less' : 'expand-more'} 
                    size={24} 
                    color="#0284C7" 
                  />
                </View>
                {expandedCards['fairwork'] && (
                  <View style={styles.expandedContent}>
                    <Text style={styles.infoText}>
                      {translatedTexts["The Fairwork Ombudsman is Australia's workplace regulator. They help employees and employers understand their workplace rights and responsibilities."] ||
                       "The Fairwork Ombudsman is Australia's workplace regulator. They help employees and employers understand their workplace rights and responsibilities."}
                    </Text>
                    <TouchableOpacity 
                      style={styles.learnMoreButton}
                      onPress={() => handleCardPress('fairwork')}
                    >
                      <Text style={styles.learnMoreText}>{translatedTexts["Visit Fairwork Ombudsman"] || "Visit Fairwork Ombudsman"}</Text>
                      <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
          </View>

            {/* Visa and Immigration Support */}
            {/* Removed as per instructions */}

          {/* Victim Support */}
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>{translatedTexts["Victim Support"] || "Victim Support"}</Text>
              <Text style={styles.sectionDesc}>{translatedTexts["Support services for victims of crime"] || "Support services for victims of crime"}</Text>
            {victimSupport.map(service => (
              <TouchableOpacity
                key={service.id}
                style={styles.card}
                  onPress={() => toggleCard(service.id)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                      <MaterialIcons name={service.icon as any} size={24} color="#0284C7" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.siteName}>{translatedTexts[service.name] || service.name}</Text>
                      <Text style={styles.siteDesc}>{translatedTexts[service.desc] || service.desc}</Text>
                    </View>
                    <MaterialIcons 
                      name={expandedCards[service.id] ? 'expand-less' : 'expand-more'} 
                      size={24} 
                      color="#0284C7" 
                    />
                  </View>
                  {expandedCards[service.id] && (
                    <View style={styles.expandedContent}>
                      <Text style={styles.infoText}>
                        {service.id === 'victim-1' ? 
                          (translatedTexts["NSW Police provides emergency assistance 24/7. Call 000 for life-threatening emergencies or 131 444 for non-urgent police assistance. They handle crime reporting, investigations, and community safety."] ||
                          "NSW Police provides emergency assistance 24/7. Call 000 for life-threatening emergencies or 131 444 for non-urgent police assistance. They handle crime reporting, investigations, and community safety.") :
                          (translatedTexts["Victims Services NSW provides support and assistance to victims of violent crime in NSW. They offer counselling, financial assistance, and help with the justice system process."] ||
                          "Victims Services NSW provides support and assistance to victims of violent crime in NSW. They offer counselling, financial assistance, and help with the justice system process.")}
                      </Text>
                      <TouchableOpacity 
                        style={styles.learnMoreButton}
                        onPress={() => handleCardPress(service.id)}
                      >
                        <Text style={styles.learnMoreText}>{translatedTexts["Visit"] || "Visit"} {translatedTexts[service.name] || service.name}</Text>
                        <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
                      </TouchableOpacity>
                </View>
                  )}
              </TouchableOpacity>
            ))}
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
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  siteName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  siteDesc: {
    fontSize: 14,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
  },
  learnMoreText: {
    color: '#1976D2',
    fontWeight: '500',
    marginRight: 8,
    textAlign: 'center',
    flex: 1,
  },
}); 