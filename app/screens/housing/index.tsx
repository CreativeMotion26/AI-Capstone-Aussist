import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Animated, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../_lib/theme';
import TText from '../../_components/TText';
import { useTranslation } from '../../_context/TranslationContext';

type ExpandableSection = {
  id: string;
  title: string;
  desc: string;
  icon: string;
  content: Array<{
    title: string;
    description: string;
  }>;
  url?: string;
};

const housingGuides: ExpandableSection[] = [
  {
    id: '1',
    title: 'Types of Housing',
    desc: 'Different housing options in Australia',
    icon: 'home',
    content: [
      {
        title: 'Apartment/Unit',
        description: 'Self-contained units in residential buildings, suitable for singles or small families. Usually managed by real estate agents.',
      },
      {
        title: 'Share House',
        description: 'Shared accommodation with other tenants. Common in urban areas and near universities. More affordable option.',
      },
      {
        title: 'House Rental',
        description: 'Full house rental, ideal for families. Usually comes with private outdoor space and more room.',
      },
      {
        title: 'Studio Apartment',
        description: 'Combined living and sleeping area, suitable for singles or couples. Often more affordable than larger apartments.',
      },
    ],
  },
  {
    id: '2',
    title: 'Lease Agreement Guide',
    desc: 'Understanding your rental contract',
    icon: 'description',
    content: [
      {
        title: 'Bond',
        description: 'Security deposit (usually 4 weeks rent) held by the Rental Bond Board. Returned at end of tenancy if no issues.',
      },
      {
        title: 'Rent Payments',
        description: 'Usually paid fortnightly or monthly in advance. Keep records of all payments.',
      },
      {
        title: 'Notice Period',
        description: 'Time required to inform landlord before moving out. Usually 14-28 days depending on agreement type.',
      },
      {
        title: 'Inspection Rights',
        description: 'Landlord must give notice before inspection. Usually 7 days written notice required.',
      },
    ],
  },
  {
    id: '3',
    title: 'Moving In Tips',
    desc: 'Essential steps when moving to a new place',
    icon: 'moving',
    content: [
      {
        title: 'Utilities Setup',
        description: 'Contact providers to set up electricity, gas, and water connections before moving in.',
      },
      {
        title: 'Internet Connection',
        description: 'Research available ISPs in your area. NBN may need to be connected.',
      },
      {
        title: 'Condition Report',
        description: 'Document and photograph any existing damage. Complete and return within 7 days.',
      },
      {
        title: 'Change of Address',
        description: 'Update your address with important services (bank, Medicare, etc).',
      },
    ],
  },
];

const supportServices = [
  {
    id: '1',
    name: 'Fair Trading NSW',
    desc: 'Official tenancy laws and dispute resolution',
    url: 'https://www.fairtrading.nsw.gov.au/housing-and-property/renting',
    icon: 'gavel',
  },
  {
    id: '2',
    name: 'Tenants Union NSW',
    desc: 'Free tenancy advice and advocacy',
    url: 'https://www.tenants.org.au',
    icon: 'people',
  },
  {
    id: '3',
    name: 'Housing NSW',
    desc: 'Social housing applications and support',
    url: 'https://www.facs.nsw.gov.au/housing',
    icon: 'apartment',
  },
];

const propertySites = [
  {
    id: '1',
    name: 'Domain',
    desc: 'Australia\'s leading property website',
    url: 'https://www.domain.com.au',
    image: require('../../assets/images/domain.jpg'),
  },
  {
    id: '2',
    name: 'RealEstate.com.au',
    desc: 'Find properties for sale and rent',
    url: 'https://www.realestate.com.au/',
    image: require('../../assets/images/real.jpg'),
  },
  {
    id: '3',
    name: 'Flatmates',
    desc: 'Find share accommodation',
    url: 'https://www.flatmates.com.au',
    image: require('../../assets/images/flat.jpg'),
  },
  {
    id: '4',
    name: 'Gumtree',
    desc: 'Private rental listings and share houses',
    url: 'https://www.gumtree.com.au/s-property-for-rent',
    image: require('../../assets/images/gum.jpg'),
  },
];

