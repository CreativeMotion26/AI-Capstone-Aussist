import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, FlatList, Keyboard } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SydneyTrain from './assets/sydney-train.jpg';
import WaysToGetAround from './screens/WaysToGetAround';
import TransportWebView from './screens/TransportWebView';
import TicketsAndFares from './screens/TicketsAndFares';
import RoutesAndTimetables from './screens/RoutesAndTimetables';
import HelpAndSupport from './screens/HelpAndSupport';
import FAQ from './screens/FAQ';
import OpalCardsImg from './assets/OpalCards.jpg';
import ContactlessImg from './assets/contactless.jpg';
import OpalImg from './assets/opal.jpg';
import AdultOpalCardImg from './assets/AdultOpalCard.jpg';
import ChildConcessionImg from './assets/ChildConcession.jpg';
import GoldenOpalCardImg from './assets/GoldenOpalCard.jpg';
import TransportImg from './assets/Transport.jpg';
import 'react-native-gesture-handler';

const accounts = [
  {
    id: '1',
    name: 'Ways to get around',
    desc: 'How to use public transport in NSW',
    icon: <MaterialIcons name="directions-bus" size={24} color="#fff" />, // 버스 아이콘
    color: '#FF9800',
  },/*Routes and Timetables, */
  {
    id: '2',
    name: 'Tickets and Fares',
    desc: 'How to pay for your travel',
    icon: <FontAwesome name="credit-card" size={24} color="#fff" />, // 카드 아이콘
    color: '#03A9F4',
  },
  {
    id: '3',
    name: 'Routes and Timetables',
    desc: "Find routes and check timetables",
    icon: <MaterialIcons name="schedule" size={24} color="#fff" />, // 시계 아이콘
    color: '#F44336',
  },
  {
    id: '4',
    name: 'Help and Support',
    desc: 'Get help and contact information',
    icon: <Ionicons name="help-circle" size={24} color="#fff" />, // 도움말 아이콘
    color: '#4CAF50',
  },
  {
    id: '5',
    name: 'FAQ',
    desc: 'Find answers to frequently asked questions about transport in NSW.',
    icon: <MaterialIcons name="help-outline" size={24} color="#fff" />, // FAQ 아이콘
    color: '#9C27B0',
  },
];

