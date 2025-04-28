import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import OpalCardsImg from '../assets/OpalCards.jpg';
import ContactlessImg from '../assets/contactless.jpg';
import OpalImg from '../assets/opal.jpg';
import AdultOpalCardImg from '../assets/AdultOpalCard.jpg';
import ChildConcessionImg from '../assets/ChildConcession.jpg';
import GoldenOpalCardImg from '../assets/GoldenOpalCard.jpg';
import TransportImg from '../assets/Transport.jpg';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const waysToPay = [
  {
    id: '1',
    title: 'Opal Card',
    desc: 'Pay with your Opal card',
    url: 'https://transportnsw.info/tickets-fares/opal',
    image: OpalCardsImg,
  },
  {
    id: '2',
    title: 'Contactless Payments',
    desc: 'Pay with your own card or device',
    url: 'https://transportnsw.info/tickets-fares/contactless-payments',
    image: ContactlessImg,
  },
  {
    id: '3',
    title: 'Opal Single Tickets',
    desc: 'Pay with an Opal single ticket',
    url: 'https://transportnsw.info/tickets-fares/fares/opal-single-tickets',
    image: OpalImg,
  },
];

const faresCards = [
  {
    id: 'fares-adults',
    title: 'Adults',
    desc: 'Check out the fare for each transport for Adults',
    content: <TransportAccordion type="adults" />,
    image: AdultOpalCardImg
  },
  {
    id: 'fares-children',
    title: 'Children & Concession',
    desc: 'Check out the fare for each transport for Children & Concession',
    content: <TransportAccordion type="children" />,
    image: ChildConcessionImg
  },
  {
    id: 'fares-seniors',
    title: 'Seniors and Pensioners',
    desc: 'Check out the fare for each transport for Seniors and Pensioners',
    content: <TransportAccordion type="seniors" />,
    image: GoldenOpalCardImg
  },
  {
    id: 'fares-peak',
    title: 'Peak Time',
    desc: 'Check out peak & off-peak time and avoid peak fares',
    content: (
      <View style={{ alignItems: 'center', marginTop: 8 }}>
        <View style={{ 
          borderRadius: 8, 
          overflow: 'hidden', 
          borderWidth: 1, 
          borderColor: '#eee', 
          backgroundColor: '#fff', 
          width: '110%' 
        }}>
          {/* 헤더: 시간대 */}
          <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2' }}>
            <Text style={{ flex: 1.4, fontWeight: 'bold', color: '#222', padding: 8, textAlign: 'center', borderRightWidth: 1, borderColor: '#eee' }}> </Text>
            <Text style={{ flex: 2.6, fontWeight: 'bold', color: '#222', padding: 8, textAlign: 'center', borderRightWidth: 1, borderColor: '#eee' }}>Morning</Text>
            <Text style={{ flex: 2.6, fontWeight: 'bold', color: '#222', padding: 8, textAlign: 'center' }}>Evening</Text>
          </View>
          {/* Metro and Train (M/T) */}
          <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: '#eee' }}>
            <View style={{ flex: 1.4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderColor: '#eee', padding: 8 }}>
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#00857c', justifyContent: 'center', alignItems: 'center', marginRight: 2 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>M</Text>
              </View>
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#e87722', justifyContent: 'center', alignItems: 'center', marginLeft: 2 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>T</Text>
              </View>
            </View>
            <Text style={{ flex: 2.6, color: '#222', padding: 8, textAlign: 'center', borderRightWidth: 1, borderColor: '#eee' }}>6:30am – 10am</Text>
            <Text style={{ flex: 2.6, color: '#222', padding: 8, textAlign: 'center' }}>3pm – 7pm</Text>
          </View>
          {/* Intercity Trains (T + *(i)) */}
          <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: '#eee' }}>
            <View style={{ flex: 1.4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderColor: '#eee', padding: 8 }}>
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#e87722', justifyContent: 'center', alignItems: 'center', marginRight: 4 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>T</Text>
              </View>
              <Text style={{ color: '#888', fontWeight: 'bold', fontSize: 14 }}>*(i)</Text>
            </View>
            <Text style={{ flex: 2.6, color: '#222', padding: 8, textAlign: 'center', borderRightWidth: 1, borderColor: '#eee' }}>6am – 10am</Text>
            <Text style={{ flex: 2.6, color: '#222', padding: 8, textAlign: 'center' }}>3pm – 7pm</Text>
          </View>
          {/* Bus and Light Rail (B/L) */}
          <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: '#eee' }}>
            <View style={{ flex: 1.4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderColor: '#eee', padding: 8 }}>
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#00a3e0', justifyContent: 'center', alignItems: 'center', marginRight: 2 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>B</Text>
              </View>
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#e4002b', justifyContent: 'center', alignItems: 'center', marginLeft: 2 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>L</Text>
              </View>
            </View>
            <Text style={{ flex: 2.6, color: '#222', padding: 8, textAlign: 'center', borderRightWidth: 1, borderColor: '#eee' }}>6:30am – 10am</Text>
            <Text style={{ flex: 2.6, color: '#222', padding: 8, textAlign: 'center' }}>3pm – 7pm</Text>
          </View>
        </View>
        {/* 표 하단 안내 텍스트 */}
        <Text style={{ fontSize: 14, color: '#888', marginTop: 4, marginLeft: 2, textAlign: 'left' }}>*(i): Intercity</Text>
      </View>
    ),
    image: TransportImg
  },
];

