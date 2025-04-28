import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

export default function FindHospital() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map-outline" size={60} color="#9CA3AF" />
          <Text style={styles.mapText}>Map view showing nearby hospitals</Text>
        </View>

        <View style={styles.hospitalList}>
          <Text style={styles.listTitle}>Nearby Hospitals</Text>
          
          {[1, 2, 3].map((i) => (
            <TouchableOpacity key={i} style={styles.hospitalItem}>
              <View style={styles.hospitalIcon}>
                <Ionicons name="medkit" size={24} color="#F87171" />
              </View>
              <View style={styles.hospitalDetails}>
                <Text style={styles.hospitalName}>General Hospital {i}</Text>
                <Text style={styles.hospitalAddress}>456 Hospital Street, Sydney</Text>
                <Text style={styles.hospitalDistance}>2.{i} km away</Text>
                <View style={styles.serviceContainer}>
                  <View style={styles.serviceTag}>
                    <Text style={styles.serviceText}>Emergency</Text>
                  </View>
                  <View style={styles.serviceTag}>
                    <Text style={styles.serviceText}>24/7</Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
          
          {[4, 5].map((i) => (
            <TouchableOpacity key={i} style={styles.hospitalItem}>
              <View style={styles.hospitalIcon}>
                <Ionicons name="business" size={24} color="#60A5FA" />
              </View>
              <View style={styles.hospitalDetails}>
                <Text style={styles.hospitalName}>Medical Center {i}</Text>
                <Text style={styles.hospitalAddress}>789 Medical Way, Sydney</Text>
                <Text style={styles.hospitalDistance}>3.{i} km away</Text>
                <View style={styles.serviceContainer}>
                  <View style={styles.serviceTag}>
                    <Text style={styles.serviceText}>Specialists</Text>
                  </View>
                </View>
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
  hospitalList: {
    margin: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  hospitalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 12,
  },
  hospitalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  hospitalDetails: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  hospitalAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  hospitalDistance: {
    fontSize: 14,
    color: '#4299E1',
    marginBottom: 8,
  },
  serviceContainer: {
    flexDirection: 'row',
  },
  serviceTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginRight: 8,
  },
  serviceText: {
    fontSize: 12,
    color: '#4B5563',
  },
}); 