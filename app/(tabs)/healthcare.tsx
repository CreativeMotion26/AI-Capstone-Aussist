import React, { useState } from 'react';
import { View, ScrollView, StatusBar, TouchableOpacity, Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../_lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TText from '../_components/TText';
import { useTranslation } from '../_context/TranslationContext';

export default function TISPage() {
  const insets = useSafeAreaInsets();
  const { selectedLanguage, setSelectedLanguage, translateAll } = useTranslation();
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ko', name: '한국어' },
    { code: 'zh', name: '中文' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'ar', name: 'Arabic' },
  ];
  const tisNumber = '131 450';

  // 언어 변경 핸들러
  const handleLangChange = async (code: string) => {
    if (code === selectedLanguage) return;
    setSelectedLanguage(code);
    await translateAll(code);
  };

  const PhoneNumberLink = () => (
    <TouchableOpacity
      onPress={() => {
        const phoneNumber = tisNumber.replace(/\s/g, '');
        if (Platform.OS === 'android') {
          Linking.openURL(`tel:${phoneNumber}`);
        } else {
          Linking.openURL(`telprompt:${phoneNumber}`);
        }
      }}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <Ionicons name="call" size={18} color={theme.colors.primary} style={{ marginRight: 2 }} />
      <TText style={{ color: theme.colors.primary, fontWeight: 'bold', textDecorationLine: 'underline', fontSize: 16 }}>{tisNumber}</TText>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />
      {/* 헤더 */}
      <View style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
        <TText style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Translating & Interpreting Service</TText>
      </View>
      <ScrollView>
        <View style={{ padding: 16 }}>
          {/* TIS National 전화 카드 - emergency 스타일 */}
          <View style={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 8,
            marginBottom: 18,
          }}>
            <View style={{
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={{
                backgroundColor: '#F0F9FF',
                width: 42,
                height: 42,
                borderRadius: 21,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <Ionicons name="call" size={20} color={theme.colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <TText style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 16 }}>TIS National</TText>
                <TText style={{ color: '#6B7280', fontSize: 13 }}>24 hours translating & interpreting service</TText>
              </View>
            </View>
            <View style={{
              borderTopWidth: 1,
              borderTopColor: '#E5E7EB',
              padding: 12,
              backgroundColor: '#F9FAFB',
              alignItems: 'center',
            }}>
              <TouchableOpacity
                onPress={() => {
                  const phoneNumber = '131 450'.replace(/\s/g, '');
                  if (Platform.OS === 'android') {
                    Linking.openURL(`tel:${phoneNumber}`);
                  } else {
                    Linking.openURL(`telprompt:${phoneNumber}`);
                  }
                }}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
              >
                <TText style={{ color: '#000', marginRight: 8, fontSize: 15 }}>Click to call</TText>
                <Ionicons name="call" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
                <TText style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 18 }}>131 450</TText>
              </TouchableOpacity>
            </View>
          </View>
          {/* Immediate phone interpreting 확장형(Accordion) 카드 */}
          <ExpandableCard
            title="Immediate phone interpreting"
            content={[
              "TIS National's immediate phone interpreting service is available 24 hours a day, every day of the year by calling 131 450.",
              "The service is available to any individual or organisation in Australia.",
              "You can call TIS National on 131 450 for the cost of a local call throughout Australia. Charges for calls from mobile phones, or from outside of Australia may attract a higher rate depending on the service provider used.",
              "The majority of TIS National interpreting services are free to non-English speakers. Generally the organisation you are contacting will accept the charges for the service."
            ]}
            initiallyExpanded={false}
          />
          {/* 안내 절차 카드도 확장형으로 */}
          <ExpandableCard
            title="How to access an immediate phone interpreter"
            content={[
              "1. Call TIS National on 131 450.",
              "2. An automated prompt will ask you which language you need. Please state the language that you require.",
              "3. When you are connected to a TIS National operator, you will be asked to confirm the language you need.",
              "4. Stay on the line while the operator finds an available interpreter for you. If there are no interpreters available in the language requested, the operator will ask you to call back, or you are able to request an interpreter in another language.",
              "5. The interpreter will tell the TIS National operator who you need to contact and the operator will proceed to call and connect you and the interpreter to the organisation requested."
            ]}
            initiallyExpanded={false}
          />
          {/* Information you need to give us 카드 */}
          <ExpandableCard
            title="Information you need to give us"
            content={[
              "The operator will connect you with an interpreter in the language you asked for. You will be asked to provide:",
              { type: 'list', items: [
                'your name',
                'the name of the organisation you need to contact',
                'the phone number of the organisation you need to contact.'
              ]},
              'You may also be asked for any required information the agency has requested be recorded by TIS National (for example, an identification number or claim number).',
              'The organisation you contact may only be available during their regular business hours and business hours will vary between organisations.'
            ]}
            initiallyExpanded={false}
          />
          {/* Booked interpreting services 카드 */}
          <ExpandableCard
            title="Booked interpreting services"
            content={[
              { type: 'subtitle', text: 'There are three types of booked services available to connect registered agencies with non-English speaking client.' },
              'The services include:',
              { type: 'list', items: [
                'Pre-booked phone interpreting service is available for agency clients to book a phone interpreter in advance of an appointment.',
                'On-site (face-to-face) interpreters can be booked in advance of an appointment to attend a particular location. On-site interpreters can be arranged for any location in Australia (subject to interpreter availability).',
                'Video remote interpreting allows agencies to connect with an interpreter via a video conferencing platform of their choice rather than on-site or via phone. Services are usually booked by the registered organisation or agency that needs to communicate with their non-English speaking client.'
              ]},
              'If an organisation has booked an interpreter for you and you need to cancel the appointment, it is important you tell the organisation as soon as possible.'
            ]}
            initiallyExpanded={false}
          />
        </View>
      </ScrollView>
      <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 0 }}>
        <TText style={{ color: '#6B7280', fontSize: 14, textAlign: 'center' }}>
          Source: https://www.tisnational.gov.au/
        </TText>
      </View>
    </View>
  );
}

