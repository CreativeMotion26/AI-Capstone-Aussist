import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const faqData = [
  {
    id: '1',
    category: 'Opal Card',
    icon: 'card-outline',
    questions: [
      {
        id: '1-1',
        question: 'Where can I purchase an Opal card?',
        answer: 'Opal cards are available at most convenience stores, news agencies, and Opal retail outlets. You can also purchase them online.'
      },
      {
        id: '1-2',
        question: 'How do I check my Opal card balance?',
        answer: 'You can check your Opal card balance through the Opal app, Opal website, or at Opal retail outlets. Most train stations and ferry terminals also have balance check facilities.'
      },
      {
        id: '1-3',
        question: 'How do I get a refund for my Opal card?',
        answer: 'Opal card refunds can be requested through Opal Customer Service (131 500). Refunds are only available when the card balance is $10 or more.'
      }
    ]
  },
  {
    id: '2',
    category: 'Fares',
    icon: 'cash-outline',
    questions: [
      {
        id: '2-1',
        question: 'How are adult fares calculated?',
        answer: 'Adult fares vary based on distance traveled and time of day. Additional charges apply during peak times (6:30-10:00 AM, 3:00-7:00 PM).'
      },
      {
        id: '2-2',
        question: 'How do child fares work?',
        answer: 'Children aged 4-15 are eligible for child fares. Children under 4 travel free. Students aged 16 and over with a valid student ID are also eligible for child fares.'
      },
      {
        id: '2-3',
        question: 'How does the daily/weekly fare cap work?',
        answer: 'The daily fare cap ensures you never pay more than a set amount per day. The weekly fare cap limits the amount you pay over a week.'
      }
    ]
  },
  {
    id: '3',
    category: 'Trip Planning',
    icon: 'map-outline',
    questions: [
      {
        id: '3-1',
        question: 'How do I plan my trip?',
        answer: 'Use the Trip Planner by entering your origin and destination to find the best route and timetable. Real-time updates are also provided.'
      },
      {
        id: '3-2',
        question: 'Where can I check real-time service information?',
        answer: 'You can check real-time service information on the Transport for NSW app or website. You can also follow @T1SydneyTrains on Twitter for real-time updates.'
      }
    ]
  },
  {
    id: '4',
    category: 'Accessibility',
    icon: 'accessibility-outline',
    questions: [
      {
        id: '4-1',
        question: 'Is wheelchair access available?',
        answer: 'Most train stations and buses are wheelchair accessible. Some older stations may have limited access, so it\'s best to check before traveling.'
      },
      {
        id: '4-2',
        question: 'How do I use the Travel Assistance service?',
        answer: 'Travel Assistance can be booked by calling 1800 637 500 at least 24 hours in advance. This is a free service for passengers with mobility restrictions.'
      }
    ]
  }
];

export default function FAQ() {
  const [expandedItems, setExpandedItems] = useState({});
  const [animations] = useState(() => {
    const anims = {};
    faqData.forEach(category => {
      category.questions.forEach(q => {
        anims[q.id] = new Animated.Value(0);
      });
    });
    return anims;
  });

  const toggleItem = (questionId) => {
    const isExpanded = expandedItems[questionId];
    setExpandedItems(prev => ({
      ...prev,
      [questionId]: !isExpanded
    }));

    Animated.timing(animations[questionId], {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const renderQuestion = ({ item: question }) => {
    const height = animations[question.id].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <View style={styles.questionContainer}>
        <TouchableOpacity
          style={styles.questionHeader}
          onPress={() => toggleItem(question.id)}
        >
          <Text style={styles.questionText}>{question.question}</Text>
          <Ionicons
            name={expandedItems[question.id] ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.answerContainer,
            {
              height: height.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 'auto']
              })
            }
          ]}
        >
          <Text style={styles.answerText}>{question.answer}</Text>
        </Animated.View>
      </View>
    );
  };

  const renderCategory = ({ item: category }) => {
    return (
      <View style={styles.categoryContainer}>
        <View style={styles.categoryHeader}>
          <View style={styles.iconContainer}>
            <Ionicons name={category.icon} size={24} color="#222" />
          </View>
          <Text style={styles.categoryTitle}>{category.category}</Text>
        </View>
        <FlatList
          data={category.questions}
          renderItem={renderQuestion}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Frequently Asked Questions</Text>
      <Text style={styles.sectionDescription}>
        Find answers to common questions about Transport for NSW services
      </Text>
      <FlatList
        data={faqData}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  categoryContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  questionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  answerContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
