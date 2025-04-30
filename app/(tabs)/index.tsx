import React from 'react';
import { ScrollView, View, TouchableOpacity, Image, StatusBar, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from '../context/TranslationContext';
import { theme } from '../lib/theme';
import TText from '../components/TText';

const languages = [
  { code:'en', name:'English' },
  { code:'ko', name:'한국어' },
  { code:'vi', name:'Tiếng Việt' },
  { code:'ar', name:'Arabic' }
];

const serviceCategories = [
  { id:'transport',  title:'Transport',         description:'Public transport information and services in NSW',             icon:'train-outline',       route:'/transport'         },
  { id:'banking',    title:'Banking & Finance', description:'Australian banking systems and financial assistance',          icon:'card-outline',        route:'/banking'           },
  { id:'housing',    title:'Housing',           description:'Find accommodation and rental assistance',                     icon:'home-outline',        route:'/housing'           },
  { id:'legal',      title:'Legal Assistance',  description:'Legal support and advice for migrants',                       icon:'book-outline',       route:'/legal'             },
  { id:'english',    title:'Learn English',     description:'English language courses and learning resources',             icon:'school-outline',      route:'/english'           },
  { id:'jobs',       title:'Job Opportunity',   description:'Find jobs and understand Australian workplace',               icon:'briefcase-outline',   route:'/jobs'              },
  { id:'emergency',  title:'Emergency',         description:'Quick access to emergency contacts and nearby hospitals',     icon:'alert-circle-outline',route:'/(tabs)/emergency'  },
  { id:'translation',title:'Translation',       description:'Language assistance and interpreting services',               icon:'language-outline',    route:'/(tabs)/translation'},
];

const serviceImgs = [
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop&q=60'
];

export default function Home() {
  const { selectedLanguage, setSelectedLanguage, translateAll } = useTranslation();
  const insets = useSafeAreaInsets();

  const changeLang = async (code:string) => {
    if (code === selectedLanguage) return;
    setSelectedLanguage(code);
    await translateAll(code);
  };

  return (
    <View style={{ flex:1, backgroundColor:'white' }}>
      <StatusBar barStyle="light-content" />
      <ScrollView>

        {/* header */}
        <View style={{ paddingTop:insets.top + 10, paddingBottom:16, paddingHorizontal:16, backgroundColor:theme.colors.primary }}>
          <Text style={{ fontSize:24, fontWeight:'bold', color:'white' }}>Aussist</Text>
          <TText style={{ fontSize:16, color:'white' }}>Welcome to Australia</TText>
        </View>

        <View style={{ padding:16 }}>

          {/* language selector */}
          <TText style={{ fontSize:16, fontWeight:'500', marginBottom:8 }}>Select your language:</TText>
          <View style={{ flexDirection:'row', marginBottom:24 }}>
            {languages.map(l => (
              <TouchableOpacity key={l.code}
                onPress={() => changeLang(l.code)}
                style={{
                  paddingVertical:8, paddingHorizontal:16, borderRadius:20, marginRight:8,
                  backgroundColor: selectedLanguage===l.code ? theme.colors.primary : 'white',
                  borderWidth:1, borderColor: selectedLanguage===l.code ? theme.colors.primary : '#E5E7EB'
                }}>
                <Text style={{ color:selectedLanguage===l.code ? 'white' : '#6B7280' }}>{l.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* quick actions */}
          <TText style={{ fontSize:18, fontWeight:'bold', marginBottom:12 }}>Quick Actions</TText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight:16, marginBottom:32 }}>
            {[
              { label:'Emergency',      icon:'call-outline',      route:'/(tabs)/emergency',   bg:'#FEE2E2', color:'#DC2626' },
              { label:'Healthcare',     icon:'medkit-outline',    route:'/(tabs)/healthcare',  bg:'#E0F2FE', color:'#0284C7' },
              { label:'AI Translate',   icon:'language-outline',  route:'/(tabs)/translation', bg:'#F3E8FF', color:'#7E22CE' },
              { label:'Find Service',   icon:'search-outline',    route:'/',                   bg:'#E3F2FD', color:'#1976D2' }
            ].map((itm,i) => (
              <TouchableOpacity key={i} style={{ alignItems:'center', width:80, marginRight:16 }}
                                onPress={() => router.push(itm.route as any)}>
                <View style={{ backgroundColor:itm.bg, width:56, height:56, borderRadius:28,
                               alignItems:'center', justifyContent:'center', marginBottom:8 }}>
                  <Ionicons name={itm.icon as any} size={24} color={itm.color} />
                </View>
                <TText style={{ textAlign:'center', fontSize: 13 }}>{itm.label}</TText>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* services grid */}
          <TText style={{ fontSize:18, fontWeight:'bold', marginBottom:12 }}>Services for you</TText>
          <View style={{ flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between', marginBottom:24 }}>
            {['Symptom Checker','Find Hospital','Disease Information','Healthcare Support'].map((label,idx) => (
              <TouchableOpacity key={idx} style={{
                width:'48%', backgroundColor:'white', borderRadius:8, overflow:'hidden', marginBottom:16,
                shadowOpacity:0.1, shadowRadius:2, shadowOffset:{ width:0,height:1 }, elevation:2,
                borderWidth:1, borderColor:'#E5E7EB'
              }}>
                <Image source={{ uri:serviceImgs[idx] }} style={{ width:'100%', height:100 }} />
                <TText style={{ padding:8, textAlign:'center', fontWeight:'500' }}>{label}</TText>
              </TouchableOpacity>
            ))}
          </View>

          {/* list section */}
          <TText style={{ fontSize:18, fontWeight:'bold', marginBottom:12 }}>Services & Information</TText>
          {serviceCategories.map(cat => (
            <TouchableOpacity key={cat.id} onPress={() => router.push(cat.route as any)} style={{
              flexDirection:'row', alignItems:'center', padding:16, borderRadius:8,
              backgroundColor:'white', marginBottom:12, borderWidth:1, borderColor:'#E5E7EB'
            }}>
              <Ionicons name={cat.icon as any} size={24} color={theme.colors.primary} style={{ marginRight:16 }} />
              <View style={{ flex:1 }}>
                <TText style={{ fontWeight:'600', marginBottom:4 }}>{cat.title}</TText>
                <TText style={{ fontSize:14, color:'#6B7280' }}>{cat.description}</TText>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
