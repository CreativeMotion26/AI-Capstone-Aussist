import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router, useSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../_lib/theme';
import TText from '../../_components/TText';
import { useTranslation } from '../../_context/TranslationContext';

const jobSites = [
  {
    id: '1',
    name: 'Seek',
    desc: 'Australia\'s largest job site',
    url: 'https://www.seek.com.au',
    image: require('../../assets/images/seek.jpg'),
  },
  {
    id: '2',
    name: 'Indeed',
    desc: 'Search millions of jobs',
    url: 'https://au.indeed.com',
    image: require('../../assets/images/indeed.jpg'),
  },
  {
    id: '3',
    name: 'LinkedIn',
    desc: 'Professional networking and job search',
    url: 'https://www.linkedin.com',
    image: require('../../assets/images/link.jpg'),
  },
  {
    id: '4',
    name: 'JobActive',
    desc: 'Australian Government job search website',
    url: 'https://jobsearch.gov.au',
    image: require('../../assets/images/jobact.jpg'),
  },
];

const workerRights = [
  {
    id: '1',
    name: 'Know your Work Rights',
    desc: 'Learn about your workplace rights and entitlements in Australia',
    url: 'https://www.fairwork.gov.au/',
    icon: 'gavel',
  },
  {
    id: '2',
    name: 'WorkSafe NSW',
    desc: 'Workplace health and safety information',
    url: 'https://www.safework.nsw.gov.au',
    icon: 'health-and-safety',
  },
  {
    id: '3',
    name: 'Know your Minimum Wage',
    desc: 'Learn about minimum wages, penalty rates, and your pay rights in Australia',
    url: 'https://www.fairwork.gov.au/pay-and-wages/minimum-wages',
    icon: 'payments',
  },
];

const training = [
  {
    id: '1',
    name: 'SEE Program',
    desc: 'Free training program to improve your language, literacy and numeracy skills',
    url: 'https://www.dewr.gov.au/skills-education-and-employment',
    icon: 'school',
  },
  {
    id: '2',
    name: 'Skills NSW',
    desc: 'Find vocational training courses and get career guidance in NSW',
    url: 'https://skills.education.nsw.gov.au/',
    icon: 'account-balance',
  },
  {
    id: '3',
    name: 'Resources for Migrants',
    desc: 'Find resources and support for migrants looking for work in Australia',
    url: 'https://www.dewr.gov.au/employment/finding-job/resources-migrants-looking-work-australia',
    icon: 'people',
  },
  {
    id: '4',
    name: 'Services Australia',
    desc: 'Find training and upskilling opportunities to improve your job prospects',
    url: 'https://www.servicesaustralia.gov.au/finding-training-to-upskill-or-retrain?context=60086',
    icon: 'support-agent',
  },
];

const supportServices = [
  {
    id: '1',
    name: 'Migrant Employment Support',
    desc: 'Settlement Services International (SSI)',
    url: 'https://www.ssi.org.au/services/employment',
    icon: 'support-agent',
  },
  {
    id: '2',
    name: 'Career Counseling',
    desc: 'Free career advice and support',
    url: 'https://www.careers.nsw.gov.au',
    icon: 'psychology',
  },
];

const volunteeringOrgs = [
  {
    id: '1',
    name: 'GoVolunteer',
    desc: 'Find volunteering opportunities across Australia',
    url: 'https://govolunteer.com.au',
    icon: 'volunteer-activism',
  },
  {
    id: '2',
    name: 'Seek Volunteer',
    desc: 'Search for volunteer work in your area',
    url: 'https://www.volunteer.com.au',
    icon: 'favorite',
  },
];

