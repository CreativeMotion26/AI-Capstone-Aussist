import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useTranslation } from '../../../../_context/TranslationContext';

type TransportType = 'metroTrain' | 'bus' | 'ferry' | 'lightRail';
type CapsTabType = 'adults' | 'children' | 'seniors';
type CapsItemType = {
  amount: string;
  desc: string;
};

type FareRow = string[];

interface TransportFares {
  metroTrain: FareRow[];
  bus: FareRow[];
  ferry: FareRow[];
  lightRail: FareRow[];
}

interface FareType {
  id: string;
  title: string;
  desc: string;
  fares: TransportFares;
}

const transportTypes = [
  {
    id: '1',
    title: 'Metro & Train',
    icons: [
      { icon: 'M', color: '#00857c' },
      { icon: 'T', color: '#e87722' }
    ],
  },
  {
    id: '2',
    title: 'Bus',
    icons: [
      { icon: 'B', color: '#00a3e0' }
    ],
  },
  {
    id: '3',
    title: 'Ferry',
    icons: [
      { icon: 'F', color: '#59bb47' }
    ],
  },
  {
    id: '4',
    title: 'Light Rail',
    icons: [
      { icon: 'L', color: '#e4002b' }
    ],
  }
];

const fareTypes = [
  {
    id: '1',
    title: 'Adults',
    desc: 'Standard fares for adult passengers',
    fares: {
      metroTrain: [
        ['0 - 10km', '$4.20', '$2.94'],
        ['10 – 20km', '$5.22', '$3.65'],
        ['20 – 35km', '$6.01', '$4.20'],
        ['36 – 65km', '$8.03', '$5.62'],
        ['65+km', '$10.33', '$7.23'],
      ],
      bus: [
        ['0 –3km', '$3.20', '$2.24'],
        ['3 –8km', '$4.36', '$3.05'],
        ['8+km', '$5.60', '$3.92'],
      ],
      ferry: [
        ['0 - 9 km', '$7.13'],
        ['9+ km', '$8.92'],
        ['Newcastle Stockton ferry 0-3 km', '$3.20'],
      ],
      lightRail: [
        ['0 –3 km', '$3.20', '$2.24'],
        ['3 –8km', '$4.36', '$3.05'],
        ['8+km', '$5.60', '$3.92'],
      ]
    }
  },
  {
    id: '2',
    title: 'Children & Concession',
    desc: 'Discounted fares for children and concession card holders',
    fares: {
      metroTrain: [
        ['0 - 10 km', '$2.10', '$1.47'],
        ['10 - 20 km', '$2.61', '$1.82'],
        ['20 -35 km', '$3.00', '$2.10'],
        ['35 -65 km', '$4.01', '$2.80'],
        ['65+ km', '$5.16', '$3.61'],
      ],
      bus: [
        ['0 –3km', '$1.60', '$1.12'],
        ['3 –8km', '$2.18', '$1.52'],
        ['8+km', '$2.80', '$1.96'],
      ],
      ferry: [
        ['0 - 9 km', '$3.56'],
        ['9+ km', '$4.46'],
        ['Newcastle Stockton ferry', '$1.60'],
      ],
      lightRail: [
        ['0 –3 km', '$1.60', '$1.12'],
        ['3 –8 km', '$2.18', '$1.52'],
        ['8+ km', '$2.80', '$1.96'],
      ]
    }
  },
  {
    id: '3',
    title: 'Seniors and Pensioners',
    desc: 'Special fares for seniors and pensioners',
    fares: {
      metroTrain: [
        ['0 - 10 km', '$2.10', '$1.47'],
        ['10 - 20 km', '$2.50', '$1.82'],
        ['20 -35 km', '$2.50', '$2.10'],
        ['35 -65 km', '$2.50', '$2.50'],
        ['65+ km', '$2.50', '$2.50'],
      ],
      bus: [
        ['0 –3 km', '$1.60', '$1.12'],
        ['3 –8 km', '$2.18', '$1.52'],
        ['8+ km', '$2.50', '$1.96'],
      ],
      ferry: [
        ['0 - 9 km', '$2.50 (daily cap)'],
        ['9+ km', '$2.50 (daily cap)'],
        ['Newcastle Stockton ferry', '$1.60'],
      ],
      lightRail: [
        ['0 –3 km', '$1.60', '$1.12'],
        ['3 –8 km', '$2.18', '$1.52'],
        ['8+ km', '$2.50', '$1.96'],
      ]
    }
  }
];

