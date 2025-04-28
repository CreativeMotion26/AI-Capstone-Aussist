import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

export default function FindPharmacy() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map-outline" size={60} color="#9CA3AF" />
          <Text style={styles.mapText}>Map view showing nearby pharmacies</Text>
        </View>

        <View style={styles.pharmacyList}>
          <Text style={styles.listTitle}>Nearby Pharmacies</Text>
          
          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity key={i} style={styles.pharmacyItem}>
              <View style={styles.pharmacyIcon}>
                <Ionicons name="medical" size={24} color="#4299E1" />
              </View>
              <View style={styles.pharmacyDetails}>
                <Text style={styles.pharmacyName}>Pharmacy {i}</Text>
                <Text style={styles.pharmacyAddress}>123 Main Street, Sydney</Text>
                <Text style={styles.pharmacyDistance}>1.{i} km away</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  contentContainer: {
    flex: 1,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#F3F4F6',
    margin: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    marginTop: 8,
    fontSize: 14,
    color: '#9CA3AF',
  },
  pharmacyList: {
    margin: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  pharmacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 12,
  },
  pharmacyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pharmacyDetails: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  pharmacyAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  pharmacyDistance: {
    fontSize: 14,
    color: '#4299E1',
  },
}); 