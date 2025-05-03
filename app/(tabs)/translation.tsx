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
import axios from 'axios';
import { API_KEY } from '@env';

const translationServices = [
  {
    title: 'TIS National',
    description: 'Free telephone interpreting service',
    phone: '131 450',
    available: '24/7',
    type: 'Government Service',
  },
  {
    title: 'On-site Interpreter',
    description: 'Book an interpreter for in-person assistance',
    type: 'Professional Service',
  },
];

// Replace with your actual API key
// const API_KEY = 'AIzaSyCrJ08nSLPdTpE6sn2P9x4i8UN80Yd-Gtw';
const BASE_URL = 'https://translation.googleapis.com/language/translate/v2';

const translateText = async (text: string, targetLanguage: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: text,
        target: targetLanguage,
        key: API_KEY,
      },
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};

export default function TranslationPage() {
  const [translatedHeader, setTranslatedHeader] = useState('Translation Services');

  const handleTranslateKo = async () => {
    const result = await translateText('Translation Services', 'ko');
    setTranslatedHeader(result);
  };

  const handleTranslateEn = async () => {
    const result = await translateText('Translation Services', 'en');
    setTranslatedHeader(result);
  };

  const handleTranslateVe = async () => {
    const result = await translateText('Translation Services', 'vi');
    setTranslatedHeader(result);
import { API_BASE } from '../lib/api';
import TText from '../components/TText';
import { theme } from '../lib/theme';
import { cn } from '../lib/utils';

type Msg = { id: string; role: 'user' | 'assistant'; text: string };

export default function TranslationChat() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: '0',
      role: 'assistant',
      text: 'Hello 👋 — how can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList<Msg>>(null);

  async function send() {
    if (!input.trim() || loading) return;

    const userMsg: Msg = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const REQUEST_TIMEOUT = 60000;          // 60 s – adjust later

    const ctrl   = new AbortController();
    const timer  = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT);
      // inside send()
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: userMsg.text }] }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      clearTimeout(timer);

      const data = await res.json(); // { reply: '…' }
      const botMsg: Msg = {
        id: Date.now() + 'b',
        role: 'assistant',
        text: data.reply,
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
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
      <View
        style={{
          alignSelf: user ? 'flex-end' : 'flex-start',
          backgroundColor: user ? '#007AFF' : '#F1F2F6',
          borderRadius: 18,
          marginVertical: 4,
          paddingVertical: 10,
          paddingHorizontal: 16,
          maxWidth: '80%',
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 2,
          shadowOffset: { width: 0, height: 1 },
        }}
      >
        <TText style={{ color: user ? 'white' : '#222', fontSize: 16 }}>
          {item.text}
        </TText>
        {/* Optionally, add a timestamp here */}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB', paddingHorizontal: 8, paddingTop: 80 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
        <Ionicons name="chatbubbles" size={28} color={theme.colors.primary} style={{ marginRight: 8 }} />
        <TText style={{ fontSize: 20, fontWeight: 'bold', color: '#222' }}>Aussist AI Chatbot</TText>
      </View>
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={m => m.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
      />

      {/* input bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 8,
          backgroundColor: '#fff',
          borderRadius: 24,
          paddingHorizontal: 12,
          shadowColor: '#000',
          shadowOpacity: 0.07,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
          style={{ height: 44, flex: 1, fontSize: 16 }}
          placeholderTextColor="#aaa"
        />
        {loading && <ActivityIndicator size="small" style={{ marginRight: 8 }} />}
        <TouchableOpacity
          onPress={send}
          style={{
            backgroundColor: input.trim() ? '#007AFF' : '#E5E7EB',
            borderRadius: 20,
            padding: 8,
            marginLeft: 4,
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
  );
}