export default function HousingScreen() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const insets = useSafeAreaInsets();
  const { selectedLanguage, translateAll, registerText, translatedTexts } = useTranslation();

  useEffect(() => {
    // 번역할 텍스트 등록
    registerText("Housing Services");
    registerText("Find your perfect home");
    registerText("Explore housing options and services for migrants");
    registerText("Find Properties");
    registerText("Popular property search websites in Australia");
    registerText("Support Services");
    registerText("Get help with housing issues");
    registerText("Visit Website");
    registerText("Learn More");
    registerText("Types of Housing");
    registerText("Different housing options in Australia");
    registerText("Lease Agreement Guide");
    registerText("Understanding your rental contract");
    registerText("Moving In Tips");
    registerText("Essential steps when moving to a new place");
    registerText("Apartment/Unit");
    registerText("Self-contained units in residential buildings, suitable for singles or small families. Usually managed by real estate agents.");
    registerText("Share House");
    registerText("Shared accommodation with other tenants. Common in urban areas and near universities. More affordable option.");
    registerText("House Rental");
    registerText("Full house rental, ideal for families. Usually comes with private outdoor space and more room.");
    registerText("Studio Apartment");
    registerText("Combined living and sleeping area, suitable for singles or couples. Often more affordable than larger apartments.");
    registerText("Bond");
    registerText("Security deposit (usually 4 weeks rent) held by the Rental Bond Board. Returned at end of tenancy if no issues.");
    registerText("Rent Payments");
    registerText("Usually paid fortnightly or monthly in advance. Keep records of all payments.");
    registerText("Notice Period");
    registerText("Time required to inform landlord before moving out. Usually 14-28 days depending on agreement type.");
    registerText("Inspection Rights");
    registerText("Landlord must give notice before inspection. Usually 7 days written notice required.");
    registerText("Utilities Setup");
    registerText("Contact providers to set up electricity, gas, and water connections before moving in.");
    registerText("Internet Connection");
    registerText("Research available ISPs in your area. NBN may need to be connected.");
    registerText("Condition Report");
    registerText("Document and photograph any existing damage. Complete and return within 7 days.");
    registerText("Change of Address");
    registerText("Update your address with important services (bank, Medicare, etc).");
    registerText("Fair Trading NSW");
    registerText("Official tenancy laws and dispute resolution");
    registerText("Tenants Union NSW");
    registerText("Free tenancy advice and advocacy");
    registerText("Housing NSW");
    registerText("Social housing applications and support");
    registerText("Australia's leading property website");
    registerText("Find properties for sale and rent");
    registerText("Find share accommodation");
    registerText("Private rental listings and share houses");
    
    housingGuides.forEach(guide => {
      registerText(guide.title);
      registerText(guide.desc);
      guide.content.forEach(item => {
        registerText(item.title);
        registerText(item.description);
      });
    });
    supportServices.forEach(service => {
      registerText(service.name);
      registerText(service.desc);
    });
    propertySites.forEach(site => {
      registerText(site.name);
      registerText(site.desc);
    });
  }, []);

  useEffect(() => {
    translateAll(selectedLanguage);
  }, [selectedLanguage]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleCardPress = (optionId: string) => {
    const option = housingGuides.find(opt => opt.id === optionId);
    if (option?.url) {
      router.push({pathname: '/_components/WebTranslate', params: {url: option.url}});
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: translatedTexts["Housing Services"] || "Housing Services",
          headerBackTitle: 'Back'
        }} 
      />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
            {translatedTexts["Find your perfect home"] || "Find your perfect home"}
          </Text>
          <TText style={{ fontSize: 16, color: 'white' }}>
            {translatedTexts["Explore housing options and services for migrants"] || "Explore housing options and services for migrants"}
          </TText>
        </View>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Find Properties Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translatedTexts["Find Properties"] || "Find Properties"}</Text>
            <Text style={styles.sectionDesc}>{translatedTexts["Popular property search websites in Australia"] || "Popular property search websites in Australia"}</Text>
            {propertySites.map(site => (
              <TouchableOpacity
                key={site.id}
                style={styles.card}
                onPress={() => router.push({
                  pathname: '/_components/WebTranslate',
                  params: { url: site.url }
                })}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.imageContainer}>
                    <Image source={site.image} style={styles.siteImage} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{site.name}</Text>
                    <Text style={styles.siteDesc}>{translatedTexts[site.desc] || site.desc}</Text>
                  </View>
                  <MaterialIcons name="open-in-new" size={20} color="#0284C7" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Housing Guides Sections */}
          {housingGuides.map((guide) => (
            <View key={guide.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{translatedTexts[guide.title] || guide.title}</Text>
              <TouchableOpacity
                style={[styles.card, styles.expandableCard]}
                onPress={() => toggleSection(guide.id)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={guide.icon as any} size={24} color="#0284C7" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{translatedTexts[guide.title] || guide.title}</Text>
                    <Text style={styles.siteDesc}>{translatedTexts[guide.desc] || guide.desc}</Text>
                  </View>
                  <MaterialIcons 
                    name={expandedSections.includes(guide.id) ? "expand-less" : "expand-more"} 
                    size={24} 
                    color="#1976D2" 
                  />
                </View>
                
                {expandedSections.includes(guide.id) && (
                  <View style={styles.expandedContent}>
                    {guide.content.map((item, index) => (
                      <View key={index} style={styles.guideItem}>
                        <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                        <View style={styles.guideTextContainer}>
                          <Text style={styles.guideItemTitle}>{translatedTexts[item.title] || item.title}</Text>
                          <Text style={styles.guideItemDesc}>{translatedTexts[item.description] || item.description}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}

          {/* Social Housing Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translatedTexts["Support Services"] || "Support Services"}</Text>
            <Text style={styles.sectionDesc}>{translatedTexts["Get help with housing issues"] || "Get help with housing issues"}</Text>
            {supportServices.map(service => (
              <TouchableOpacity
                key={service.id}
                style={styles.card}
                onPress={() => router.push({
                  pathname: '/_components/WebTranslate',
                  params: { url: service.url }
                })}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={service.icon as any} size={24} color="#0284C7" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{translatedTexts[service.name] || service.name}</Text>
                    <Text style={styles.siteDesc}>{translatedTexts[service.desc] || service.desc}</Text>
                  </View>
                  <MaterialIcons name="open-in-new" size={20} color="#0284C7" />
                </View>
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
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  sectionDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  expandableCard: {
    marginBottom: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
  },
  siteImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  siteDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  guideItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  checkIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  guideTextContainer: {
    flex: 1,
    flexShrink: 1,
  },
  guideItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  guideItemDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 