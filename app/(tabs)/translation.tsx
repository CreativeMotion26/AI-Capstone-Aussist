import React, { useState, useRef } from 'react';
import { View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { API_BASE } from '../lib/utils';          // path as you prefer
import TText from '../components/TText';

type Msg = { id: string; role: 'user' | 'assistant'; text: string };

export default function TranslationChat() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: '0', role: 'assistant', text: 'Hello 👋 — how can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef<FlatList>(null);

  async function send() {
    if (!input.trim()) return;

    // optimistic UI
    const userMsg: Msg = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: userMsg.text }] })
      });
      const data = await res.json();           // { reply: "..." }
      const botMsg: Msg = { id: Date.now() + 'b', role: 'assistant', text: data.reply };
      setMessages(prev => [...prev, botMsg]);
      // scroll to bottom
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={m => m.id}
        renderItem={({ item }) => (
          <View style={{ alignSelf: item.role === 'user' ? 'flex-end' : 'flex-start',
                         backgroundColor: item.role === 'user' ? '#DCF8C6' : '#F1F1F1',
                         padding: 10, marginVertical: 4, borderRadius: 8, maxWidth: '80%' }}>
            <TText>{item.text}</TText>
          </View>
        )}
      />

      {/* input bar */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc',
                   borderRadius: 20, paddingHorizontal: 12, height: 40 }}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
        />
        <TouchableOpacity onPress={send} style={{ marginLeft: 8 }}>
          <TText style={{ color: '#007AFF', fontWeight: 'bold' }}>Send</TText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