const dailyAndWeeklyCaps = [
  {
    id: 'caps-adults',
    title: 'Adults',
    desc: 'Cab for Adults',
    content: '• $18.70 a day (Mondays to Thursdays)\n• $9.35 on Fridays, Saturdays, Sundays, and public holidays\n• $50 a week',
    image: AdultOpalCardImg,
  },
  {
    id: 'caps-children',
    title: 'Children & Concession',
    desc: 'Cab for Children & Concession',
    content: '• $9.35 a day (Monday to Thursdays)\n• $4.65 on Friday, Saturday, Sunday and public holidays\n• $25 a week',
    image: ChildConcessionImg,
  },
  {
    id: 'caps-seniors',
    title: 'Seniors and Pensioners',
    desc: 'Cab for Seniors and Pensioners',
    content: '• $2.50 a day\n• $17.50 a week',
    image: GoldenOpalCardImg,
  }
];

const managePayments = [
  {
    id: '1',
    title: 'Manage your cards',
    url: 'https://transportnsw.info/tickets-fares/opal/manage-your-card',
  },
  {
    id: '2',
    title: 'Transport Connect',
    url: 'https://transportnsw.info/tickets-fares/fares/transport-connect',
  },
  {
    id: '3',
    title: 'Download Opal Travel App',
    url: 'https://transportnsw.info/apps/opal-travel',
  },
];

