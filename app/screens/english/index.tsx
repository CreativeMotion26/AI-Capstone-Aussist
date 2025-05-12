import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../_lib/theme';
import TText from '../../_components/TText';
import { useTranslation } from '../../_context/TranslationContext';

const freeClasses = [
  {
    id: '1',
    name: 'AMEP (Adult Migrant English Program)',
    desc: 'Free English classes for eligible migrants and humanitarian entrants',
    url: 'https://immi.homeaffairs.gov.au/settling-in-australia/amep/about-the-program',
    icon: 'school',
  },
  {
    id: '2',
    name: 'TAFE NSW English Courses',
    desc: 'Various English courses from beginner to advanced levels',
    url: 'https://www.tafensw.edu.au/international/courses/english-courses',
    icon: 'account-balance',
  },
];

const onlineResources = [
  {
    id: '1',
    name: 'Duolingo',
    desc: 'Free language learning app with daily lessons',
    url: 'https://www.duolingo.com',
    icon: 'language',
  },
  {
    id: '2',
    name: 'BBC Learning English',
    desc: 'Free videos, audio lessons and quizzes',
    url: 'https://www.bbc.co.uk/learningenglish',
    icon: 'ondemand-video',
  },
];

const communityGroups = [
  {
    id: '1',
    name: 'City of Sydney Libraries',
    desc: 'Free English conversation groups and resources',
    url: 'https://www.cityofsydney.nsw.gov.au/libraries',
    icon: 'groups',
  },
  {
    id: '2',
    name: 'NSW State Library',
    desc: 'Language learning resources and conversation classes',
    url: 'https://www.sl.nsw.gov.au/',
    icon: 'local-library',
  },
];

const englishTests = [
  {
    id: '1',
    name: 'IELTS',
    desc: 'International English Language Testing System',
    url: 'https://ielts.com.au',
    icon: 'rate-review',
  },
  {
    id: '2',
    name: 'PTE Academic',
    desc: 'Pearson Test of English Academic',
    url: 'https://www.pearsonpte.com',
    icon: 'assignment',
  },
];

export default function EnglishScreen() {
  const insets = useSafeAreaInsets();
  const [expandedOptions, setExpandedOptions] = useState<string[]>([]);
  const { selectedLanguage, translateAll, registerText, translatedTexts } = useTranslation();

  useEffect(() => {
    // 번역할 텍스트 등록
    registerText("English Learning");
    registerText("Improve your English");
    registerText("Find English learning resources and courses");
    registerText("Free & Affordable Classes");
    registerText("Government-funded and affordable English programs");
    registerText("Online Resources");
    registerText("Free online tools and apps for learning English");
    registerText("Community Groups");
    registerText("Local groups and libraries offering English support");
    registerText("English Tests");
    registerText("Official English language proficiency tests");

    freeClasses.forEach(program => {
      registerText(program.name);
      registerText(program.desc);
    });
    onlineResources.forEach(resource => {
      registerText(resource.name);
      registerText(resource.desc);
    });
    communityGroups.forEach(group => {
      registerText(group.name);
      registerText(group.desc);
    });
    englishTests.forEach(test => {
      registerText(test.name);
      registerText(test.desc);
    });
  }, []);

  useEffect(() => {
    translateAll(selectedLanguage);
  }, [selectedLanguage]);

  const handleCardPress = (url: string) => {
    if (url) {
      router.push({pathname: '/_components/WebTranslate', params: {url: url}});
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: translatedTexts["English Learning"] || "English Learning",
          headerBackTitle: 'Back'
        }} 
      />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
            {translatedTexts["Improve your English"] || "Improve your English"}
          </Text>
          <TText style={{ fontSize: 16, color: 'white' }}>
            {translatedTexts["Find English learning resources and courses"] || "Find English learning resources and courses"}
          </TText>
        </View>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Free Classes Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translatedTexts["Free & Affordable Classes"] || "Free & Affordable Classes"}</Text>
            <Text style={styles.sectionDesc}>{translatedTexts["Government-funded and affordable English programs"] || "Government-funded and affordable English programs"}</Text>
            {freeClasses.map(program => (
              <TouchableOpacity
                key={program.id}
                style={styles.card}
                onPress={() => handleCardPress(program.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                      <MaterialIcons name={program.icon as any} size={24} color="#0284C7" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{translatedTexts[program.name] || program.name}</Text>
                  </View>
                    <MaterialIcons name="open-in-new" size={20} color="#0284C7" />
                </View>
                <Text style={styles.siteDesc}>{translatedTexts[program.desc] || program.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Online Resources Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translatedTexts["Online Resources"] || "Online Resources"}</Text>
            <Text style={styles.sectionDesc}>{translatedTexts["Free online tools and apps for learning English"] || "Free online tools and apps for learning English"}</Text>
            {onlineResources.map(resource => (
              <TouchableOpacity
                key={resource.id}
                style={styles.card}
                onPress={() => handleCardPress(resource.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                      <MaterialIcons name={resource.icon as any} size={24} color="#0284C7" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{translatedTexts[resource.name] || resource.name}</Text>
                  </View>
                    <MaterialIcons name="open-in-new" size={20} color="#0284C7" />
                </View>
                <Text style={styles.siteDesc}>{translatedTexts[resource.desc] || resource.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Community Groups Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translatedTexts["Community Groups"] || "Community Groups"}</Text>
            <Text style={styles.sectionDesc}>{translatedTexts["Local groups and libraries offering English support"] || "Local groups and libraries offering English support"}</Text>
            {communityGroups.map(group => (
              <TouchableOpacity
                key={group.id}
                style={styles.card}
                onPress={() => handleCardPress(group.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                      <MaterialIcons name={group.icon as any} size={24} color="#0284C7" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{translatedTexts[group.name] || group.name}</Text>
                  </View>
                    <MaterialIcons name="open-in-new" size={20} color="#0284C7" />
                </View>
                <Text style={styles.siteDesc}>{translatedTexts[group.desc] || group.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* English Tests Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translatedTexts["English Tests"] || "English Tests"}</Text>
            <Text style={styles.sectionDesc}>{translatedTexts["Official English language proficiency tests"] || "Official English language proficiency tests"}</Text>
            {englishTests.map(test => (
              <TouchableOpacity
                key={test.id}
                style={styles.card}
                onPress={() => handleCardPress(test.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                      <MaterialIcons name={test.icon as any} size={24} color="#0284C7" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{translatedTexts[test.name] || test.name}</Text>
                  </View>
                    <MaterialIcons name="open-in-new" size={20} color="#0284C7" />
                </View>
                <Text style={styles.siteDesc}>{translatedTexts[test.desc] || test.desc}</Text>
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
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
}); 