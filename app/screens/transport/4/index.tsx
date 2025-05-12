import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Image } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import Svg, { Path } from 'react-native-svg';
import { useTranslation } from '../../../_context/TranslationContext';

const supportOptions = [
  {
    id: '1',
    title: 'Contact Us',
    description: 'Get in touch with our customer service team',
    icon: 'contact-support',
    color: '#1976D2',
    url: 'https://transportnsw.info/contact-us'
  },
  {
    id: '2',
    title: 'Lost Property',
    description: 'Report lost items or find lost property',
    icon: 'find-in-page',
    color: '#FF9800',
    url: 'https://transportnsw.info/contact-us/lost-property'
  },
  {
    id: '3',
    title: 'Accessibility',
    description: 'Information about accessible transport services',
    icon: 'accessible',
    color: '#4CAF50',
    url: 'https://transportnsw.info/travel-info/using-public-transport/accessible-travel'
  },
  {
    id: '4',
    title: 'Feedback',
    description: 'Share your feedback about our services',
    icon: 'feedback',
    color: '#F44336',
    url: 'https://transportnsw.info/contact-us/feedback'
  }
];

const SocialMediaIcon = ({ name, onPress }: { name: string; onPress: () => void }) => {
  const getIcon = () => {
    switch (name) {
      case 'youtube':
        return (
          <Image
            source={require('../../../assets/images/youtube.jpg')}
            style={[styles.socialMediaImage, { borderRadius: 8 }]}
          />
        );
      case 'instagram':
        return (
          <Image
            source={require('../../../assets/images/insta.jpg')}
            style={[styles.socialMediaImage, { borderRadius: 8 }]}
          />
        );
      case 'facebook':
        return (
          <Image
            source={require('../../../assets/images/face.jpg')}
            style={[styles.socialMediaImage, { borderRadius: 8 }]}
          />
        );
      case 'twitter':
        return (
          <Image
            source={require('../../../assets/images/x.jpg')}
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
  const { selectedLanguage, translateAll, registerText, translatedTexts } = useTranslation();

  useEffect(() => {
    // 번역할 텍스트 등록
    registerText("Help and Support");
    registerText("Get Assistance");
    registerText("Find help and support for transport services");
    registerText("Contact Us");
    registerText("Need help with your journey? Contact Transport for NSW for information, feedback, lost property, or Opal customer care.");
    registerText("Phone");
    registerText("Email");
    registerText("Follow Us");
    registerText("Stay connected with Transport for NSW");
    supportOptions.forEach(type => {
      registerText(type.title);
      registerText(type.description);
    });
  }, []);

  useEffect(() => {
    translateAll(selectedLanguage);
  }, [selectedLanguage]);

  const handleCardPress = (optionId: string) => {
      const option = supportOptions.find(opt => opt.id === optionId);
      if (option?.url) {
      router.push({pathname: '/_components/WebTranslate', params: {url: option.url}});
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

  const handleSocialMediaPress = (platform: string) => {
    const urls = {
      youtube: 'https://www.youtube.com/user/TransportForNSW',
      instagram: 'https://www.instagram.com/transportfornsw/',
      facebook: 'https://www.facebook.com/TransportForNSW',
      twitter: 'https://twitter.com/TransportForNSW'
    };
    
    if (urls[platform as keyof typeof urls]) {
      router.push({pathname: '/_components/WebTranslate', params: {url: urls[platform as keyof typeof urls]}});
    }
  };

  if (id && id !== '1') {
    const option = supportOptions.find(opt => opt.id === id);
    if (option) {
      return (
        <>
          <Stack.Screen 
            options={{
              title: translatedTexts[option.title] || option.title,
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
          title: translatedTexts["Help and Support"] || "Help and Support",
          headerBackTitle: 'Back'
        }} 
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {translatedTexts["Get Assistance"] || "Get Assistance"}
            </Text>
            <Text style={styles.headerSubtitle}>
              {translatedTexts["Find help and support for transport services"] || "Find help and support for transport services"}
            </Text>
          </View>

          <View style={styles.supportContainer}>
            {supportOptions.map((option) => (
                    <TouchableOpacity
                key={option.id}
                style={styles.supportCard}
                      onPress={() => handleCardPress(option.id)}
                    >
                      <View style={[styles.iconContainer, { backgroundColor: option.color }]}>
                  <MaterialIcons name={option.icon as any} size={31} color="#fff" />
                      </View>
                      <View style={styles.textContainer}>
                  <Text style={styles.supportTitle}>
                    {translatedTexts[option.title] || option.title}
                  </Text>
                  <Text style={styles.supportDescription}>
                    {translatedTexts[option.description] || option.description}
                  </Text>
                    </View>
                      <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  supportContainer: {
    padding: 15,
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  supportDescription: {
    fontSize: 14,
    color: '#666',
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