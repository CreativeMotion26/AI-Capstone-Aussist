import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../_lib/theme';
import TText from '../../_components/TText';
import { useTranslation } from '../../_context/TranslationContext';
import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'link' | 'location';
  data?: any;
};

type QuickReply = {
  text: string;
  action: string;
  category?: string;
};

const quickReplies: QuickReply[] = [
  { text: 'Healthcare Services', action: 'healthcare', category: 'service' },
  { text: 'Housing Information', action: 'housing', category: 'service' },
  { text: 'Education Information', action: 'education', category: 'service' },
  { text: 'Visa Information', action: 'visa', category: 'service' },
  { text: 'Emergency Contacts', action: 'emergency', category: 'emergency' },
  { text: 'Public Transport', action: 'transport', category: 'service' },
  { text: 'Find Nearby Hospitals', action: 'find_hospital', category: 'location' },
  { text: 'Find Nearby Pharmacies', action: 'find_pharmacy', category: 'location' },
  { text: 'Find Government Offices', action: 'find_government', category: 'location' },
];

const serviceLinks = {
  healthcare: {
    title: 'Healthcare Service Links',
    links: [
      { text: 'Medicare Website', url: 'https://www.servicesaustralia.gov.au/medicare' },
      { text: 'Private Health Insurance Comparison', url: 'https://www.privatehealth.gov.au/' },
    ]
  },
  housing: {
    title: 'Housing Related Links',
    links: [
      { text: 'Housing Support Programs', url: 'https://www.servicesaustralia.gov.au/housing' },
      { text: 'Rental Information', url: 'https://www.rent.com.au/' },
    ]
  },
  education: {
    title: 'Education Related Links',
    links: [
      { text: 'Department of Education', url: 'https://www.education.gov.au/' },
      { text: 'Student Visa Information', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500' },
    ]
  },
  visa: {
    title: 'Visa Related Links',
    links: [
      { text: 'Department of Home Affairs', url: 'https://immi.homeaffairs.gov.au/' },
      { text: 'Visa Application', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times' },
    ]
  },
};

const affirmativeResponses = ['네', '예', '응', '그래', '좋아', '알겠어', 'yes', 'yeah', 'ok', 'okay'];
const negativeResponses = ['아니요', '아니', '싫어', 'no', 'nope'];

const responses: { [key: string]: any } = {
  healthcare: {
    text: 'Australian healthcare consists of Medicare and private health insurance. Medicare provides basic healthcare services to Australian citizens and permanent residents. Private health insurance covers additional medical services and hospital treatments.',
    links: serviceLinks.healthcare,
  },
  housing: {
    text: 'When looking for housing in Australia, you have the following options:\n1. Renting\n2. Buying\n3. Public Housing\n\nEach state and territory has housing support programs, and you can find detailed information on government websites.',
    links: serviceLinks.housing,
  },
  education: {
    text: 'The Australian education system consists of:\n1. Primary School (ages 6-12)\n2. Secondary School (ages 12-16)\n3. High School (ages 16-18)\n4. University\n\nInternational students need a student visa and may need to provide proof of English proficiency.',
    links: serviceLinks.education,
  },
  visa: {
    text: 'Types of Australian visas include:\n1. Tourist Visa\n2. Student Visa\n3. Work Visa\n4. Permanent Residency\n\nEach visa has different requirements and application procedures. Please refer to the Department of Home Affairs website for accurate information.',
    links: serviceLinks.visa,
  },
  emergency: {
    text: 'Emergency Contacts:\n\n- Police/Ambulance/Fire: 000\n- Police Non-Emergency: 131 444\n- Health Advice: 1800 022 222',
    type: 'emergency',
  },
  transport: {
    text: 'Public transport in Australia mainly consists of:\n1. Buses\n2. Trains\n3. Ferries\n4. Trams\n\nEach state has its own transport card system, and you can check timetables and fares on state transport websites.',
  },
  find_hospital: {
    text: 'To find nearby hospitals, we need your location permission. Would you like to allow access?',
    type: 'location',
    action: 'find_hospital',
  },
  find_pharmacy: {
    text: 'To find nearby pharmacies, we need your location permission. Would you like to allow access?',
    type: 'location',
    action: 'find_pharmacy',
  },
  find_government: {
    text: 'To find nearby government offices, we need your location permission. Would you like to allow access?',
    type: 'location',
    action: 'find_government',
  },
  default: {
    text: 'I apologize, but I cannot find information about that topic. Please select another topic.',
  },
};

const keywords = {
  healthcare: ['의료', '병원', '의사', 'medicare', '의료보험', '건강', '치료', '진료', '약', '약국'],
  housing: ['집', '주택', '아파트', '렌트', '월세', '전세', '부동산', '주거', '살다', '이사'],
  education: ['학교', '교육', '학생', '대학', '공부', '학업', '수업', '등록금', '장학금', '학비'],
  visa: ['비자', '이민', '영주권', '시민권', '체류', '입국', '출국', '여권', '이민국'],
  emergency: ['긴급', '응급', '사고', '위험', '도움', '구조', '119', '경찰', '소방서', '구급차'],
  transport: ['버스', '기차', '지하철', '교통', '이동', '카드', '요금', '정류장', '역', '승차'],
};

const followUpQuestions = {
  healthcare: [
    'Would you like to know how to apply for a Medicare card?',
    'Would you like more information about private health insurance procedures?',
    'Would you like to know about eligibility for free healthcare services?',
  ],
  housing: [
    'Would you like to know how to write a rental agreement?',
    'Would you like to know about the bond system?',
    'Would you like to know how to apply for public housing?',
  ],
  education: [
    'Would you like to know about school registration procedures?',
    'Would you like to know how to apply for scholarships?',
    'Would you like to know about English proficiency requirements?',
  ],
  visa: [
    'Would you like to know about visa application documents?',
    'Would you like to know how to extend your visa?',
    'Would you like to know about permanent residency requirements?',
  ],
};

const contextResponses = {
  medicare_card: {
    text: 'To apply for a Medicare card:\n1. Visit a Medicare center or apply online\n2. Submit identification and proof of residence\n3. Complete the application form\n4. Receive your card (takes about 2-3 weeks)\n\nFor more information, please visit the Medicare website.',
    links: serviceLinks.healthcare,
  },
  health_insurance: {
    text: 'Private health insurance application process:\n1. Choose an insurance provider\n2. Compare insurance plans\n3. Complete the application form\n4. Pay the premium\n\nYou can compare different insurance plans on the private health insurance comparison website.',
    links: serviceLinks.healthcare,
  },
  free_healthcare: {
    text: 'Free healthcare services are available for:\n1. Medicare card holders\n2. Permanent residents\n3. Certain visa holders\n4. Emergency situations\n\nPlease check the Medicare website for exact eligibility requirements.',
    links: serviceLinks.healthcare,
  },
};

const followUpMap: { [key: string]: { context: string, response: any, followUp?: string } } = {
  health_insurance: {
    context: 'medicare_card',
    response: contextResponses.medicare_card,
    followUp: '',
  },
  medicare_card: {
    context: '',
    response: { text: 'You already have the information about applying for a Medicare card. If you need more help, please ask another question.' },
    followUp: '',
  },
  // You can add more follow-up chains for other topics if needed
};

export default function ChatbotPage() {
  const insets = useSafeAreaInsets();
  const { selectedLanguage } = useTranslation();
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am the Aussist chatbot. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [lastTopic, setLastTopic] = useState<string>('');

  useEffect(() => {
    if (params.initialMessage) {
      const initialMessage = params.initialMessage as string;
      handleSend(initialMessage);
    }
  }, [params.initialMessage]);

  const handleLocationPermission = async (action: string) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      
      let url = '';
      switch (action) {
        case 'find_hospital':
          url = `https://www.google.com/maps/search/hospital/@${latitude},${longitude},15z`;
          break;
        case 'find_pharmacy':
          url = `https://www.google.com/maps/search/pharmacy/@${latitude},${longitude},15z`;
          break;
        case 'find_government':
          url = `https://www.google.com/maps/search/government+office/@${latitude},${longitude},15z`;
          break;
      }
      
      if (url) {
        await Linking.openURL(url);
      }
    } else {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: '위치 정보 접근 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
        isUser: false,
        timestamp: new Date(),
        type: 'text',
      }]);
    }
  };

  const findMatchingKeywords = (text: string): string[] => {
    const matches: string[] = [];
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => text.toLowerCase().includes(word.toLowerCase()))) {
        matches.push(category);
      }
    }
    return matches;
  };

  const getFollowUpQuestion = (topic: string): string => {
    const questions = followUpQuestions[topic as keyof typeof followUpQuestions] || [];
    return questions[Math.floor(Math.random() * questions.length)];
  };

  const isAffirmativeResponse = (text: string): boolean => {
    return affirmativeResponses.some(response => 
      text.toLowerCase().includes(response.toLowerCase())
    );
  };

  const isNegativeResponse = (text: string): boolean => {
    return negativeResponses.some(response => 
      text.toLowerCase().includes(response.toLowerCase())
    );
  };

  const handleSend = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
      type: 'text',
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      let response = responses.default;
      let followUp = '';

      if (isAffirmativeResponse(messageText) && lastTopic) {
        if (lastTopic === 'healthcare') {
          if (!conversationContext.includes('health_insurance')) {
            response = contextResponses.health_insurance;
            followUp = 'Would you also like to know how to apply for a Medicare card?';
            setConversationContext(prev => [...prev, 'health_insurance']);
          } else if (!conversationContext.includes('medicare_card')) {
            response = contextResponses.medicare_card;
            followUp = '';
            setConversationContext(prev => [...prev, 'medicare_card']);
          } else {
            response = { text: 'You already have the information about applying for a Medicare card. If you need more help, please ask another question.' };
            followUp = '';
          }
        } else {
          response = responses[lastTopic];
        }
      } else if (isNegativeResponse(messageText)) {
        response = {
          text: 'Please let me know if you need help with anything else.',
        };
      } else {
        const matches = findMatchingKeywords(messageText);
        if (matches.length > 0) {
          const mainTopic = matches[0];
          response = responses[mainTopic];
          setLastTopic(mainTopic);
          followUp = getFollowUpQuestion(mainTopic);
          setConversationContext([]);
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text + (followUp ? `\n\n${followUp}` : ''),
        isUser: false,
        timestamp: new Date(),
        type: response.type || 'text',
        data: response,
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickReply = (action: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: quickReplies.find(reply => reply.action === action)?.text || '',
      isUser: true,
      timestamp: new Date(),
      type: 'text',
    };
    setMessages(prev => [...prev, userMessage]);
    setLastTopic(action);

    setTimeout(() => {
      const response = responses[action] || responses.default;
      const followUp = getFollowUpQuestion(action);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text + (followUp ? `\n\n${followUp}` : ''),
        isUser: false,
        timestamp: new Date(),
        type: response.type || 'text',
        data: response,
      };
      setMessages(prev => [...prev, botMessage]);

      if (response.type === 'location') {
        handleLocationPermission(action);
      }

      setConversationContext(prev => [...prev, action]);
    }, 1000);
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderMessage = (message: Message) => {
    if (message.type === 'link' && message.data?.links) {
      return (
        <View>
          <TText style={{ color: message.isUser ? 'white' : '#1F2937', fontSize: 16, marginBottom: 8 }}>
            {message.data.title}
          </TText>
          {message.data.links.map((link: any, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleLinkPress(link.url)}
              style={{
                backgroundColor: message.isUser ? 'rgba(255,255,255,0.2)' : '#E5E7EB',
                padding: 8,
                borderRadius: 8,
                marginBottom: 4,
              }}
            >
              <TText style={{ color: message.isUser ? 'white' : theme.colors.primary }}>
                {link.text}
              </TText>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    return (
      <TText style={{ color: message.isUser ? 'white' : '#1F2937', fontSize: 16 }}>
        {message.text}
      </TText>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />

      <View style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
        <TText style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Aussist Chatbot</TText>
        <TText style={{ fontSize: 16, color: 'white' }}>Ask anything about living in Australia</TText>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16 }}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={{
                alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  backgroundColor: message.isUser ? theme.colors.primary : '#F3F4F6',
                  padding: 12,
                  borderRadius: 16,
                  borderTopRightRadius: message.isUser ? 4 : 16,
                  borderTopLeftRadius: message.isUser ? 16 : 4,
                }}
              >
                {renderMessage(message)}
              </View>
              <TText
                style={{
                  fontSize: 12,
                  color: '#6B7280',
                  marginTop: 4,
                  alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                }}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </TText>
            </View>
          ))}

          {messages.length > 0 && !messages[messages.length - 1].isUser && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
              {quickReplies.map((reply, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleQuickReply(reply.action)}
                  style={{
                    backgroundColor: '#F3F4F6',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 16,
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  <TText style={{ color: theme.colors.primary }}>{reply.text}</TText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
            backgroundColor: 'white',
          }}
        >
          <TextInput
            style={{
              flex: 1,
              backgroundColor: '#F3F4F6',
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 8,
              marginRight: 8,
              fontSize: 16,
            }}
            placeholder="Type your message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity
            onPress={() => handleSend()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: theme.colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
} 