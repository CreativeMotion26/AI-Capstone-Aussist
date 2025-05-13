import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../_lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TText from '../../_components/TText';
import { Linking } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTranslation } from '../../_context/TranslationContext';

type HealthOption = {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: { text: string; bold?: string; phone?: string; url?: string; style?: { textDecorationLine: 'underline' | 'none' | 'line-through' | 'underline line-through' } }[];
  url: string;
};

const healthOptions: HealthOption[] = [
  {
    id: '1',
    title: 'How Australian Health System Works',
    icon: 'medkit-outline',
    description: 'Understanding the Australian healthcare system',
    features: [
      { text: 'Medicare ensures free or low-cost access to most medical services, public hospitals, and subsidised medicines', bold: 'Medicare' },
      { text: 'Primary Health Networks link GPs, hospitals, and allied health providers to manage community health needs', bold: 'Primary Health Networks' },
      { text: 'Pharmaceutical Benefits Scheme makes over 5,200 prescription medicines affordable through government subsidies', bold: 'Pharmaceutical Benefits Scheme' },
      { text: 'Private health insurance offers additional cover for hospital treatment and non-medical services (e.g., dental, physiotherapy)', bold: 'Private health insurance' },
      
    ],
    url: 'https://www.health.gov.au/about-us/the-australian-health-system'
  },
  {
    id: '2',
    title: "What's Medicare?",
    icon: 'card-outline',
    description: 'Learn about Medicare coverage and benefits',
    features: [
      { text: "Medicare is Australia's universal health insurance scheme, introduced in 1984. It guarantees eligible Australian citizens and permanent residents free or low-cost access to:", bold: undefined },
      { text: "General practitioner and specialist consultations", bold: undefined },
      { text: "Public hospital treatment as a public patient", bold: undefined },
      { text: "Subsidised prescription medicines under the PBS", bold: undefined },
      { text: "No out-of-pocket fees apply for bulk-billed services, ensuring essential care is affordable for everyone.", bold: undefined }
    ],
    url: 'https://www.servicesaustralia.gov.au/medicare'
  },
  {
    id: '3',
    title: 'Primary Health Networks (PHNs)',
    icon: 'people-outline',
    description: 'Understanding PHNs and their role in healthcare',
    features: [
      { text: "Primary Health Networks (PHNs) are independent organisations that coordinate primary health care delivery in their regions. They work to:", bold: undefined },
      { text: "Improve coordination of care between GPs, hospitals, and other health services", bold: undefined },
      { text: "Address gaps in primary health care services", bold: undefined },
      { text: "Support better management of chronic conditions", bold: undefined },
      { text: "Provide mental health and suicide prevention services", bold: undefined },
      { text: "Deliver after-hours health services", bold: undefined },
      { text: "PHNs work closely with local communities to identify and address specific health needs in their regions.", bold: undefined }
    ],
    url: 'https://www.health.gov.au/our-work/primary-health-networks'
  },
  {
    id: '4',
    title: 'Pharmaceutical Benefits Scheme (PBS)',
    icon: 'medical-outline',
    description: 'Understanding the PBS and medicine subsidies',
    features: [
      { text: "The Pharmaceutical Benefits Scheme (PBS) is a program of the Australian Government that provides subsidised prescription drugs to residents of Australia, as well as certain visitors. The PBS:", bold: undefined },
      { text: "Lists over 5,200 medicines that are subsidised for the community", bold: undefined },
      { text: "Provides medicines at a lower cost through government subsidies", bold: undefined },
      { text: "Offers lower prices for pensioners and concession card holders", bold: undefined },
      { text: "Covers a wide range of medicines including treatments for chronic conditions", bold: undefined },
      { text: "Is regularly updated with new medicines and price changes", bold: undefined },
      { text: "The PBS helps ensure that all Australians have access to necessary medicines at an affordable price.", bold: undefined }
    ],
    url: 'https://www.pbs.gov.au/info/about-the-pbs'
  },
  {
    id: '5',
    title: 'Vaccinations',
    icon: 'medkit-outline',
    description: 'Important vaccinations in Australia',
    features: [
      { text: "Getting vaccinated is a simple and effective way to protect yourself and those around you from serious diseases. Immunisation is one of the best ways to prevent illness and save lives.", bold: undefined },
      { text: "National Immunisation Program provides free vaccines for:", bold: undefined },
      { text: "   • Pregnant women", bold: undefined },
      { text: "   • Infants and children", bold: undefined },
      { text: "   • Adolescents", bold: undefined },
      { text: "   • Aboriginal and Torres Strait Islander people", bold: undefined },
      { text: "   • People with specific medical conditions", bold: undefined },
      { text: "Vaccines help your immune system recognise and fight harmful bacteria and viruses", bold: undefined },
      { text: "Some vaccines provide long-term protection, while others (like flu vaccine) need annual doses", bold: undefined },
      { text: "Herd immunity helps protect vulnerable people in the community when many people are vaccinated", bold: undefined }
    ],
    url: 'https://www.health.nsw.gov.au/immunisation/Pages/vaccination-information.aspx'
  },
  {
    id: '6',
    title: 'Mental Health Support',
    icon: 'fitness-outline',
    description: 'Mental health services and support',
    features: [
      { text: "Mental health is a state of wellbeing that enables you to deal with what life throws at you. It is about feeling resilient, enjoying life and being able to connect with others.", bold: undefined },
      { text: "Get help now", bold: "Get help now" },
      { text: "In an emergency, call 000.", bold: undefined },
      { text: "Help is available 24 hours a day, 7 days a week, anywhere in Australia. If you need help now, call:", bold: undefined },
      { text: "•  Lifeline – ", bold: undefined, phone: "13 11 14" },
      { text: "•  Kids Helpline – ", bold: undefined, phone: "1800 55 1800" },
      { text: "•  Mental Health Crisis Assessment and Treatment Team in your state/territory", bold: undefined },
      { text: "•  Beyond Blue – ", bold: undefined, phone: "1300 224 636" },
      { text: "A list of services that can help you right now", url: "https://www.medicarementalhealth.gov.au/crisis-links", style: { textDecorationLine: 'underline' } }
    ],
    url: 'https://www.health.gov.au/health-topics/mental-health'
  },
  {
    id: '7',
    title: 'Telehealth',
    icon: 'call-outline',
    description: 'Online medical consultations and services',
    features: [
      { text: "Telehealth services allow you to have consultations with health professionals using video or phone calls. This includes:", bold: undefined },
      { text: "Consultations with GPs, specialists, and allied health professionals", bold: undefined },
      { text: "Mental health services and counselling", bold: undefined },
      { text: "Chronic disease management", bold: undefined },
      { text: "Prescription services and medication reviews", bold: undefined },
      { text: "Health assessments and care planning", bold: undefined },
      { text: "Telehealth services are covered by Medicare and can be accessed from anywhere in Australia.", bold: undefined }
    ],
    url: 'https://www.health.gov.au/topics/health-technologies-and-digital-health/about/telehealth'
  }
];

