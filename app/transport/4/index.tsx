import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Image } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import Svg, { Path } from 'react-native-svg';

const supportOptions = [
  {
    id: '1',
    title: 'Contact Us',
    desc: 'Get in touch with our support team',
    icon: 'headset-mic',
    color: '#59bb47',
    iconSize: 34,
    content: [
      { type: 'Phone', value: '131 500', icon: 'phone' },
      { type: 'Email', value: 'info@transport.nsw.gov.au', icon: 'email' },
      { type: 'Social Media', value: 'Follow us on social media', icon: 'share' }
    ],
    socialMedia: [
      { name: 'youtube', url: 'https://www.youtube.com/user/TransportForNSW' },
      { name: 'instagram', url: 'https://www.instagram.com/transportfornsw/' },
      { name: 'facebook', url: 'https://www.facebook.com/TransportForNSW/' },
      { name: 'twitter', url: 'https://transportnsw.info/contact-us/social-media/twitter' }
    ]
  },
  {
    id: '2',
    title: 'Lost Property',
    desc: 'Report or claim lost items',
    icon: 'find-in-page',
    color: '#e87722',
    iconSize: 32,
    url: 'https://transportnsw.info/contact-us/lost-property#/'
  },
  {
    id: '3',
    title: 'Accessibility',
    desc: 'Information for customers with disabilities',
    icon: 'accessible',
    color: '#00a3e0',
    iconSize: 34,
    url: 'https://transportnsw.info/travel-info/using-public-transport/accessible-travel'
  },
  {
    id: '4',
    title: 'Feedback',
    desc: 'Submit a complaint or provide feedback',
    icon: 'feedback',
    color: '#e4002b',
    iconSize: 32,
    url: 'https://transportnsw.info/contact-us/feedback'
  },
  {
    id: '5',
    title: 'FAQ',
    desc: 'Find answers to frequently asked questions',
    icon: 'help-outline',
    color: '#9C27B0',
    iconSize: 34,
    url: 'https://transportnsw.info/contact-us/faq'
  }
];

const SocialMediaIcon = ({ name, onPress }: { name: string; onPress: () => void }) => {
  const getIcon = () => {
    switch (name) {
      case 'youtube':
        return (
          <Image
            source={require('../../assets/images/youtube.jpg')}
            style={[styles.socialMediaImage, { borderRadius: 8 }]}
          />
        );
      case 'instagram':
        return (
          <Image
            source={require('../../assets/images/insta.jpg')}
            style={[styles.socialMediaImage, { borderRadius: 8 }]}
          />
        );
      case 'facebook':
        return (
          <Image
            source={require('../../assets/images/face.jpg')}
            style={[styles.socialMediaImage, { borderRadius: 8 }]}
          />
        );
      case 'twitter':
        return (
          <Image
            source={require('../../assets/images/x.jpg')}
            style={[styles.socialMediaImage, { borderRadius: 8 }]}
          />
        );
    }
  };

  return (
    <TouchableOpacity style={styles.socialMediaButton} onPress={onPress}>
      {getIcon()}
    </TouchableOpacity>
  );
};

export default function HelpAndSupport() {
  const { id } = useLocalSearchParams();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleCardPress = (optionId: string) => {
    if (optionId === '1') {
      setExpandedCard(expandedCard === optionId ? null : optionId);
    } else if (optionId === '5') {
      router.push('/transport/4/faq');
    } else {
      const option = supportOptions.find(opt => opt.id === optionId);
      if (option?.url) {
        Linking.openURL(option.url);
      }
    }
  };

  const handleContactPress = (type: string, value: string) => {
    switch (type) {
      case 'Phone':
        Linking.openURL(`tel:${value}`);
        break;
      case 'Email':
        Linking.openURL(`mailto:${value}`);
        break;
    }
  };

  if (id && id !== '1') {
    const option = supportOptions.find(opt => opt.id === id);
    if (option) {
      return (
        <>
          <Stack.Screen 
            options={{
              title: option.title,
              headerBackTitle: 'Back'
            }} 
          />
          <View style={styles.container}>
            <WebView 
              source={{ uri: option.url }}
              style={styles.webview}
            />
          </View>
        </>
      );
    }
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Help and Support',
          headerBackTitle: 'Back'
        }} 
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Need Help?</Text>
            <Text style={styles.headerSubtitle}>Find support and assistance</Text>
          </View>

          <View style={styles.servicesContainer}>
            {supportOptions.map((option) => (
              <View key={option.id} style={styles.cardContainer}>
                {option.id === '1' ? (
                  <>
                    <TouchableOpacity
                      style={styles.cardHeader}
                      onPress={() => handleCardPress(option.id)}
                    >
                      <View style={[styles.iconContainer, { backgroundColor: option.color }]}>
                        <MaterialIcons 
                          name={option.icon as any} 
                          size={option.iconSize} 
                          color="#fff" 
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={[styles.serviceTitle, { color: '#000' }]}>{option.title}</Text>
                        <Text style={[styles.serviceDesc, { color: '#666' }]}>{option.desc}</Text>
                      </View>
                      <MaterialIcons 
                        name={expandedCard === option.id ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                        size={24} 
                        color="#1976D2" 
                      />
                    </TouchableOpacity>
                    {expandedCard === option.id && option.content && (
                      <View style={styles.cardContent}>
                        {option.content.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.contactItem}
                            onPress={() => handleContactPress(item.type, item.value)}
                          >
                            <MaterialIcons name={item.icon as any} size={24} color="#666" />
                            <Text style={styles.contactText}>{item.value}</Text>
                          </TouchableOpacity>
                        ))}
                        {option.socialMedia && (
                          <View style={styles.socialMediaContainer}>
                            {option.socialMedia.map((social, index) => (
                              <SocialMediaIcon
                                key={index}
                                name={social.name}
                                onPress={() => Linking.openURL(social.url)}
                              />
                            ))}
                          </View>
                        )}
                      </View>
                    )}
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.cardHeader}
                    onPress={() => handleCardPress(option.id)}
                  >
                    <View style={[styles.iconContainer, { backgroundColor: option.color }]}>
                      <MaterialIcons 
                        name={option.icon as any} 
                        size={option.iconSize} 
                        color="#fff" 
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={[styles.serviceTitle, { color: '#000' }]}>{option.title}</Text>
                      <Text style={[styles.serviceDesc, { color: '#666' }]}>{option.desc}</Text>
                    </View>
                    {option.id === '5' ? (
                      <Ionicons name="chevron-forward" size={20} color="#1976D2" />
                    ) : (
                      <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
                    )}
                  </TouchableOpacity>
                )}
              </View>
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
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
    width: 44,
    height: 44,
    borderRadius: 22,
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
    color: '#666',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: '#f0f0f0',
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    paddingTop: 10,
  },
  socialMediaButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialMediaImage: {
    width: 40,
    height: 40,
  },
  webview: {
    flex: 1,
  },
}); 