function TransportAccordion({ type }) {
  const [selected, setSelected] = useState(null);

  // 교통수단별 데이터 정의
  const data = {
    adults: {
      metroTrain: {
        icon: (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#00857c', justifyContent: 'center', alignItems: 'center', marginRight: 2 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>M</Text>
            </View>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#e87722', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>T</Text>
            </View>
          </View>
        ),
        table: (
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', paddingVertical: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingLeft: 4 }}>Distance</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center' }}>Peak</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingRight: 4 }}>Off-peak</Text>
            </View>
            {[
              ['0 - 10km', '$4.20', '$2.94'],
              ['10 – 20km', '$5.22', '$3.65'],
              ['20 – 35km', '$6.01', '$4.20'],
              ['36 – 65km', '$8.03', '$5.62'],
              ['65+km', '$10.33', '$7.23'],
            ].map((row, idx) => (
              <View key={idx} style={{ flexDirection: 'row', backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9', paddingVertical: 6 }}>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingLeft: 4 }}>{row[0]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center' }}>{row[1]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingRight: 4 }}>{row[2]}</Text>
              </View>
            ))}
          </View>
        )
      },
      bus: {
        icon: (
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#00a3e0', justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>B</Text>
          </View>
        ),
        table: (
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', paddingVertical: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingLeft: 4 }}>Distance</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center' }}>Peak</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingRight: 4 }}>Off-peak</Text>
            </View>
            {[
              ['0 –3km', '$3.20', '$2.24'],
              ['3 –8km', '$4.36', '$3.05'],
              ['8+km', '$5.60', '$3.92'],
            ].map((row, idx) => (
              <View key={idx} style={{ flexDirection: 'row', backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9', paddingVertical: 6 }}>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingLeft: 4 }}>{row[0]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center' }}>{row[1]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingRight: 4 }}>{row[2]}</Text>
              </View>
            ))}
          </View>
        )
      },
      ferry: {
        icon: (
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#59bb47', justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>F</Text>
          </View>
        ),
        table: (
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', paddingVertical: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
              <Text style={{ flex: 2.5, fontWeight: 'bold', color: '#222', textAlign: 'left', paddingLeft: 4 }}>Distance</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingRight: 4 }}>Fare</Text>
            </View>
            {[
              ['0 - 9 km', '$7.13'],
              ['9+ km', '$8.92'],
              ['Newcastle Stockton ferry 0-3 km', '$3.20'],
            ].map((row, idx) => (
              <View key={idx} style={{ flexDirection: 'row', backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9', paddingVertical: 6 }}>
                <Text style={{ flex: 2.5, color: '#222', textAlign: 'left', paddingLeft: 4 }}>{row[0]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingRight: 4 }}>{row[1]}</Text>
              </View>
            ))}
          </View>
        )
      },
      lightrail: {
        icon: (
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#e4002b', justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>L</Text>
          </View>
        ),
        table: (
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', paddingVertical: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingLeft: 4 }}>Distance</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center' }}>Peak</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingRight: 4 }}>Off-peak</Text>
            </View>
            {[
              ['0 –3 km', '$3.20', '$2.24'],
              ['3 –8km', '$4.36', '$3.05'],
              ['8+km', '$5.60', '$3.92'],
            ].map((row, idx) => (
              <View key={idx} style={{ flexDirection: 'row', backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9', paddingVertical: 6 }}>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingLeft: 4 }}>{row[0]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center' }}>{row[1]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingRight: 4 }}>{row[2]}</Text>
              </View>
            ))}
          </View>
        )
      }
    },
    children: {
      metroTrain: {
        icon: (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#00857c', justifyContent: 'center', alignItems: 'center', marginRight: 2 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>M</Text>
            </View>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#e87722', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>T</Text>
            </View>
          </View>
        ),
        table: (
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', paddingVertical: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingLeft: 4 }}>Distance</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center' }}>Peak</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingRight: 4 }}>Off-peak</Text>
            </View>
            {[
              ['0 - 10 km', '$2.10', '$1.47'],
              ['10 - 20 km', '$2.61', '$1.82'],
              ['20 -35 km', '$3.00', '$2.10'],
              ['35 -65 km', '$4.01', '$2.80'],
              ['65+ km', '$5.16', '$3.61'],
            ].map((row, idx) => (
              <View key={idx} style={{ flexDirection: 'row', backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9', paddingVertical: 6 }}>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingLeft: 4 }}>{row[0]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center' }}>{row[1]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingRight: 4 }}>{row[2]}</Text>
              </View>
            ))}
          </View>
        )
      },
      bus: {
        icon: (
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#00a3e0', justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>B</Text>
          </View>
        ),
        table: (
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', paddingVertical: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingLeft: 4 }}>Distance</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center' }}>Peak</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingRight: 4 }}>Off-peak</Text>
            </View>
            {[
              ['0 –3km', '$1.60', '$1.12'],
              ['3 –8km', '$2.18', '$1.52'],
              ['8+km', '$2.80', '$1.96'],
            ].map((row, idx) => (
              <View key={idx} style={{ flexDirection: 'row', backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9', paddingVertical: 6 }}>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingLeft: 4 }}>{row[0]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center' }}>{row[1]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingRight: 4 }}>{row[2]}</Text>
              </View>
            ))}
          </View>
        )
      },
      ferry: {
        icon: (
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#59bb47', justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>F</Text>
          </View>
        ),
        table: (
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', paddingVertical: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
              <Text style={{ flex: 2.5, fontWeight: 'bold', color: '#222', textAlign: 'left', paddingLeft: 4 }}>Distance</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingRight: 4 }}>Fare</Text>
            </View>
            {[
              ['0 - 9 km', '$3.56'],
              ['9+ km', '$4.46'],
              ['Newcastle Stockton ferry', '$1.60'],
            ].map((row, idx) => (
              <View key={idx} style={{ flexDirection: 'row', backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9', paddingVertical: 6 }}>
                <Text style={{ flex: 2.5, color: '#222', textAlign: 'left', paddingLeft: 4 }}>{row[0]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingRight: 4 }}>{row[1]}</Text>
              </View>
            ))}
          </View>
        )
      },
      lightrail: {
        icon: (
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#e4002b', justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>L</Text>
          </View>
        ),
        table: (
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', paddingVertical: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingLeft: 4 }}>Distance</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center' }}>Peak</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingRight: 4 }}>Off-peak</Text>
            </View>
            {[
              ['0 –3 km', '$1.60', '$1.12'],
              ['3 –8 km', '$2.18', '$1.52'],
              ['8+ km', '$2.80', '$1.96'],
            ].map((row, idx) => (
              <View key={idx} style={{ flexDirection: 'row', backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9', paddingVertical: 6 }}>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingLeft: 4 }}>{row[0]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center' }}>{row[1]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingRight: 4 }}>{row[2]}</Text>
              </View>
            ))}
          </View>
        )
      }
    },
    seniors: {
      metroTrain: {
        icon: (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#00857c', justifyContent: 'center', alignItems: 'center', marginRight: 2 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>M</Text>
            </View>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#e87722', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>T</Text>
            </View>
          </View>
        ),
        table: (
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', paddingVertical: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingLeft: 4 }}>Distance</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center' }}>Peak</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingRight: 4 }}>Off-peak</Text>
            </View>
            {[
              ['0 - 10 km', '$2.10', '$1.47'],
              ['10 - 20 km', '$2.50', '$1.82'],
              ['20 -35 km', '$2.50', '$2.10'],
              ['35 -65 km', '$2.50', '$2.50'],
              ['65+ km', '$2.50', '$2.50'],
            ].map((row, idx) => (
              <View key={idx} style={{ flexDirection: 'row', backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9', paddingVertical: 6 }}>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingLeft: 4 }}>{row[0]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center' }}>{row[1]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingRight: 4 }}>{row[2]}</Text>
              </View>
            ))}
          </View>
        )
      },
      bus: {
        icon: (
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#00a3e0', justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>B</Text>
          </View>
        ),
        table: (
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', paddingVertical: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingLeft: 4 }}>Distance</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center' }}>Peak</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingRight: 4 }}>Off-peak</Text>
            </View>
            {[
              ['0 –3 km', '$1.60', '$1.12'],
              ['3 –8 km', '$2.18', '$1.52'],
              ['8+ km', '$2.50', '$1.96'],
            ].map((row, idx) => (
              <View key={idx} style={{ flexDirection: 'row', backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9', paddingVertical: 6 }}>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingLeft: 4 }}>{row[0]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center' }}>{row[1]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingRight: 4 }}>{row[2]}</Text>
              </View>
            ))}
          </View>
        )
      },
      ferry: {
        icon: (
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#59bb47', justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>F</Text>
          </View>
        ),
        table: (
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', paddingVertical: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
              <Text style={{ flex: 2.5, fontWeight: 'bold', color: '#222', textAlign: 'left', paddingLeft: 4 }}>Distance</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingRight: 4 }}>Peak</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingRight: 4 }}>Off-peak</Text>
            </View>
            {[
              ['0 - 9 km', '$2.50 (daily cap)', '$2.50 (daily cap)'],
              ['9+ km', '$2.50 (daily cap)', '$2.50 (daily cap)'],
              ['Newcastle Stockton ferry', '$1.60', '$1.12'],
            ].map((row, idx) => (
              <View key={idx} style={{ flexDirection: 'row', backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9', paddingVertical: 6 }}>
                <Text style={{ flex: 2.5, color: '#222', textAlign: 'left', paddingLeft: 4 }}>{row[0]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingRight: 4 }}>{row[1]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingRight: 4 }}>{row[2]}</Text>
              </View>
            ))}
          </View>
        )
      },
      lightrail: {
        icon: (
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#e4002b', justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>L</Text>
          </View>
        ),
        table: (
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', paddingVertical: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingLeft: 4 }}>Distance</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center' }}>Peak</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', color: '#222', textAlign: 'center', paddingRight: 4 }}>Off-peak</Text>
            </View>
            {[
              ['0 –3 km', '$1.60', '$1.12'],
              ['3 –8 km', '$2.18', '$1.52'],
              ['8+ km', '$2.50', '$1.96'],
            ].map((row, idx) => (
              <View key={idx} style={{ flexDirection: 'row', backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9', paddingVertical: 6 }}>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingLeft: 4 }}>{row[0]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center' }}>{row[1]}</Text>
                <Text style={{ flex: 1, color: '#222', textAlign: 'center', paddingRight: 4 }}>{row[2]}</Text>
              </View>
            ))}
          </View>
        )
      }
    }
  };

  const group = type === 'adults' ? data.adults : type === 'children' ? data.children : data.seniors;

  return (
    <View>
      <View style={{ flexDirection: 'row', marginTop: 8, marginBottom: 4, backgroundColor: '#f5f5f5', borderRadius: 8, padding: 4 }}>
        <TouchableOpacity 
          onPress={() => setSelected('metroTrain')} 
          style={[
            styles.transportTab,
            selected === 'metroTrain' && styles.selectedTransportTab
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {group.metroTrain.icon}
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setSelected('bus')} 
          style={[
            styles.transportTab,
            selected === 'bus' && styles.selectedTransportTab
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {group.bus.icon}
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setSelected('ferry')} 
          style={[
            styles.transportTab,
            selected === 'ferry' && styles.selectedTransportTab
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {group.ferry.icon}
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setSelected('lightrail')} 
          style={[
            styles.transportTab,
            selected === 'lightrail' && styles.selectedTransportTab
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {group.lightrail.icon}
          </View>
        </TouchableOpacity>
      </View>
      {selected && group[selected] && group[selected].table}
    </View>
  );
}

export default function TicketsAndFares({ navigation }) {
  const [expanded, setExpanded] = useState([]);
  const scrollViewRef = useRef(null);
  const animatedValues = useRef({});
  const scrollPosition = useRef(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: scrollPosition.current, animated: false });
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleScroll = (event) => {
    scrollPosition.current = event.nativeEvent.contentOffset.y;
  };

  const handleAccordion = (id) => {
    if (!animatedValues.current[id]) {
      animatedValues.current[id] = new Animated.Value(0);
    }

    const currentScrollPosition = scrollPosition.current;

    if (expanded.includes(id)) {
      Animated.timing(animatedValues.current[id], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setExpanded(expanded.filter(e => e !== id));
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y: currentScrollPosition, animated: false });
        }
      });
    } else {
      setExpanded([...expanded, id]);
      Animated.timing(animatedValues.current[id], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y: currentScrollPosition, animated: false });
        }
      });
    }
  };

  const handleCardPress = (url) => {
    if (url) {
      navigation.navigate('TransportWebView', { url });
    }
  };

  const renderAccordionContent = (item) => {
    const height = animatedValues.current[item.id]?.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <Animated.View style={{ 
        opacity: height,
        transform: [{
          translateY: height.interpolate({
            inputRange: [0, 1],
            outputRange: [-100, 0]
          })
        }]
      }}>
        <View style={{ marginTop: 8, padding: 12 }}>
          {typeof item.content === 'string' ? (
            item.content.split('\n').map((line, index) => (
              <Text key={index} style={styles.accordionText}>{line}</Text>
            ))
          ) : (
            item.content
          )}
        </View>
      </Animated.View>
    );
  };

  return (
    <ScrollView 
      ref={scrollViewRef} 
      style={styles.container} 
      contentContainerStyle={{paddingBottom: 32}}
      scrollEventThrottle={16}
      onScroll={handleScroll}
    >
      {/* 헤더 1 */}
      <Text style={styles.sectionHeader}>Ways to pay</Text>
      <Text style={{ fontSize: 14, color: '#444', marginBottom: 8 }}>
        Find out your way to pay with various options
      </Text>
      <View style={styles.cardGroup}>
        {/* Opal Card */}
        <View>
          <TouchableOpacity style={styles.card} onPress={() => handleCardPress(waysToPay[0].url)}>
            {waysToPay[0].image && (
              <Image source={waysToPay[0].image} style={styles.cardImage} resizeMode="contain" />
            )}
            <View style={styles.cardTextBox}>
              <Text style={styles.cardTitle}>{waysToPay[0].title}</Text>
              {waysToPay[0].desc && <Text style={styles.cardDesc}>{waysToPay[0].desc}</Text>}
            </View>
          </TouchableOpacity>
        </View>
        {/* Contactless Payments */}
        <View>
          <TouchableOpacity style={styles.card} onPress={() => handleCardPress(waysToPay[1].url)}>
            {waysToPay[1].image && (
              <Image source={waysToPay[1].image} style={styles.cardImage} resizeMode="contain" />
            )}
            <View style={styles.cardTextBox}>
              <Text style={styles.cardTitle}>{waysToPay[1].title}</Text>
              {waysToPay[1].desc && <Text style={styles.cardDesc}>{waysToPay[1].desc}</Text>}
            </View>
          </TouchableOpacity>
        </View>
        {/* Opal Single Tickets */}
        <View>
          <TouchableOpacity style={styles.card} onPress={() => handleCardPress(waysToPay[2].url)}>
            {waysToPay[2].image && (
              <Image source={waysToPay[2].image} style={styles.cardImage} resizeMode="contain" />
            )}
            <View style={styles.cardTextBox}>
              <Text style={styles.cardTitle}>{waysToPay[2].title}</Text>
              {waysToPay[2].desc && <Text style={styles.cardDesc}>{waysToPay[2].desc}</Text>}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* 새 헤더: Fares */}
      <Text style={styles.sectionHeader}>Fares</Text>
      <Text style={{ fontSize: 14, color: '#444', marginBottom: 8 }}>
        Check out how much you pay for Metro, Train, Bus, Ferry, and Light Rail
      </Text>
      <View style={styles.cardGroup}>
        {faresCards.map(item => {
          return (
            <View key={item.id} style={{ marginBottom: 10 }}>
              <View style={[styles.card, { flexDirection: 'column', alignItems: 'stretch' }]}> 
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {item.image && (
                    <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
                  )}
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                      onPress={() => handleAccordion(item.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Ionicons
                        name={expanded.includes(item.id) ? 'chevron-up' : 'chevron-down'}
                        size={22}
                        color="#888"
                        style={{ marginLeft: 8 }}
                      />
                    </TouchableOpacity>
                    {item.desc && (
                      <Text style={styles.cardDesc}>{item.desc}</Text>
                    )}
                  </View>
                </View>
                {expanded.includes(item.id) && renderAccordionContent(item)}
              </View>
            </View>
          );
        })}
      </View>

      {/* 헤더 2 */}
      <Text style={styles.sectionHeader}>Daily and Weekly Caps</Text>
      <Text style={{ fontSize: 14, color: '#444', marginBottom: 8 }}>
        Travel as much as you want within the Opal network and you never pay more than below:
      </Text>
      <View style={styles.cardGroup}>
        {dailyAndWeeklyCaps.map(item => {
          return (
            <View key={item.id} style={{ marginBottom: 10 }}>
              <View style={[styles.card, { flexDirection: 'column', alignItems: 'stretch' }]}> 
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {item.image && (
                    <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
                  )}
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                      onPress={() => handleAccordion(item.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Ionicons
                        name={expanded.includes(item.id) ? 'chevron-up' : 'chevron-down'}
                        size={22}
                        color="#888"
                        style={{ marginLeft: 8 }}
                      />
                    </TouchableOpacity>
                    {item.desc && (
                      <Text style={styles.cardDesc}>{item.desc}</Text>
                    )}
                  </View>
                </View>
                {expanded.includes(item.id) && renderAccordionContent(item)}
              </View>
            </View>
          );
        })}
      </View>

      {/* 헤더 3 */}
      <Text style={styles.sectionHeader}>Manage your payments</Text>
      <Text style={{ fontSize: 14, color: '#444', marginBottom: 8 }}>
        Manage your Opal card, register for Transport Connect, and download the Opal Travel app
      </Text>
      <View style={styles.cardGroup}>
        {managePayments.map((card, idx) => {
          let icon = null;
          if (card.title === 'Manage your cards') {
            icon = <Ionicons name="card-outline" size={22} color="#222" style={{ marginRight: 10 }} />;
          } else if (card.title === 'Transport Connect') {
            icon = <Ionicons name="link-outline" size={22} color="#222" style={{ marginRight: 10 }} />;
          } else if (card.title === 'Download Opal Travel App') {
            icon = <Ionicons name="download-outline" size={22} color="#222" style={{ marginRight: 10 }} />;
          }
          return (
            <View key={card.id}>
              <TouchableOpacity style={styles.card} onPress={() => handleCardPress(card.url)}>
                {/* 카드별 아이콘 */}
                {icon}
                <Text style={styles.cardTitle}>{card.title}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    paddingTop: 0,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 8,
    marginBottom: 2,
  },
  cardGroup: {
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImage: {
    width: 70,
    height: 40,
    borderRadius: 8,
    marginRight: 14,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  cardTextBox: {
    flex: 1,
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
  },
  cardDesc: {
    fontSize: 13,
    color: '#888',
    marginLeft: 0,
  },
  accordionText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 6,
  },
  transportTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 2,
  },
  selectedTransportTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transportText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  selectedTransportText: {
    color: '#222',
    fontWeight: 'bold',
  },
});
