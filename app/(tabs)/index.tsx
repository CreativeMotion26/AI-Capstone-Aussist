import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from '../_context/TranslationContext';
import { theme } from '../_lib/theme';
import TText from '../_components/TText';
import * as Location from 'expo-location';
import { useFavourites } from '../_context/FavouriteContext';
import CustomSplash from '../_components/CustomSplash';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: '한국어' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'ar', name: 'Arabic' },
];

const serviceCategories = [
  { id: 'transport', title: 'Transport', description: 'Public transport information and services in NSW', icon: 'train-outline', route: '/screens/transport' },
  { id: 'banking', title: 'Banking', description: 'Australian banking systems and financial assistance', icon: 'card-outline', route: '/screens/banking' },
  { id: 'housing', title: 'Housing', description: 'Find accommodation and rental assistance', icon: 'home-outline', route: '/screens/housing' },
  { id: 'legal', title: 'Legal', description: 'Legal support and advice for migrants', icon: 'book-outline', route: '/screens/legal' },
  { id: 'english', title: 'Learn English', description: 'English language courses and learning resources', icon: 'school-outline', route: '/screens/english' },
  { id: 'jobs', title: 'Jobs', description: 'Find jobs and understand Australian workplace', icon: 'briefcase-outline', route: '/screens/jobs' },
];

const serviceImgs = [
  require('../assets/images/Symptom.jpg'),
  require('../assets/images/Hospital.jpg'),
  require('../assets/images/Disease.jpg'),
  require('../assets/images/Healthcare.jpg'),
];

const categoryImgs: { [key: string]: any } = {
  transport: require('../assets/images/home-transport.jpg'),
  banking: require('../assets/images/home-banking.jpg'),
  housing: require('../assets/images/home-housing.jpg'),
  legal: require('../assets/images/home-legal.jpg'),
  english: require('../assets/images/home-learn.jpg'),
  jobs: require('../assets/images/home-jobs.jpg'),
};