const resumeTips = [
  {
    id: '1',
    text: 'Keep it concise (1-2 pages)',
  },
  {
    id: '2',
    text: 'Use clear headings and bullet points',
  },
  {
    id: '3',
    text: 'Include your contact details',
  },
  {
    id: '4',
    text: 'List your work experience in reverse chronological order',
  },
  {
    id: '5',
    text: 'Highlight your key achievements and skills',
  },
  {
    id: '6',
    text: 'Include your education and qualifications',
  },
  {
    id: '7',
    text: 'Add any relevant certifications or licenses',
  },
  {
    id: '8',
    text: 'Proofread for spelling and grammar errors',
  },
];

const coverLetterTips = [
  {
    id: '1',
    text: 'Address the hiring manager by name if possible',
  },
  {
    id: '2',
    text: 'Explain why you\'re interested in the role',
  },
  {
    id: '3',
    text: 'Highlight your relevant skills and experience',
  },
  {
    id: '4',
    text: 'Show how you can contribute to the company',
  },
  {
    id: '5',
    text: 'Keep it professional and concise',
  },
  {
    id: '6',
    text: 'Proofread carefully before sending',
  },
];

export default function JobsScreen() {
  const [expandedSections, setExpandedSections] = React.useState<string[]>([]);
  const insets = useSafeAreaInsets();
  const { selectedLanguage, translateAll, registerText, translatedTexts } = useTranslation();

  useEffect(() => {
    // 번역할 텍스트 등록
    registerText("Jobs & Employment");
    registerText("Find work in Australia");
    registerText("Resources to help you find and apply for jobs");
    registerText("Job Search Websites");
    registerText("Popular job search platforms in Australia");
    registerText("Career Support");
    registerText("Resources to help with your career development");
    registerText("Work Rights");
    registerText("Information about your rights at work");
    registerText("Resume & CV Tips");
    registerText("Tips for creating an effective resume");
    registerText("Cover Letter Tips");
    registerText("Tips for writing a compelling cover letter");
    registerText("Resources for Migrants");
    registerText("Find resources and support for migrants looking for work in Australia");

    jobSites.forEach(site => {
      registerText(site.name);
      registerText(site.desc);
    });
    workerRights.forEach(right => {
      registerText(right.name);
      registerText(right.desc);
    });
    training.forEach(course => {
      registerText(course.name);
      registerText(course.desc);
    });
    resumeTips.forEach(tip => {
      registerText(tip.text);
    });
    coverLetterTips.forEach(tip => {
      registerText(tip.text);
    });
  }, []);

  useEffect(() => {
    translateAll(selectedLanguage);
  }, [selectedLanguage]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      if (prev.includes(section)) {
        return prev.filter(s => s !== section);
      } else {
        return [...prev, section];
      }
    });
  };

  const handleCardPress = (url: string) => {
    if (url) {
      const encodedUrl = encodeURIComponent(url);
      router.push({
        pathname: '/_components/WebTranslate',
        params: { url: encodedUrl }
      });
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: translatedTexts["Jobs & Employment"] || "Jobs & Employment",
          headerBackTitle: 'Back'
        }} 
      />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
            {translatedTexts["Find work in Australia"] || "Find work in Australia"}
          </Text>
          <TText style={{ fontSize: 16, color: 'white' }}>
            {translatedTexts["Resources to help you find and apply for jobs"] || "Resources to help you find and apply for jobs"}
          </TText>
        </View>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
            {/* Job Search Websites Section */}
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>{translatedTexts["Job Search Websites"] || "Job Search Websites"}</Text>
              <Text style={styles.sectionDesc}>{translatedTexts["Popular job search platforms in Australia"] || "Popular job search platforms in Australia"}</Text>
            {jobSites.map(site => (
              <TouchableOpacity
                key={site.id}
                style={styles.card}
                  onPress={() => handleCardPress(site.url)}
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

            {/* Career Support Section */}
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>{translatedTexts["Career Support"] || "Career Support"}</Text>
              <Text style={styles.sectionDesc}>{translatedTexts["Resources to help with your career development"] || "Resources to help with your career development"}</Text>
              {training.map(course => (
            <TouchableOpacity
                  key={course.id}
                  style={styles.card}
                  onPress={() => handleCardPress(course.url)}
            >
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                      <MaterialIcons name={course.icon as any} size={24} color="#0284C7" />
                </View>
                <View style={styles.textContainer}>
                      <Text style={styles.siteName}>{course.name}</Text>
                      <Text style={styles.siteDesc}>{translatedTexts[course.desc] || course.desc}</Text>
                    </View>
                    <MaterialIcons name="open-in-new" size={20} color="#0284C7" />
                  </View>
                  </TouchableOpacity>
              ))}
          </View>

            {/* Work Rights Section */}
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>{translatedTexts["Work Rights"] || "Work Rights"}</Text>
              <Text style={styles.sectionDesc}>{translatedTexts["Information about your rights at work"] || "Information about your rights at work"}</Text>
            {workerRights.map(right => (
              <TouchableOpacity
                key={right.id}
                style={styles.card}
                  onPress={() => handleCardPress(right.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                      <MaterialIcons name={right.icon as any} size={24} color="#0284C7" />
                  </View>
                  <View style={styles.textContainer}>
                      <Text style={styles.siteName}>{translatedTexts[right.name] || right.name}</Text>
                      <Text style={styles.siteDesc}>{translatedTexts[right.desc] || right.desc}</Text>
                  </View>
                    <MaterialIcons name="open-in-new" size={20} color="#0284C7" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

            {/* Resume & CV Tips Section */}
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>{translatedTexts["Resume & CV Tips"] || "Resume & CV Tips"}</Text>
              <Text style={styles.sectionDesc}>{translatedTexts["Tips for creating an effective resume"] || "Tips for creating an effective resume"}</Text>
              <TouchableOpacity style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name="description" size={24} color="#0284C7" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{translatedTexts["Resume & CV Tips"] || "Resume & CV Tips"}</Text>
                    <Text style={styles.siteDesc}>{translatedTexts["Tips for creating an effective resume"] || "Tips for creating an effective resume"}</Text>
                  </View>
                </View>
                <View style={styles.cardBody}>
                  {resumeTips.map(tip => (
                    <View key={tip.id} style={styles.checklistItem}>
                      <MaterialIcons name="check" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>{translatedTexts[tip.text] || tip.text}</Text>
                    </View>
                  ))}
              <TouchableOpacity
                    style={styles.learnMoreButton}
                    onPress={() => handleCardPress('https://mynewaustralianlife.com/employment/resume-writing-for-skilled-migrants/')}
                  >
                    <Text style={styles.learnMoreText}>Learn more tips for your resume</Text>
                    <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
          </View>

            {/* Cover Letter Tips Section */}
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>{translatedTexts["Cover Letter Tips"] || "Cover Letter Tips"}</Text>
              <Text style={styles.sectionDesc}>{translatedTexts["Tips for writing a compelling cover letter"] || "Tips for writing a compelling cover letter"}</Text>
              <TouchableOpacity style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name="mail" size={24} color="#0284C7" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{translatedTexts["Cover Letter Tips"] || "Cover Letter Tips"}</Text>
                    <Text style={styles.siteDesc}>{translatedTexts["Tips for writing a compelling cover letter"] || "Tips for writing a compelling cover letter"}</Text>
                  </View>
                </View>
                <View style={styles.cardBody}>
                  {coverLetterTips.map(tip => (
                    <View key={tip.id} style={styles.checklistItem}>
                      <MaterialIcons name="check" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>{translatedTexts[tip.text] || tip.text}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
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
    padding: 15,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
    marginRight: 8,
  },
  siteName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
    marginBottom: 4,
  },
  siteDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cardBody: {
    padding: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkIcon: {
    marginRight: 12,
  },
  checklistText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  imageContainer: {
    width: 48,
    height: 48,
    overflow: 'hidden',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  siteImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#666',
  },
  learnMoreText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
}); 