const allCards = [
  // Tickets and Fares - Ways to pay
  { 
    id: 'opal', 
    title: 'Opal Card', 
    desc: 'Pay with your Opal card', 
    image: OpalCardsImg, 
    screen: 'TicketsAndFares',
    synonyms: ['smart card', 'travel card', 'transport card']
  },
  { 
    id: 'contactless', 
    title: 'Contactless Payments', 
    desc: 'Pay with your own card or device', 
    image: ContactlessImg, 
    screen: 'TicketsAndFares',
    synonyms: ['tap and go', 'credit card', 'debit card', 'mobile payment']
  },
  { 
    id: 'single', 
    title: 'Opal Single Tickets', 
    desc: 'Pay with an Opal single ticket', 
    image: OpalImg, 
    screen: 'TicketsAndFares',
    synonyms: ['one way ticket', 'single journey', 'one trip']
  },
  // Tickets and Fares - Fares
  { 
    id: 'fares-adults', 
    title: 'Adults', 
    desc: 'Check out the fare for each transport for Adults', 
    image: AdultOpalCardImg, 
    screen: 'TicketsAndFares',
    scrollTo: 'fares-adults',
    synonyms: ['price', 'cost', 'fare', 'adult fare', 'adult price', 'adult cost']
  },
  { 
    id: 'fares-children', 
    title: 'Children & Concession', 
    desc: 'Check out the fare for each transport for Children & Concession', 
    image: ChildConcessionImg, 
    screen: 'TicketsAndFares',
    scrollTo: 'fares-children',
    synonyms: ['price', 'cost', 'fare', 'child fare', 'child price', 'child cost', 'concession fare', 'concession price', 'concession cost']
  },
  { 
    id: 'fares-seniors', 
    title: 'Seniors and Pensioners', 
    desc: 'Check out the fare for each transport for Seniors and Pensioners', 
    image: GoldenOpalCardImg, 
    screen: 'TicketsAndFares',
    scrollTo: 'fares-seniors',
    synonyms: ['price', 'cost', 'fare', 'senior fare', 'senior price', 'senior cost', 'pensioner fare', 'pensioner price', 'pensioner cost', 'old', 'elderly', 'aged', 'retired']
  },
  { 
    id: 'fares-peak', 
    title: 'Peak Time', 
    desc: 'Peak & Off-peak Fares', 
    image: TransportImg, 
    screen: 'TicketsAndFares',
    scrollTo: 'fares-peak',
    synonyms: ['price', 'cost', 'fare', 'peak fare', 'peak price', 'peak cost', 'off-peak fare', 'off-peak price', 'off-peak cost']
  },
  // Tickets and Fares - Daily and Weekly Caps
  { 
    id: 'caps-adults', 
    title: 'Adults', 
    desc: 'Cab for Adults', 
    image: AdultOpalCardImg, 
    screen: 'TicketsAndFares',
    synonyms: ['daily cap', 'weekly cap', 'maximum fare', 'fare cap']
  },
  { 
    id: 'caps-children', 
    title: 'Children & Concession', 
    desc: 'Cab for Children & Concession', 
    image: ChildConcessionImg, 
    screen: 'TicketsAndFares',
    synonyms: ['child cap', 'student cap', 'concession cap']
  },
  { 
    id: 'caps-seniors', 
    title: 'Seniors and Pensioners', 
    desc: 'Cab for Seniors and Pensioners', 
    image: GoldenOpalCardImg, 
    screen: 'TicketsAndFares',
    synonyms: ['senior cap', 'pensioner cap']
  },
  // Tickets and Fares - Manage your payments
  { 
    id: 'manage', 
    title: 'Manage your cards', 
    desc: 'Manage your Opal card', 
    image: OpalCardsImg, 
    screen: 'TicketsAndFares',
    synonyms: ['card management', 'account', 'balance', 'top up']
  },
  { 
    id: 'connect', 
    title: 'Transport Connect', 
    desc: 'Transport Connect', 
    image: OpalCardsImg, 
    screen: 'TicketsAndFares',
    synonyms: ['transport account', 'online account', 'digital account']
  },
  { 
    id: 'download', 
    title: 'Download Opal Travel App', 
    desc: 'Download Opal Travel App', 
    image: OpalCardsImg, 
    screen: 'TicketsAndFares',
    synonyms: ['mobile app', 'transport app', 'travel app']
  },
  // Ways to get around
  { 
    id: 'metro', 
    title: 'Metro', 
    desc: 'Sydney Metro services', 
    image: TransportImg, 
    screen: 'WaysToGetAround',
    synonyms: ['subway', 'underground', 'metro train']
  },
  { 
    id: 'train', 
    title: 'Train', 
    desc: 'Train services across Sydney and NSW', 
    image: TransportImg, 
    screen: 'WaysToGetAround',
    synonyms: ['rail', 'railway', 'train service']
  },
  { 
    id: 'bus', 
    title: 'Bus', 
    desc: 'Bus services across Sydney and NSW', 
    image: TransportImg, 
    screen: 'WaysToGetAround',
    synonyms: ['bus service', 'public bus', 'coach']
  },
  { 
    id: 'ferry', 
    title: 'Ferry', 
    desc: 'Sydney Harbour and coastal ferry services', 
    image: TransportImg, 
    screen: 'WaysToGetAround',
    synonyms: ['boat', 'water transport', 'harbour transport']
  },
  { 
    id: 'lightrail', 
    title: 'Light Rail', 
    desc: 'Sydney Light Rail services', 
    image: TransportImg, 
    screen: 'WaysToGetAround',
    synonyms: ['tram', 'streetcar', 'light rail service']
  },
  { 
    id: 'drive', 
    title: 'Drive', 
    desc: 'Driving information and resources', 
    image: TransportImg, 
    screen: 'WaysToGetAround',
    synonyms: ['car', 'driving', 'road transport']
  },
  { 
    id: 'regional', 
    title: 'Regional Transport', 
    desc: 'Regional train and coach services', 
    image: TransportImg, 
    screen: 'WaysToGetAround',
    synonyms: ['country transport', 'regional service', 'intercity transport']
  },
  { 
    id: 'ondemand', 
    title: 'On Demand', 
    desc: 'On-demand transport services', 
    image: TransportImg, 
    screen: 'WaysToGetAround',
    synonyms: ['flexible transport', 'on demand service', 'flexible service']
  },
  { 
    id: 'taxis', 
    title: 'Taxis & Hire', 
    desc: 'Taxi and vehicle hire services', 
    image: TransportImg, 
    screen: 'WaysToGetAround',
    synonyms: ['taxi service', 'car hire', 'vehicle rental']
  },
  { 
    id: 'community', 
    title: 'Community Transport', 
    desc: 'Community transport services', 
    image: TransportImg, 
    screen: 'WaysToGetAround',
    synonyms: ['local transport', 'community service', 'local service']
  },
  { 
    id: 'walking', 
    title: 'Walking & Cycling', 
    desc: 'Walking and cycling information', 
    image: TransportImg, 
    screen: 'WaysToGetAround',
    synonyms: ['bike', 'bicycle', 'pedestrian', 'cycling']
  }
];

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#222',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerLeft: ({ onPress }) => (
          <TouchableOpacity onPress={onPress} style={{ marginLeft: 16 }}>
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          headerShown: false,
          title: 'Transport in NSW'
        }} 
      />
      <Stack.Screen 
        name="TicketsAndFares" 
        component={TicketsAndFares} 
        options={{ 
          headerShown: true,
          title: 'Tickets and Fares',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#222',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} 
      />
      <Stack.Screen 
        name="WaysToGetAround" 
        component={WaysToGetAround} 
        options={{ 
          headerShown: true,
          title: 'Ways to Get Around',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#222',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} 
      />
      <Stack.Screen 
        name="RoutesAndTimetables" 
        component={RoutesAndTimetables} 
        options={{ 
          headerShown: true,
          title: 'Routes and Timetables'
        }} 
      />
      <Stack.Screen 
        name="HelpAndSupport" 
        component={HelpAndSupport} 
        options={{ 
          headerShown: true,
          title: 'Help and Support'
        }} 
      />
      <Stack.Screen 
        name="FAQ" 
        component={FAQ} 
        options={{ 
          headerShown: true,
          title: 'FAQ'
        }} 
      />
      <Stack.Screen 
        name="TransportWebView" 
        component={TransportWebView} 
        options={{ 
          headerShown: true,
          title: 'Web View'
        }} 
      />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (search.length > 0) {
      const allSynonyms = allCards.flatMap(card => card.synonyms || []);
      const uniqueSynonyms = [...new Set(allSynonyms)];
      const matchedSuggestions = uniqueSynonyms.filter(synonym => 
        synonym.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions(matchedSuggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [search]);

  const filtered = allCards.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    (item.desc && item.desc.toLowerCase().includes(search.toLowerCase())) ||
    (item.synonyms && item.synonyms.some(synonym => 
      synonym.toLowerCase().includes(search.toLowerCase())
    ))
  );

  const filteredAccounts = accounts.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transport in NSW</Text>
      </View>
      <Image source={SydneyTrain} style={styles.sydneyImage} resizeMode="cover" />
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#aaa" style={{marginRight: 6}} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search about transport"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 1, width: '100%'}}>
        {search.length > 0 ? (
          <FlatList
            data={filtered}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingHorizontal: 16}}
            renderItem={({item}) => (
              <TouchableOpacity
                key={item.id}
                style={styles.searchResultItem}
                onPress={() => {
                  if (item.url) {
                    navigation.navigate('TransportWebView', { url: item.url });
                  } else {
                    navigation.navigate(item.screen);
                  }
                }}
              >
                <View style={{flex:1}}>
                  <Text style={styles.accountName}>{item.title}</Text>
                  <View style={{ height: 4 }} />
                  <Text style={styles.accountDesc}>{item.desc}</Text>
                </View>
                <Entypo name="chevron-right" size={24} color="#bbb" />
              </TouchableOpacity>
            )}
          />
        ) : (
          <FlatList
            data={filteredAccounts}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingHorizontal: 16}}
            renderItem={({item}) => (
              <TouchableOpacity 
                style={styles.accountCard}
                onPress={() => {
                  if (item.name === 'Ways to get around') {
                    navigation.navigate('WaysToGetAround');
                  } else if (item.name === 'Tickets and Fares') {
                    navigation.navigate('TicketsAndFares');
                  } else if (item.name === 'Routes and Timetables') {
                    navigation.navigate('RoutesAndTimetables');
                  } else if (item.name === 'Help and Support') {
                    navigation.navigate('HelpAndSupport');
                  } else if (item.name === 'FAQ') {
                    navigation.navigate('FAQ');
                  }
                }}
              >
                <View style={[styles.accountIcon, {backgroundColor: item.color}]}> 
                  {item.icon}
                </View>
                <View style={{flex:1}}>
                  <Text style={styles.accountName}>{item.name}</Text>
                  <Text style={styles.accountDesc}>{item.desc}</Text>
                </View>
                <Entypo name="chevron-right" size={24} color="#bbb" />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text>Favorites Screen</Text>
    </View>
  );
}

function BookmarkScreen() {
  return (
    <View style={styles.container}>
      <Text>Bookmark Screen</Text>
    </View>
  );
}

function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text>Chat Screen</Text>
    </View>
  );
}

export default function App() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favourites') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Bookmarks') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Chatbot') {
              iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00CFFF',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            display: isKeyboardVisible ? 'none' : 'flex',
            height: 64,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 8,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Favourites" component={FavoritesScreen} />
        <Tab.Screen name="Bookmarks" component={BookmarkScreen} />
        <Tab.Screen name="Chatbot" component={ChatScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  illustration: {
    width: '100%',
    height: 120,
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafbfc',
    borderRadius: 16,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 18,
    height: 48,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 16,
    marginBottom: 8,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  accountIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  accountName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  accountDesc: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  sydneyImage: {
    width: '100%',
    height: 240,
    marginBottom: 10,
    borderRadius: 16,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
});