export default function Home() {
  const { selectedLanguage, setSelectedLanguage, translateAll, translatedTexts, registerText } = useTranslation();
  const { addFavourite, isFavourite } = useFavourites();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef<TextInput>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    registerText('Ask me about medical information...');
  }, []);

  if (showSplash) {
    return <CustomSplash onFinish={() => setShowSplash(false)} />;
  }

  const clearSearch = () => {
    setSearchText('');
    searchInputRef.current?.focus();
  };

  const changeLang = async (code: string) => {
    if (code === selectedLanguage) return;
    setSelectedLanguage(code);
    await translateAll(code);
  };

  const filteredCategories = serviceCategories.filter(cat =>
    cat.title.toLowerCase().includes(searchText.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const windowHeight = Dimensions.get('window').height;
  const menuHeight = 0;
  const menuTop = windowHeight - menuHeight - (insets.bottom > 0 ? insets.bottom : 0);

  const handleFindHospital = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === 'granted') {
      router.push('/screens/hospital/index' as any);
    } else {
      router.push('/screens/location/enable-location' as any);
    }
  };

  const handleFavourite = (item: any) => {
    addFavourite({
      id: item.id,
      title: item.title,
      description: item.description,
      icon: item.icon,
      image: categoryImgs[item.id],
      category: item.id,
      route: item.route,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ paddingTop: insets.top + 4, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
            <TText style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Aussist</TText>
            <TText style={{ fontSize: 16, color: 'white' }}>Welcome to Australia</TText>
          </View>

          <View style={{ padding: 16 }}>
            <TText style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>Select your language:</TText>
            <View style={{ flexDirection: 'row', marginBottom: 24 }}>
              {languages.map(l => (
                <TouchableOpacity
                  key={l.code}
                  onPress={() => changeLang(l.code)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    marginRight: 8,
                    backgroundColor: selectedLanguage === l.code ? theme.colors.primary : 'white',
                    borderWidth: 1,
                    borderColor: selectedLanguage === l.code ? theme.colors.primary : '#E5E7EB',
                  }}
                >
                  <TText style={{ color: selectedLanguage === l.code ? 'white' : '#6B7280' }}>{l.name}</TText>
                </TouchableOpacity>
              ))}
            </View>

            <TText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12}}>Chat with Aussist Chatbot</TText>
            <View style={{
              flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',
              borderRadius: 10, padding: 10, marginBottom: 24, elevation: 2,
              shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1, shadowRadius: 4,
            }}>
              <MaterialIcons name="chat" size={24} color="#666" style={{ marginRight: 10 }} />
              <TextInput
                ref={searchInputRef}
                style={{ flex: 1, fontSize: 16, color: '#000' }}
                placeholder={translatedTexts['Ask me about medical information...'] || 'Ask me about medical information...'}
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText}
                blurOnSubmit={false}
                multiline
              />
              {searchText.length > 0 && (
                <TouchableOpacity 
                  onPress={() => {
                    if (searchText.trim()) {
                      router.push({
                        pathname: '/translation' as any,
                        params: { initialMessage: searchText.trim() }
                      });
                    }
                  }}
                >
                  <MaterialIcons name="send" size={28} color={theme.colors.primary} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
              )}
            </View>

            <TText style={{ fontSize:18, fontWeight:'bold', marginBottom:12 }}>Medical Services for you</TText>
            <View style={{ flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between', marginBottom:24 }}>
              {[
                { label: 'Symptom Checker', desc: 'Check your symptoms and get medical advice' },
                { label: 'Find Hospital', desc: 'Find nearby hospitals and medical facilities' },
                { label: 'Disease Information', desc: 'Learn about common diseases and treatments' },
                { label: 'Healthcare Support', desc: 'Get support for your healthcare needs' }
              ].map((service,idx) => (
                <TouchableOpacity key={idx} style={{
                  width:'48%', backgroundColor:'white', borderRadius:8, overflow:'hidden', marginBottom:16,
                  shadowOpacity:0.1, shadowRadius:2, shadowOffset:{ width:0,height:1 }, elevation:2,
                }} onPress={() => {
                  if (service.label === 'Find Hospital') {
                    router.push('/screens/location/enable-location' as any);
                  } else if (service.label === 'Healthcare Support') {
                    router.push('/screens/healthcare' as any);
                  } else if (service.label === 'Symptom Checker') {
                    router.push('../symptoms' as any);
                  } else {
                    router.push('../diseases' as any);
                  }
                }}>
                  
                  <View style={{ position: 'relative' }}>
                    <Image source={serviceImgs[idx]} style={{ width:'100%', height:100 }} />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        padding: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 12,
                      }}
                      onPress={() => handleFavourite({
                        id: `medical-${idx}`,
                        title: service.label,
                        description: service.desc,
                        icon: 'medical-services',
                        route: service.label === 'Find Hospital' ? '/screens/location/enable-location' :
                               service.label === 'Healthcare Support' ? '/screens/healthcare' :
                               service.label === 'Symptom Checker' ? '/screens/symptoms' :
                               '/screens/diseases'
                      })}
                    >
                      <MaterialIcons 
                        name={isFavourite(`medical-${idx}`) ? "favorite" : "favorite-border"} 
                        size={20} 
                        color="#0284C7" 
                      />
                    </TouchableOpacity>
                  </View>
                  <TText style={{ padding:8, textAlign:'center', fontWeight:'500' }}>{service.label}</TText>
                </TouchableOpacity>
              ))}
            </View>

            <TText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Service Categories</TText>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 0 }}>
              {filteredCategories.map((cat, idx) => (
                <TouchableOpacity
                  key={cat.id}
                  style={{
                    width: '48%', backgroundColor: 'white', borderRadius: 8, overflow: 'hidden', marginBottom: 16,
                    shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 2,
                  }}
                  onPress={() => router.push(cat.route as any)}
                >
                  <View style={{ position: 'relative' }}>
                    <Image source={categoryImgs[cat.id]} style={{ width: '100%', height: 100 }} />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        padding: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 12,
                      }}
                      onPress={() => handleFavourite(cat)}
                    >
                      <MaterialIcons 
                        name={isFavourite(cat.id) ? "favorite" : "favorite-border"} 
                        size={20} 
                        color="#0284C7" 
                      />
                    </TouchableOpacity>
                  </View>
                  <TText style={{ padding: 8, textAlign: 'center', fontWeight: '500' }}>{cat.title}</TText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  favouriteButton: {
    padding: 8,
  },
});