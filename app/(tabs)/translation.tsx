// app/(tabs)/translation.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE } from '../lib/api';
// app/(tabs)/translation.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE } from '../lib/api';
import TText from '../components/TText';
import { theme } from '../lib/theme';
import { cn } from '../lib/utils';
import { useRouter } from 'expo-router';
//import * as Haptics from 'expo-haptics';
//import Clipboard from '@react-native-clipboard/clipboard';

type Action = {
  type: string;
  content: string;
};

type Msg = { 
  id: string; 
  role: 'user' | 'assistant'; 
  text: string;
  actions?: Action[];
};

export default function TranslationChat() {
  const router = useRouter();
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: '0',
      role: 'assistant',
      text: 'Hello 👋 — I can help you with medical information, emergency services, navigation within the app, and translation. How can I assist you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList<Msg>>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // New function to handle actions from the agent
  const handleAction = (action: Action) => {
    if (action.type === 'CALL') {
      // Handle emergency call
      const phoneMatch = action.content.match(/\d{3}(?:\s\d{3})?(?:\s\d{2})?(?:\s\d{2})?/);
      const phoneNumber = phoneMatch ? phoneMatch[0] : '000';
      
      Alert.alert(
        'Emergency Call',
        `Do you want to call ${phoneNumber}?`,
        [
          {
            text: 'Call',
            onPress: () => Linking.openURL(`tel:${phoneNumber}`),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    } else if (action.type === 'NAVIGATE') {
      // Handle navigation within the app
      const destination = action.content.match(/to\s+(\w+)\s+page/i)?.[1]?.toLowerCase();
      if (destination) {
        // Map destination to route
        const routeMap: Record<string, string> = {
          emergency: '/(tabs)/emergency',
          healthcare: '/(tabs)/healthcare',
          symptoms: '/symptoms/index',
          home: '/(tabs)',
          profile: '/(tabs)/profile',
          translation: '/(tabs)/translation',
<<<<<<< Updated upstream
          hospital: '/symptoms/hospital',
          banking: '/(tabs)/banking',
          education: '/(tabs)/education'
=======
>>>>>>> Stashed changes
        };
        
        const route = routeMap[destination];
        if (route) {
          Alert.alert(
            'Navigate',
            `Navigate to ${destination} page?`,
            [
              {
                text: 'Go',
<<<<<<< Updated upstream
                onPress: () => {
                  router.push(route as any);
                },
=======
                onPress: () => router.push(route),
>>>>>>> Stashed changes
              },
              {
                text: 'Stay Here',
                style: 'cancel',
              },
            ]
          );
<<<<<<< Updated upstream
        } else {
          Alert.alert('Navigation Error', `Cannot navigate to ${destination} page.`);
=======
>>>>>>> Stashed changes
        }
      }
    } else if (action.type === 'TRANSLATE') {
      // Handle translation
<<<<<<< Updated upstream
=======
      // For now just display the translation in a dialog
>>>>>>> Stashed changes
      const translateContent = action.content;
      
      Alert.alert(
        'Translation',
        translateContent,
        [{ text: 'OK' }]
      );
    }
  };

  async function send() {
    if (!input.trim() || loading) return;


    const userMsg: Msg = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setIsTyping(true);
    setLoading(true);

    try {
      const REQUEST_TIMEOUT = 120000;         
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT);
      
      const REQUEST_TIMEOUT = 60000;          // 60 s – adjust later

    const ctrl   = new AbortController();
    const timer  = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT);
      // inside send()
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ question: userMsg.text }),
        signal: ctrl.signal
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`HTTP ${res.status}: ${errorData.detail || 'Unknown error'}`);
      }

      clearTimeout(timer);
      const data = await res.json();
      
      // Process the actions if present
      const actions = data.actions || [];
      
      const botMsg: Msg = {
        id: Date.now() + 'b',
        role: 'assistant',
        text: data.answer + (data.sources && data.sources.length > 0 ? '\n\nSources:\n' + data.sources.slice(0, 2).map((s: any) => `- ${s.content} (${s.url || 'No URL available'})`).join('\n') : ''),
        actions: actions,
      };
      
      setMessages(prev => [...prev, botMsg]);
      
      // Automatically handle actions if present
      if (actions && actions.length > 0) {
        // Delay action handling a bit to allow the message to be seen first
        setTimeout(() => {
          actions.forEach(handleAction);
        }, 500);
      }
    } catch (e: any) {
      console.error('Error details:', e);
      let errorMessage = 'Unknown error';
      
      if (e.name === 'AbortError') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (e.message) {
        errorMessage = e.message;
      }
      
      const errMsg: Msg = {
        id: Date.now() + 'e',
        role: 'assistant',
        text: '⚠️ Sorry, I could not reach the server.',
      };
      setMessages(prev => [...prev, errMsg]);
      console.error(e);
    } finally {
      setLoading(false);
      // ensure we scroll after RN finished layout
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
    }
  }

  const renderItem = ({ item }: { item: Msg }) => {
    const user = item.role === 'user';
    return (
      <Pressable
        onLongPress={() => {
          Alert.alert(
            'Copy Message',
            'Would you like to copy this message?',
            [
              {
                text: 'Copy',
                onPress: () => {
                  Alert.alert('Success', 'Message copied to clipboard');
                },
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ]
          );
        }}
      >
      <View
        style={{
          alignSelf: user ? 'flex-end' : 'flex-start',
            backgroundColor: user ? theme.colors.primary : '#F1F2F6',
            borderRadius: 20,
            paddingVertical: 12,
          paddingHorizontal: 16,
          maxWidth: '80%',
            marginVertical: 8,
            marginHorizontal: 4,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <TText 
            selectable={true}
            style={{ 
              color: user ? 'white' : '#222', 
              fontSize: 16,
              lineHeight: 24,
              letterSpacing: 0.3,
            }}
          >
            {mainText}
          </TText>
          
          {/* Render action buttons if present */}
          {!user && item.actions && item.actions.length > 0 && (
            <View style={{ marginTop: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
              {item.actions.map((action, idx) => {
                // Choose icon based on action type
                let iconName = "alert-circle";
                let color = theme.colors.primary;
                
                if (action.type === 'CALL') {
                  iconName = "call";
                  color = theme.colors.error;
                } else if (action.type === 'NAVIGATE') {
                  iconName = "navigate";
                  color = theme.colors.secondary;
                } else if (action.type === 'TRANSLATE') {
                  iconName = "language";
                  color = theme.colors.info;
                }
                
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleAction(action)}
                    style={{
                      backgroundColor: '#fff',
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 16,
                      marginRight: 8,
                      marginTop: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
<<<<<<< Updated upstream
          shadowColor: '#000',
                      shadowOpacity: 0.1,
          shadowRadius: 2,
          shadowOffset: { width: 0, height: 1 },
                      elevation: 2,
        }}
      >
=======
                      shadowColor: '#000',
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      shadowOffset: { width: 0, height: 1 },
                      elevation: 2,
                    }}
                  >
>>>>>>> Stashed changes
                    <Ionicons name={iconName as any} size={16} color={color} style={{ marginRight: 6 }} />
                    <TText style={{ color: '#333', fontWeight: '500' }}>
                      {action.type}
                    </TText>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          
          {/* Sources section */}
          {sources.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <TText 
                selectable={true}
                style={{ 
                  color: user ? 'rgba(255,255,255,0.8)' : '#666', 
                  fontSize: 14, 
                  fontWeight: 'bold',
                  marginBottom: 8,
                }}
              >
                Sources:
              </TText>
              {sources.map((source, index) => {
                const urlMatch = source.match(/\((.*?)\)$/);
                const url = urlMatch ? urlMatch[1] : null;
                const content = source.replace(/\(.*?\)$/, '').trim();
                
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => url && handleSourcePress(url)}
                    style={{ 
                      marginTop: 6,
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      backgroundColor: user ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.05)',
                      borderRadius: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons 
                      name="document-text-outline" 
                      size={16} 
                      color={user ? 'white' : theme.colors.primary} 
                      style={{ marginRight: 8 }}
                    />
                    <TText 
                      selectable={true}
                      style={{ 
                        color: user ? 'white' : theme.colors.primary, 
                        fontSize: 14, 
                        textDecorationLine: 'underline',
                        flex: 1,
                        lineHeight: 20,
                      }}
                      numberOfLines={2}
                    >
                      {content}
        </TText>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
      </View>
      </Pressable>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#F8F9FB', marginBottom:10 }}
      keyboardVerticalOffset={10}
    >
      <Animated.View 
        style={{ 
          flex: 1, 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: 8, paddingTop: 60 }}>
          <View style={{ 
            width: '70%',
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: 16,
            backgroundColor: 'white',
            paddingVertical: 12,
            borderRadius: 16,
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          }}>
        <Ionicons name="chatbubbles" size={28} color={theme.colors.primary} style={{ marginRight: 8 }} />
        <TText style={{ fontSize: 20, fontWeight: 'bold', color: '#222' }}>Aussist AI Chatbot</TText>
      </View>
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={m => m.id}
        renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 24 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
      />

          {isTyping && (
            <View style={{ 
              alignSelf: 'flex-start',
              backgroundColor: '#F1F2F6',
              borderRadius: 20,
              paddingVertical: 12,
              paddingHorizontal: 16,
              marginVertical: 4,
              marginLeft: 8,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator size="small" color="#666" style={{ marginRight: 8 }} />
                <TText style={{ color: '#666', fontSize: 14 }}>Processing...</TText>
              </View>
            </View>
          )}

      {/* input bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
              marginHorizontal: 8,
              marginTop: 8,
          backgroundColor: '#fff',
          borderRadius: 24,
              paddingHorizontal: 16,
          shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
              elevation: 4,
              marginBottom: 0,
        }}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
              style={{ 
                height: 44, 
                flex: 1, 
                fontSize: 16,
                paddingVertical: 8,
              }}
          placeholderTextColor="#aaa"
              multiline
              maxLength={500}
        />
        {loading && <ActivityIndicator size="small" style={{ marginRight: 8 }} />}
        <TouchableOpacity
          onPress={send}
          style={{
                backgroundColor: input.trim() ? theme.colors.primary : '#E5E7EB',
            borderRadius: 20,
            padding: 8,
            marginLeft: 4,
                transform: [{ scale: input.trim() ? 0.9 : 0.8 }],
          }}
          disabled={!input.trim() || loading}
        >
          <Ionicons
            name="send"
            size={24}
            color={input.trim() ? 'white' : '#9ca3af'}
          />
        </TouchableOpacity>
      </View>
    </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