const peakTimeInfo = {
  morning: {
    title: 'Morning',
    metroTrain: '6:30am - 10:00am',
    intercityTrain: '6:00am - 10:00am'
  },
  evening: {
    title: 'Evening',
    metroTrain: '3:00pm - 7:00pm',
    intercityTrain: '3:00pm - 7:00pm'
  }
};

const transportIcons = {
  metroTrain: {
    icon: 'M',
    color: '#00857c'
  },
  intercityTrain: {
    icon: 'T',
    color: '#e87722'
  },
  bus: {
    icon: 'B',
    color: '#00a3e0'
  },
  lightRail: {
    icon: 'L',
    color: '#e4002b'
  }
};

const capsInfo: Record<CapsTabType, CapsItemType[]> = {
  adults: [
    { amount: '$18.70', desc: 'a day (Mondays to Thursdays)' },
    { amount: '$9.35', desc: 'on Fridays, Saturdays, Sundays and public holidays' },
    { amount: '$50', desc: 'a week' },
  ],
  children: [
    { amount: '$9.35', desc: 'a day (Monday to Thursdays)' },
    { amount: '$4.65', desc: 'on Friday, Saturday, Sunday and public holidays' },
    { amount: '$25', desc: 'a week' },
  ],
  seniors: [
    { amount: '$2.50', desc: 'a day' },
    { amount: '$17.50', desc: 'a week' },
  ],
};