const BoldText = ({ text }: { text: string }) => {
  const parts = text.split('**');
  return (
    <TText style={{ marginLeft: 8, flex: 1 }}>
      {parts.map((part, i) => (
        i % 2 === 0 ? part : <TText key={i} style={{ fontWeight: 'bold' }}>{part}</TText>
      ))}
    </TText>
  );
};

export default function HealthcareScreen() {
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
  const insets = useSafeAreaInsets();
  const { selectedLanguage, translateAll, registerText, translatedTexts } = useTranslation();

  useEffect(() => {
    const texts = [
      "Healthcare",
      "Find healthcare services and support",
      "Resources to help you access healthcare in Australia",
      "Find a Doctor",
      "Search for doctors and medical services",
      "Find a doctor or medical service near you",
      "Health Direct",
      "Australia's national health information service",
      "Health Direct provides free health advice and information 24/7. You can speak to a registered nurse, find health services, and get trusted health information.",
      "Visit Health Direct",
      "Medicare",
      "Australia's public health insurance system",
      "Medicare is Australia's universal health care system. It provides access to free or low-cost health care for all Australians and most permanent residents.",
      "Visit Medicare",
      "Pharmacy Services",
      "Find pharmacies and medication information",
      "Find a pharmacy near you and learn about medication services",
      "Find a Pharmacy",
      "Search for pharmacies in your area",
      "Find a pharmacy near you and get information about prescription medications, over-the-counter medicines, and health advice.",
      "Visit Find a Pharmacy",
      "Mental Health Support",
      "Get help with mental health and wellbeing",
      "Find mental health services and support",
      "Mental health support and information",
      "Beyond Blue provides information and support to help everyone in Australia achieve their best possible mental health. They offer 24/7 support via phone, web chat, and email.",
      "Emergency Services",
      "Emergency medical services and support",
      "Get help in a medical emergency",
      "Emergency Services",
      "Call 000 for life-threatening emergencies",
      "In a life-threatening emergency, call 000 immediately. This will connect you to police, fire, or ambulance services. Stay calm and follow the operator's instructions.",
      "Learn More"
    ];

    // 각 섹션의 카드 텍스트 등록
    healthOptions.forEach(service => {
      // Lifeline, Kids Helpline, Beyond Blue는 번역에서 제외
      if (['Lifeline', 'Kids Helpline', 'Beyond Blue'].includes(service.title)) return;
      texts.push(service.title);
      texts.push(service.description);
      service.features.forEach(feature => {
        // feature.text에 Lifeline, Kids Helpline, Beyond Blue가 포함되어 있으면 제외
        if (feature.text && (
          feature.text.includes('Lifeline') ||
          feature.text.includes('Kids Helpline') ||
          feature.text.includes('Beyond Blue')
        )) return;
        if (feature.text) texts.push(feature.text);
        if (feature.bold) texts.push(feature.bold);
      });
    });

    // 모든 텍스트를 한 번에 등록
    texts.forEach(text => registerText(text));
  }, []);

  useEffect(() => {
    if (selectedLanguage) {
      translateAll(selectedLanguage);
    }
  }, [selectedLanguage]);

  const toggleCard = React.useCallback((cardId: string) => {
    setExpandedCards(prev => {
      if (prev[cardId]) {
        const { [cardId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [cardId]: true };
    });
  }, []);

  const handleCardPress = React.useCallback((optionId: string) => {
    const option = healthOptions.find(opt => opt.id === optionId) || 
                  (optionId === 'healthdirect' ? {
                    id: 'healthdirect',
                    title: 'Health Direct',
                    url: 'https://www.healthdirect.gov.au/'
                  } : null) ||
                  (optionId === 'medicare' ? {
                    id: 'medicare',
                    title: 'Medicare',
                    url: 'https://www.servicesaustralia.gov.au/medicare'
                  } : null) ||
                  (optionId === 'pharmacy' ? {
                    id: 'pharmacy',
                    title: 'Find a Pharmacy',
                    url: 'https://www.healthdirect.gov.au/australian-health-services'
                  } : null) ||
                  (optionId === 'beyondblue' ? {
                    id: 'beyondblue',
                    title: 'Beyond Blue',
                    url: 'https://www.beyondblue.org.au/'
                  } : null);
    if (option?.url) {
      router.push({pathname: '/_components/WebTranslate', params: {url: option.url}});
    }
  }, []);

  return (
    <>
      <Stack.Screen 
        options={{
          title: translatedTexts["Healthcare"] || "Healthcare",
          headerBackTitle: 'Back'
        }} 
      />
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
        <View style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
          <TText style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
            {translatedTexts["Find healthcare services and support"] || "Find healthcare services and support"}
          </TText>
          <TText style={{ fontSize: 16, color: 'white' }}>
            {translatedTexts["Resources to help you access healthcare in Australia"] || "Resources to help you access healthcare in Australia"}
          </TText>
      </View>

      <ScrollView>
        <View style={{ padding: 16 }}>
            <TText style={{ fontSize: 16, color: '#4B5563', marginBottom: 16, lineHeight: 24 }}>
              Your quick guide to Australia's health system: tap any card for key facts, detailed info, and official links.
            </TText>
            {healthOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  overflow: 'hidden'
                }}
                onPress={() => toggleCard(option.id)}
              >
                <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    backgroundColor: '#E0F2FE',
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <Ionicons name={option.icon as any} size={24} color="#0284C7" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <TText style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>{translatedTexts[option.title] || option.title}</TText>
                    <TText style={{ fontSize: 14, color: '#6B7280' }}>{translatedTexts[option.description] || option.description}</TText>
            </View>
                  <MaterialIcons 
                    name={expandedCards[option.id] ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                    size={24} 
                    color="#1976D2" 
                  />
          </View>

                {expandedCards[option.id] && (
                  <View style={{ padding: 16, backgroundColor: '#F9FAFB', borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
                    {option.features.map((feature, index) => (
                      <View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
                        {((option.id === '1' && (
                          feature.text.startsWith('Medicare ensures') ||
                          feature.text.startsWith('Primary Health Networks') ||
                          feature.text.startsWith('Pharmaceutical Benefits Scheme') ||
                          feature.text.startsWith('Private health insurance')
                        )) || (option.id === '2' && (
                          feature.text.startsWith('General practitioner') ||
                          feature.text.startsWith('Public hospital') ||
                          feature.text.startsWith('Subsidised')
                        )) || (option.id === '3' && (
                          feature.text.startsWith('Improve') ||
                          feature.text.startsWith('Address') ||
                          feature.text.startsWith('Support') ||
                          feature.text.startsWith('Provide') ||
                          feature.text.startsWith('Deliver')
                        )) || (option.id === '4' && (
                          feature.text.startsWith('Lists over') ||
                          feature.text.startsWith('Provides') ||
                          feature.text.startsWith('Offers') ||
                          feature.text.startsWith('Covers') ||
                          feature.text.startsWith('Is regularly')
                        )) || (option.id === '5' && (
                          feature.text.startsWith('National') ||
                          feature.text.startsWith('Vaccines') ||
                          feature.text.startsWith('Some')
                        )) || (option.id === '7' && (
                          feature.text.startsWith('Consultations with GPs') ||
                          feature.text.startsWith('Mental health services') ||
                          feature.text.startsWith('Chronic disease') ||
                          feature.text.startsWith('Prescription services') ||
                          feature.text.startsWith('Health assessments')
                        ))) && (
                          <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={{ marginTop: 2 }} />
                        )}
                        <TText style={{ flex: 1, marginLeft: ((option.id === '1' && (
                          feature.text.startsWith('Medicare ensures') ||
                          feature.text.startsWith('Primary Health Networks') ||
                          feature.text.startsWith('Pharmaceutical Benefits Scheme') ||
                          feature.text.startsWith('Private health insurance')
                        )) || (option.id === '2' && (
                          feature.text.startsWith('General practitioner') ||
                          feature.text.startsWith('Public hospital') ||
                          feature.text.startsWith('Subsidised')
                        )) || (option.id === '3' && (
                          feature.text.startsWith('Improve') ||
                          feature.text.startsWith('Address') ||
                          feature.text.startsWith('Support') ||
                          feature.text.startsWith('Provide') ||
                          feature.text.startsWith('Deliver')
                        )) || (option.id === '4' && (
                          feature.text.startsWith('Lists over') ||
                          feature.text.startsWith('Provides') ||
                          feature.text.startsWith('Offers') ||
                          feature.text.startsWith('Covers') ||
                          feature.text.startsWith('Is regularly')
                        )) || (option.id === '5' && (
                          feature.text.startsWith('National') ||
                          feature.text.startsWith('Vaccines') ||
                          feature.text.startsWith('Some')
                        )) || (option.id === '7' && (
                          feature.text.startsWith('Consultations with GPs') ||
                          feature.text.startsWith('Mental health services') ||
                          feature.text.startsWith('Chronic disease') ||
                          feature.text.startsWith('Prescription services') ||
                          feature.text.startsWith('Health assessments')
                        ))) ? 8 : 0 }}>
                          {feature.bold ? (
                            <>
                              <TText style={{ fontWeight: 'bold' }}>{feature.bold}</TText>
                              <TText>{feature.text.replace(feature.bold, '')}</TText>
                            </>
                          ) : (
                            feature.phone ? (
                              <TouchableOpacity onPress={() => Linking.openURL(`tel:${feature.phone}`)}>
                                <View style={{ flexDirection: 'row' }}>
                                  <TText>{feature.text}</TText>
                                  <TText style={{ color: '#0284C7' }}>{feature.phone}</TText>
                                </View>
                              </TouchableOpacity>
                            ) : feature.url ? (
                              feature.url.includes('medicarementalhealth.gov.au') ? (
                                <TouchableOpacity onPress={() => router.push({ pathname: '/_components/WebTranslate', params: { url: feature.url } })}>
                                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TText style={feature.style}>{feature.text}</TText>
                                    <MaterialIcons name="open-in-new" size={16} color="#0284C7" style={{ marginLeft: 4 }} />
          </View>
              </TouchableOpacity>
                              ) : (
                                <TouchableOpacity onPress={() => Linking.openURL(feature.url!)}>
                                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TText style={feature.style}>{feature.text}</TText>
                                    <MaterialIcons name="open-in-new" size={16} color="#0284C7" style={{ marginLeft: 4 }} />
            </View>
                                </TouchableOpacity>
                              )
                            ) : (
                              feature.text
                            )
                          )}
                        </TText>
                        </View>
                      ))}
                    <TouchableOpacity 
                      style={{
                        backgroundColor: '#0284C7',
                        padding: 12,
                        borderRadius: 6,
                        alignItems: 'center',
                        marginTop: 12
                      }}
                      onPress={() => handleCardPress(option.id)}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TText style={{ color: 'white', fontWeight: '500' }}>Learn More</TText>
                        <MaterialIcons name="open-in-new" size={16} color="white" style={{ marginLeft: 4 }} />
                    </View>
                    </TouchableOpacity>
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
