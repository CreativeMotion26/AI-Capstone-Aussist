import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function MainPage() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerGreeting}>Hi Australia!</Text>
              <Text style={styles.headerTitle}>Find Service</Text>
            </View>
            <View style={styles.globeIcon}>
              <Ionicons name="globe-outline" size={24} color="#4CAF50" />
            </View>
          </View>

          {/* Services Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services for you</Text>
            <View style={styles.servicesGrid}>
              <TouchableOpacity style={styles.serviceCard}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60' }} style={styles.serviceImage} />
                <Text style={styles.serviceText}>Symptom Checker</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceCard}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500&auto=format&fit=crop&q=60' }} style={styles.serviceImage} />
                <Text style={styles.serviceText}>Find Hospital</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceCard}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&auto=format&fit=crop&q=60' }} style={styles.serviceImage} />
                <Text style={styles.serviceText}>Disease Information</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceCard}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop&q=60' }} style={styles.serviceImage} />
                <Text style={styles.serviceText}>Healthcare Support</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* How to use Section */}
          <View style={styles.howToUseSection}>
            <Text style={styles.howToUseTitle}>How to use</Text>
            <Text style={styles.howToUseText}>
              Welcome to our service finder app. Navigate through different categories to find the healthcare services you need. Use the symptom checker for health concerns, locate nearby hospitals, or access disease information. Our app is designed to make healthcare support accessible for everyone in Australia.
            </Text>
          </View>
        </View>

        {/* Service Guide Section */}
        <View style={styles.whiteContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Service Guide</Text>
            <View style={styles.guideGrid}>
              {[
                { icon: 'train' as const, color: '#7B68EE', name: 'Transport' },
                { icon: 'attach-money' as const, color: '#4CAF50', name: 'Payment' },
                { icon: 'home' as const, color: '#FFA500', name: 'Benefits' },
                { icon: 'gavel' as const, color: '#8B4513', name: 'Legal' },
                { icon: 'translate' as const, color: '#2196F3', name: 'Language' },
                { icon: 'search' as const, color: '#FF4444', name: 'Search' },
              ].map((item, index) => (
                <TouchableOpacity key={index} style={styles.guideItem}>
                  <View style={[styles.guideIconBox, { backgroundColor: item.color }]}>
                    <MaterialIcons name={item.icon} size={24} color="white" />
                  </View>
                  <Text style={styles.guideText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#E3F2FD',
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    paddingTop: 8,
  },
  headerGreeting: {
    fontSize: 16,
    color: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  globeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  serviceText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  howToUseSection: {
    margin: 16,
    padding: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
  },
  howToUseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  howToUseText: {
    color: '#666',
    lineHeight: 20,
  },
  guideGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  guideItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  guideIconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  guideText: {
    fontSize: 12,
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  navItem: {
    alignItems: 'center',
  },
}); 