export default function Fares() {
  const { selectedLanguage, translateAll, registerText, translatedTexts } = useTranslation();
  const [selectedTabs, setSelectedTabs] = useState<{[key: string]: string}>({});
  const [selectedTransports, setSelectedTransports] = useState<{[key: string]: TransportType}>({});
  const [selectedCapsTab, setSelectedCapsTab] = useState<CapsTabType | null>(null);
  const [expandedCards, setExpandedCards] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    // 번역할 텍스트 등록
    registerText("Fares");
    registerText("View fare information");
    registerText("Adults");
    registerText("Children and Concession");
    registerText("Senior and Pensioners");
    registerText("Transport Type");
    
    // Fare Types 카드들의 desc 등록
    fareTypes.forEach(fareType => {
      registerText(fareType.title);
      registerText(fareType.desc);
    });

    // Peak Time 카드 텍스트 등록
    registerText("Peak Time");
    registerText("Check out the peak time fares for each transport type");

    // Daily and Weekly Caps 카드 텍스트 등록
    registerText("Daily and Weekly Caps");
    registerText("You never pay more than below within the Opal network:");
    registerText("Adults");
    registerText("Children & Concession");
    registerText("Seniors & Pensioners");
    registerText("a day (Mondays to Thursdays)");
    registerText("on Fridays, Saturdays, Sundays and public holidays");
    registerText("a week");
    registerText("a day (Monday to Thursdays)");
    registerText("on Friday, Saturday, Sunday and public holidays");
    registerText("a day");
  }, []);

  useEffect(() => {
    translateAll(selectedLanguage);
  }, [selectedLanguage]);

  const handleCardPress = (cardId: string) => {
    const isExpanding = !expandedCards[cardId];
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));

    // 카드가 접힐 때 탭 선택 상태 초기화
    if (!isExpanding) {
      setSelectedTabs(prev => {
        const newTabs = { ...prev };
        delete newTabs[cardId];
        return newTabs;
      });
      setSelectedTransports(prev => {
        const newTransports = { ...prev };
        delete newTransports[cardId];
        return newTransports;
      });
      // Caps 카드의 탭 상태 초기화
      if (cardId === 'caps') {
        setSelectedCapsTab(null);
      }
    }
  };

  const handleTabPress = (fareTypeId: string, transportId: string) => {
    setSelectedTabs(prev => {
      const newSelectedTabs = { ...prev };
      if (newSelectedTabs[fareTypeId] === transportId) {
        delete newSelectedTabs[fareTypeId];
      } else {
        newSelectedTabs[fareTypeId] = transportId;
      }
      return newSelectedTabs;
    });

    setSelectedTransports(prev => {
      const newSelectedTransports = { ...prev };
      const transportType = transportId === '1' ? 'metroTrain' : 
                          transportId === '2' ? 'bus' : 
                          transportId === '3' ? 'ferry' : 'lightRail';
      if (newSelectedTransports[fareTypeId] === transportType) {
        delete newSelectedTransports[fareTypeId];
      } else {
        newSelectedTransports[fareTypeId] = transportType;
      }
      return newSelectedTransports;
    });
  };

  const handleCapsTabPress = (tabName: CapsTabType) => {
    setSelectedCapsTab(prev => prev === tabName ? null : tabName);
  };

  const renderFareTable = (fares: FareRow[], transportType: TransportType) => {
    const isFerry = transportType === 'ferry';
    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, isFerry && styles.ferryDistanceCell]}>Distance</Text>
          <Text style={[styles.tableHeaderText, isFerry && styles.ferryPeakCell]}>Peak</Text>
          {!isFerry && <Text style={styles.tableHeaderText}>Off-peak</Text>}
        </View>
        {fares.map((row: FareRow, index: number) => (
          <View key={index} style={[styles.tableRow, index % 2 === 0 && styles.evenRow]}>
            <Text style={[styles.tableCell, isFerry && styles.ferryDistanceCell]}>{row[0]}</Text>
            <Text style={[styles.tableCell, isFerry && styles.ferryPeakCell]}>{row[1]}</Text>
            {!isFerry && <Text style={styles.tableCell}>{row[2] || '-'}</Text>}
          </View>
        ))}
      </View>
    );
  };

  // 카드 내용을 렌더링하는 함수
  const renderCardContent = (cardId: string, content: React.ReactNode) => {
    if (!expandedCards[cardId]) return null;
    
    return (
      <View>
        <View style={styles.cardContent}>
          {content}
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: translatedTexts["Fares"] || "Fares",
          headerBackTitle: 'Back',
          headerShown: true
        }} 
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            {/* Fare Type Cards */}
            {fareTypes.map((fareType) => (
              <View
                key={fareType.id}
                style={[styles.fareCard, expandedCards[fareType.id] && styles.expandedCard]}
              >
                <TouchableOpacity
                  style={styles.cardHeader}
                  onPress={() => handleCardPress(fareType.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.cardIcon}>
                    {fareType.id === '1' && (
                      <Image 
                        source={require('../../../../assets/images/AdultOpalCard.jpg')}
                        style={styles.cardImage}
                      />
                    )}
                    {fareType.id === '2' && (
                      <Image 
                        source={require('../../../../assets/images/ChildConcession.jpg')}
                        style={styles.cardImage}
                      />
                    )}
                    {fareType.id === '3' && (
                      <Image 
                        source={require('../../../../assets/images/GoldenOpalCard.jpg')}
                        style={styles.cardImage}
                      />
                    )}
                  </View>
                  <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>{translatedTexts[fareType.title] || fareType.title}</Text>
                    <Text style={styles.cardHeaderDesc}>{translatedTexts[fareType.desc] || fareType.desc}</Text>
                  </View>
                  <MaterialIcons 
                    name={expandedCards[fareType.id] ? "expand-less" : "expand-more"} 
                    size={24} 
                    color="#1976D2" 
                  />
                </TouchableOpacity>
                {renderCardContent(fareType.id, (
                  <View style={styles.cardContent}>
                    <View style={styles.transportCardsContainer}>
                      {transportTypes.map((transport) => {
                        const isSelected = selectedTabs[fareType.id] === transport.id;
                        return (
                          <TouchableOpacity
                            key={transport.id}
                            style={[
                              styles.transportCard,
                              isSelected && styles.selectedTransportCard
                            ]}
                            onPress={() => handleTabPress(fareType.id, transport.id)}
                          >
                            <View style={styles.iconsContainer}>
                              {transport.icons.map((iconData, index) => (
                                <View 
                                  key={index}
                                  style={[
                                    styles.iconContainer, 
                                    { backgroundColor: iconData.color },
                                    isSelected && styles.selectedIconContainer,
                                    index === 0 ? styles.firstIcon : styles.secondIcon,
                                    { zIndex: index === 0 ? 2 : 1 }
                                  ]}
                                >
                                  <Text style={styles.iconText}>{iconData.icon}</Text>
                                </View>
                              ))}
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    {selectedTabs[fareType.id] && (
                      <View style={styles.fareTableContainer}>
                        {renderFareTable(fareType.fares[selectedTransports[fareType.id]], selectedTransports[fareType.id])}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ))}

            {/* Peak Time Card */}
            <View style={[styles.fareCard, expandedCards['peakTime'] && styles.expandedCard]}>
              <TouchableOpacity 
                style={styles.cardHeader}
                onPress={() => handleCardPress('peakTime')}
                activeOpacity={0.7}
              >
                <View style={styles.cardIcon}>
                  <MaterialIcons name="schedule" size={32} color="#222" />
                </View>
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.cardTitle}>{translatedTexts["Peak Time"] || "Peak Time"}</Text>
                  <Text style={styles.cardHeaderDesc}>{translatedTexts["Check out the peak time fares for each transport type"] || "Check out the peak time fares for each transport type"}</Text>
                </View>
                <MaterialIcons 
                  name={expandedCards['peakTime'] ? "expand-less" : "expand-more"} 
                  size={24} 
                  color="#1976D2" 
                />
              </TouchableOpacity>
              {renderCardContent('peakTime', (
                <View style={styles.fareTableContainer}>
                  <View style={styles.peakTimeTableContainer}>
                    <View style={styles.peakTimeTableHeader}>
                      <Text style={[styles.tableHeaderText, styles.peakTimeTitleCell]}>{translatedTexts["Time"] || "Time"}</Text>
                      <View style={[styles.tableHeaderCell, styles.peakTimeInfoCell]}>
                        <View style={styles.iconsContainer}>
                          <View style={[styles.iconContainer, { backgroundColor: transportIcons.metroTrain.color }, styles.firstIcon]}>
                            <Text style={styles.iconText}>{transportIcons.metroTrain.icon}</Text>
                          </View>
                          <View style={[styles.iconContainer, { backgroundColor: transportIcons.intercityTrain.color }, styles.secondIcon]}>
                            <Text style={styles.iconText}>{transportIcons.intercityTrain.icon}</Text>
                          </View>
                          <View style={[styles.iconContainer, { backgroundColor: transportIcons.bus.color }, styles.thirdIcon]}>
                            <Text style={styles.iconText}>{transportIcons.bus.icon}</Text>
                          </View>
                          <View style={[styles.iconContainer, { backgroundColor: transportIcons.lightRail.color }, styles.fourthIcon]}>
                            <Text style={styles.iconText}>{transportIcons.lightRail.icon}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={[styles.tableHeaderCell, styles.peakTimeInfoCell]}>
                        <View style={styles.iconsContainer}>
                          <View style={[styles.iconContainer, { backgroundColor: transportIcons.intercityTrain.color }]}>
                            <Text style={styles.iconText}>{transportIcons.intercityTrain.icon}</Text>
                          </View>
                          <Text style={styles.infoText}>(i)</Text>
                        </View>
                      </View>
                    </View>
                    {Object.entries(peakTimeInfo).map(([key, info], index) => (
                      <View key={key} style={[styles.peakTimeTableRow, index % 2 === 0 && styles.evenRow]}>
                        <Text style={[styles.tableCell, styles.peakTimeTitleCell]}>{translatedTexts[info.title] || info.title}</Text>
                        {key === 'evening' ? (
                          <Text style={[styles.tableCell, { flex: 4 }]}>3:00pm - 7:00pm</Text>
                        ) : (
                          <>
                            <Text style={[styles.tableCell, styles.peakTimeInfoCell]}>{info.metroTrain}</Text>
                            <Text style={[styles.tableCell, styles.peakTimeInfoCell]}>{info.intercityTrain}</Text>
                          </>
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Daily and Weekly Caps Card */}
            <View 
              style={[styles.fareCard, expandedCards['caps'] && styles.expandedCard]}
            >
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => handleCardPress('caps')}
                activeOpacity={0.7}
              >
                <View style={styles.cardIcon}>
                  <MaterialIcons name="attach-money" size={32} color="#222" />
                </View>
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.cardTitle}>{translatedTexts["Daily and Weekly Caps"] || "Daily and Weekly Caps"}</Text>
                  <Text style={styles.cardHeaderDesc}>{translatedTexts["You never pay more than below within the Opal network:"] || "You never pay more than below within the Opal network:"}</Text>
                </View>
                <MaterialIcons 
                  name={expandedCards['caps'] ? "expand-less" : "expand-more"} 
                  size={24} 
                  color="#1976D2"
                />
              </TouchableOpacity>
              {renderCardContent('caps', (
                <View style={styles.cardContent}>
                  <View style={styles.capsTabsContainer}>
                    <TouchableOpacity
                      style={[
                        styles.capsTab,
                        selectedCapsTab === 'adults' && styles.selectedCapsTab
                      ]}
                      onPress={() => handleCapsTabPress('adults')}
                    >
                      <Text style={[
                        styles.capsTabText,
                        selectedCapsTab === 'adults' && styles.selectedCapsTabText
                      ]}>Adults</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.capsTab,
                        selectedCapsTab === 'children' && styles.selectedCapsTab
                      ]}
                      onPress={() => handleCapsTabPress('children')}
                    >
                      <Text style={[
                        styles.capsTabText,
                        selectedCapsTab === 'children' && styles.selectedCapsTabText
                      ]}>{translatedTexts["Children & Concession"] || "Children & Concession"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.capsTab,
                        selectedCapsTab === 'seniors' && styles.selectedCapsTab
                      ]}
                      onPress={() => handleCapsTabPress('seniors')}
                    >
                      <Text style={[
                        styles.capsTabText,
                        selectedCapsTab === 'seniors' && styles.selectedCapsTabText
                      ]}>{translatedTexts["Seniors & Pensioners"] || "Seniors & Pensioners"}</Text>
                    </TouchableOpacity>
                  </View>
                  {selectedCapsTab && (
                    <View style={styles.capsContent}>
                      {capsInfo[selectedCapsTab].map((item, index) => (
                        <View key={index} style={styles.capsRow}>
                          <Text style={styles.capsDesc}>
                            <Text style={{ fontWeight: 'bold' }}>{item.amount}</Text>
                            {' ' + (translatedTexts[item.desc] || item.desc)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
    marginHorizontal: 6,
  },
  sectionDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    marginHorizontal: 6,
  },
  transportCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transportCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedTransportCard: {
    borderWidth: 1,
    borderColor: '#1976D2',
    backgroundColor: '#fff',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstIcon: {
    marginLeft: 0,
    zIndex: 4,
  },
  secondIcon: {
    marginLeft: -10,
    zIndex: 3,
  },
  selectedIconContainer: {
    transform: [{ scale: 1.1 }],
  },
  iconText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  fareTableContainer: {
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tableContainer: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    alignItems: 'center',
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  tableCell: {
    flex: 1,
    color: '#222',
    textAlign: 'center',
    fontSize: 13,
    textAlignVertical: 'center',
  },
  ferryDistanceCell: {
    flex: 100,
    textAlign: 'left',
    paddingLeft: 10,
  },
  ferryPeakCell: {
    flex: 54,
    textAlign: 'center',
    paddingRight: 0,
  },
  peakTimeTitleCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  peakTimeInfoCell: {
    flex: 2,
    textAlign: 'center',
    fontSize: 14,
    paddingHorizontal: 2,
  },
  tableHeaderCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  thirdIcon: {
    marginLeft: -10,
    zIndex: 2,
  },
  fourthIcon: {
    marginLeft: -10,
    zIndex: 1,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
    textAlign: 'left',
  },
  cardHeaderDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
  },
  capsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  capsContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: -12,
    paddingHorizontal: 12,
    paddingVertical: 0,
  },
  capsCategory: {
    marginBottom: 20,
  },
  capsCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  capsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 0,
  },
  capsDesc: {
    fontSize: 14,
    color: '#444',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  adultCard: {
    flex: 1,
  },
  wideCard: {
    flex: 1.5,
  },
  selectedCapsCard: {
    borderWidth: 1,
    borderColor: '#00a3e0',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  capsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  fareCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  expandedCard: {
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  cardContent: {
    padding: 8,
    paddingTop: 0,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  cardTitleContainer: {
    flex: 1,
    marginRight: 16,
  },
  cardImage: {
    width: 48,
    height: 30,
    marginRight: 0,
    resizeMode: 'contain',
  },
  cardIcon: {
    width: 50,
    height: 32,
    marginRight: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  peakTimeTableContainer: {
    width: '100%',
  },
  peakTimeTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    alignItems: 'center',
    textAlign: 'center',
  },
  peakTimeTableRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 0,
  },
  capsTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 6,
    paddingHorizontal: 8,
    marginBottom: 16,
    marginHorizontal: -12,
  },
  capsTab: {
    flex: 1,
    paddingVertical: 6,
    marginHorizontal: 0,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '33%',
    backgroundColor: '#eee',
  },
  selectedCapsTab: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1976D2',
  },
  capsTabText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    width: '100%',
  },
  selectedCapsTabText: {
    color: '#1976D2',
  },
}); 