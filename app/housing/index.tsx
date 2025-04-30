import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Animated, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

type ExpandableSection = {
  id: string;
  title: string;
  desc: string;
  icon: string;
  content: Array<{
    title: string;
    description: string;
  }>;
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
    image: require('../assets/images/domain.jpg'),
  },
  {
    id: '2',
    name: 'RealEstate.com.au',
    desc: 'Find properties for sale and rent',
    url: 'https://www.realestate.com.au',
    image: require('../assets/images/real.jpg'),
  },
  {
    id: '3',
    name: 'Flatmates',
    desc: 'Find share accommodation',
    url: 'https://www.flatmates.com.au',
    image: require('../assets/images/flat.jpg'),
  },
  {
    id: '4',
    name: 'Gumtree',
    desc: 'Private rental listings and share houses',
    url: 'https://www.gumtree.com.au/s-property-for-rent',
    image: require('../assets/images/gum.jpg'),
  },
];

export default function HousingScreen() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Housing Guide',
          headerBackTitle: 'Back'
        }} 
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Find Properties Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Find Properties</Text>
            <Text style={styles.sectionDesc}>Popular property search websites in Australia</Text>
            {propertySites.map(site => (
              <TouchableOpacity
                key={site.id}
                style={styles.card}
                onPress={() => Linking.openURL(site.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.imageContainer}>
                    <Image source={site.image} style={styles.siteImage} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{site.name}</Text>
                    <Text style={styles.siteDesc}>{site.desc}</Text>
                  </View>
                  <MaterialIcons name="open-in-new" size={24} color="#1976D2" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Housing Guides Sections */}
          {housingGuides.map((guide) => (
            <View key={guide.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{guide.title}</Text>
              <TouchableOpacity
                style={[styles.card, styles.expandableCard]}
                onPress={() => toggleSection(guide.id)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={guide.icon as any} size={30} color="#222" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{guide.title}</Text>
                    <Text style={styles.siteDesc}>{guide.desc}</Text>
                  </View>
                  <MaterialIcons 
                    name={expandedSection === guide.id ? "expand-less" : "expand-more"} 
                    size={24} 
                    color="#1976D2" 
                  />
                </View>
                
                {expandedSection === guide.id && (
                  <View style={styles.expandedContent}>
                    {guide.content.map((item, index) => (
                      <View key={index} style={styles.guideItem}>
                        <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                        <View>
                          <Text style={styles.guideItemTitle}>{item.title}</Text>
                          <Text style={styles.guideItemDesc}>{item.description}</Text>
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
            <Text style={styles.sectionTitle}>Support Services</Text>
            {supportServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.card}
                onPress={() => Linking.openURL(service.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={service.icon as any} size={30} color="#222" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{service.name}</Text>
                    <Text style={styles.siteDesc}>{service.desc}</Text>
                  </View>
                  <MaterialIcons name="open-in-new" size={24} color="#1976D2" />
                </View>
              </TouchableOpacity>
            ))}
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
    marginBottom: 12,
  },
  sectionDesc: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  expandableCard: {
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  siteName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
    marginBottom: 2,
  },
  siteDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  expandedContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  guideItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 4,
  },
  guideItemDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  imageContainer: {
    width: 48,
    height: 48,
    overflow: 'hidden',
    marginRight: 16,
  },
  siteImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
}); 