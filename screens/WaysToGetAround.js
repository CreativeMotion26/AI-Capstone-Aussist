import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, LayoutAnimation, TextInput } from 'react-native';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const transportOptions = [
  {
    id: '1',
    name: 'Metro',
    iconType: 'text',
    iconText: 'M',
    iconBg: '#00857c',
    iconColor: '#fff',
    description: 'Sydney Metro services',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/metro'
  },
  {
    id: '2',
    name: 'Train',
    iconType: 'text',
    iconText: 'T',
    iconBg: '#e87722',
    iconColor: '#fff',
    description: 'Train services across Sydney and NSW',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/train'
  },
  {
    id: '3',
    name: 'Bus',
    iconType: 'text',
    iconText: 'B',
    iconBg: '#00a3e0',
    iconColor: '#fff',
    description: 'Bus services across Sydney and NSW',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/bus'
  },
  {
    id: '4',
    name: 'Ferry',
    iconType: 'text',
    iconText: 'F',
    iconBg: '#59bb47',
    iconColor: '#fff',
    description: 'Sydney Harbour and coastal ferry services',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/ferry'
  },
  {
    id: '5',
    name: 'Light Rail',
    iconType: 'text',
    iconText: 'L',
    iconBg: '#e4002b',
    iconColor: '#fff',
    description: 'Sydney Light Rail services',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/light-rail'
  },
  {
    id: '6',
    name: 'Drive',
    iconType: 'icon',
    iconName: 'car',
    iconLib: 'Ionicons',
    iconBg: 'transparent',
    iconColor: '#222',
    description: 'Driving information and resources',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/drive'
  },
  {
    id: '7',
    name: 'Regional Transport',
    iconType: 'icon',
    iconName: 'bus-alt',
    iconLib: 'FontAwesome5',
    iconBg: 'transparent',
    iconColor: '#222',
    description: 'Regional train and coach services',
    url: 'https://transportnsw.info/regional'
  },
  {
    id: '8',
    name: 'On Demand',
    iconType: 'icon',
    iconName: 'map-marker',
    iconLib: 'FontAwesome',
    iconBg: 'transparent',
    iconColor: '#222',
    description: 'On-demand transport services',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/on-demand'
  },
  {
    id: '9',
    name: 'Taxis & Hire',
    iconType: 'icon',
    iconName: 'taxi',
    iconLib: 'FontAwesome',
    iconBg: 'transparent',
    iconColor: '#222',
    description: 'Taxi and vehicle hire services',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/taxi-hire-vehicle'
  },
  {
    id: '10',
    name: 'Community Transport',
    iconType: 'icon',
    iconName: 'bus',
    iconLib: 'FontAwesome',
    iconBg: 'transparent',
    iconColor: '#222',
    description: 'Community transport services',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/community-transport'
  },
  {
    id: '11',
    name: 'Walking & Cycling',
    iconType: 'icon',
    iconName: 'biking',
    iconLib: 'FontAwesome5',
    iconBg: 'transparent',
    iconColor: '#222',
    description: 'Walking and cycling information',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/walking-bike-riding'
  }
];

export default function WaysToGetAround({ navigation }) {
  const [expanded, setExpanded] = useState([]);
  const flatListRef = useRef(null);

  const handleAccordion = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expanded.includes(id)) {
      setExpanded(expanded.filter(e => e !== id));
    } else {
      setExpanded([...expanded, id]);
    }
  };

  const handleCardPress = (url) => {
    if (url) {
      navigation.navigate('TransportWebView', { url });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => handleCardPress(item.url)}
        >
          <View style={styles.cardContent}>
            {item.iconType === 'text' ? (
              <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
                <Text style={[styles.iconText, { color: item.iconColor }]}>{item.iconText}</Text>
              </View>
            ) : (
              <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
                {item.iconLib === 'Ionicons' && (
                  <Ionicons name={item.iconName} size={24} color={item.iconColor} />
                )}
                {item.iconLib === 'FontAwesome' && (
                  <FontAwesome name={item.iconName} size={24} color={item.iconColor} />
                )}
                {item.iconLib === 'FontAwesome5' && (
                  <FontAwesome5 name={item.iconName} size={24} color={item.iconColor} />
                )}
              </View>
            )}
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      </View>
      <FlatList
        ref={flatListRef}
        data={transportOptions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View>
            <Text style={{ fontSize: 14, color: '#444', marginBottom: 16, marginTop: 16 }}>
              Find out how to get around Sydney and NSW
            </Text>
          </View>
        }
        ListFooterComponent={<View style={styles.lastCardMargin} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  firstCardMargin: {
    height: 16,
  },
  lastCardMargin: {
    height: 8,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 8,
    marginBottom: 2,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
  },
}); 