// 확장형 카드 컴포넌트 재정의 (content: (string | {type: 'list'|'subtitle', ...})[])
function ExpandableCard({ title, content, initiallyExpanded = false }: { title: string, content: (string | {type: string, [key: string]: any})[], initiallyExpanded?: boolean }) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  return (
    <View style={{
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      marginBottom: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
      overflow: 'hidden',
    }}>
      <TouchableOpacity
        onPress={() => setExpanded(v => !v)}
        style={{ flexDirection: 'row', alignItems: 'center', padding: 16, paddingBottom: 12 }}
        activeOpacity={0.8}
      >
        <TText style={{ fontSize: 20, fontWeight: 'bold', flex: 1 }}>{title}</TText>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={theme.colors.primary} />
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#E5E7EB', marginHorizontal: 20, marginBottom: expanded ? 16 : 0 }} />
      {expanded && (
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          {content.map((item: any, idx: number) => {
            if (typeof item === 'string') {
              return <TText key={idx} style={{ fontSize: 14, marginBottom: 10 }}>{item}</TText>;
            } else if (item.type === 'subtitle') {
              return <TText key={idx} style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{item.text}</TText>;
            } else if (item.type === 'list') {
              return (
                <View key={idx} style={{ marginBottom: 10 }}>
                  {item.items.map((li: string, liIdx: number) => (
                    <View key={liIdx} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
                      <View style={{ width: 16, height: 16, backgroundColor: '#22c55e', borderRadius: 8, marginRight: 12, alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                        <Ionicons name="checkmark" size={12} color="#fff" />
                      </View>
                      <TText style={{ fontSize: 15, flex: 1, flexWrap: 'wrap', marginTop: 0.5 }}>{li}</TText>
                    </View>
                  ))}
                </View>
              );
            }
            return null;
          })}
        </View>
      )}
    </View>
  );
} 