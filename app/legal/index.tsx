import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

const legalServices = [
  {
    id: '1',
    name: 'Legal Aid NSW',
    desc: 'Free legal help for eligible people in NSW',
    url: 'https://www.legalaid.nsw.gov.au/',
    icon: 'gavel',
  },
  {
    id: '2',
    name: 'RACS (Refugee Advice & Casework Service)',
    desc: 'Free legal advice for refugees and asylum seekers',
    url: 'https://www.racs.org.au/',
    icon: 'support-agent',
  },
];

const migrationSupport = [
  {
    id: '1',
    name: 'Registered Migration Agents',
    desc: 'Find a registered migration agent for visa advice',
    url: 'https://www.mara.gov.au/',
    icon: 'person-search',
  },
];

const victimSupport = [
  {
    id: '1',
    name: 'NSW Police',
    desc: 'Contact police in an emergency (000) or for non-urgent help (131 444)',
    url: 'https://www.police.nsw.gov.au/',
    icon: 'local-police',
  },
  {
    id: '2',
    name: 'Victims Services NSW',
    desc: 'Support for victims of crime',
    url: 'https://www.victimsservices.justice.nsw.gov.au/',
    icon: 'volunteer-activism',
  },
];

export default function LegalScreen() {
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Legal Assistance',
          headerBackTitle: 'Back'
        }} 
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Legal Help for Migrants */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Legal Help for Migrants</Text>
            <Text style={styles.sectionDesc}>Free legal services for migrants and refugees</Text>
            {legalServices.map(service => (
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

          {/* Workplace Rights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Workplace Rights</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Minimum Wage</Text>
              <Text style={styles.infoDesc}>Australia has a national minimum wage. Check the Fair Work Ombudsman website for current rates.</Text>
              <Text style={styles.infoTitle}>Unfair Dismissal</Text>
              <Text style={styles.infoDesc}>You cannot be fired unfairly. You have the right to challenge unfair dismissal.</Text>
              <Text style={styles.infoTitle}>Anti-discrimination</Text>
              <Text style={styles.infoDesc}>It is illegal to discriminate based on race, gender, age, or disability in the workplace.</Text>
            </View>
          </View>

          {/* Visa and Immigration Support */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Visa and Immigration Support</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Visa Conditions Reminder</Text>
              <Text style={styles.infoDesc}>Always check your visa conditions (e.g. work limits for students, working holiday, PR obligations).</Text>
            </View>
            {migrationSupport.map(service => (
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

          {/* Reporting a Crime or Seeking Protection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reporting a Crime or Seeking Protection</Text>
            <Text style={styles.sectionDesc}>How to contact police and get victim support</Text>
            {victimSupport.map(service => (
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
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 8,
  },
  infoDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
}); 