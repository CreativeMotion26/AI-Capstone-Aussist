import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const helpAndSupport = [
  {
    id: '1',
    title: 'Contact Us',
    icon: 'call-outline',
    description: 'Get in touch with our customer service team',
    content: [
      { type: 'Phone', value: '131 500', description: '24/7 customer service' },
      { type: 'Email', value: 'customers@transport.nsw.gov.au', description: 'General inquiries' },
      { type: 'Feedback', value: 'feedback@transport.nsw.gov.au', description: 'Share your feedback' }
    ]
  },
  {
    id: '2',
    title: 'Lost Property',
    icon: 'search-outline',
    description: 'Report or claim lost items',
    content: [
      { type: 'Train', value: '131 500', description: 'Lost property on trains' },
      { type: 'Bus', value: '131 500', description: 'Lost property on buses' },
      { type: 'Ferry', value: '131 500', description: 'Lost property on ferries' }
    ]
  },
  {
    id: '3',
    title: 'Accessibility',
    icon: 'accessibility-outline',
    description: 'Information for customers with accessibility needs',
    content: [
      { type: 'Assistance', value: '1800 637 500', description: 'Book travel assistance' },
      { type: 'Companion Card', value: '1800 893 044', description: 'Companion Card inquiries' },
      { type: 'Feedback', value: 'accessibility@transport.nsw.gov.au', description: 'Accessibility feedback' }
    ]
  },
  {
    id: '4',
    title: 'Service Updates',
    icon: 'alert-circle-outline',
    description: 'Check for service disruptions and updates',
    content: [
      { type: 'Alerts', value: 'https://transportnsw.info/alerts', description: 'View all service alerts' },
      { type: 'Twitter', value: '@T1SydneyTrains', description: 'Follow for real-time updates' },
      { type: 'App', value: 'Transport for NSW', description: 'Download our app' }
    ]
  },
  {
    id: '5',
    title: 'Complaints',
    icon: 'document-text-outline',
    description: 'Submit a complaint or provide feedback',
    content: [
      { type: 'Online', value: 'https://transportnsw.info/feedback', description: 'Submit feedback online' },
      { type: 'Phone', value: '131 500', description: 'Make a complaint by phone' },
      { type: 'Mail', value: 'PO Box K659', description: 'Haymarket NSW 1240' }
    ]
  }
];

export default function HelpAndSupport({ navigation }) {
  const handleCardPress = (item) => {
    // Handle card press based on content type
    if (item.type === 'Online' || item.type === 'Alerts') {
      navigation.navigate('TransportWebView', { url: item.value });
    } else if (item.type === 'Twitter') {
      // Handle Twitter link
    } else if (item.type === 'App') {
      // Handle app store link
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 14 }}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={24} color="#222" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              {item.content.map((contentItem, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.contentItem}
                  onPress={() => handleCardPress(contentItem)}
                >
                  <Text style={styles.contentType}>{contentItem.type}</Text>
                  <Text style={styles.contentValue}>{contentItem.value}</Text>
                  <Text style={styles.contentDesc}>{contentItem.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      </View>
      <FlatList
        data={helpAndSupport}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 2 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  headerContainer: {
    height: 0,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 0,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 
    color: '#444',
    marginBottom: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginBottom: 14,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  contentItem: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  contentType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  contentValue: {
    fontSize: 16,
    color: '#0066cc',
    marginVertical: 4,
  },
  contentDesc: {
    fontSize: 12,
    color: '#666',
  },
});
