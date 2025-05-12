// app/diseases/index.tsx

import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    SectionList,
    Pressable,
    StyleSheet,
    Linking,
} from 'react-native';
import { useTranslation } from '@/app/context/TranslationContext';
import rawConditions from '@/assets/data/Conditions.json';

interface ConditionDetail {
    ConditionID: string;
    ConditionName: string;
    ShortSummary: string;
    SymptomIDs: string[];
    Link: string;
}

const Conditions: Record<string, ConditionDetail> = rawConditions as any;

export default function DiseasesList() {
    const { registerText, translatedTexts, selectedLanguage } = useTranslation();
    const t = (key: string) => translatedTexts[key] || key;

    const [searchText, setSearchText] = useState('');
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
    const sectionListRef = useRef<SectionList<ConditionDetail>>(null);

    useEffect(() => {
        registerText('Search Conditions');
        registerText('No conditions found');
        registerText('Redirecting to external site...');
    }, []);

    useEffect(() => {
        if (!redirectUrl) return;
        const timer = setTimeout(() => {
            Linking.openURL(redirectUrl);
            setRedirectUrl(null);
        }, 1500);
        return () => clearTimeout(timer);
    }, [redirectUrl]);

    const allConditions = useMemo(
        () => Object.values(Conditions).sort((a, b) =>
            a.ConditionName.localeCompare(b.ConditionName)
        ),
        []
    );

    const filtered = useMemo(() => {
        if (!searchText.trim()) return allConditions;
        const low = searchText.toLowerCase();
        return allConditions.filter(c =>
            c.ConditionName.toLowerCase().includes(low)
        );
    }, [searchText, allConditions]);

    const sections = useMemo(() => {
        const map: Record<string, ConditionDetail[]> = {};
        filtered.forEach(c => {
            const L = c.ConditionName[0].toUpperCase();
            if (!map[L]) map[L] = [];
            map[L].push(c);
        });
        return Object.keys(map).sort().map(letter => ({
            title: letter,
            data: map[letter],
        }));
    }, [filtered]);

    const makeTranslatedUrl = (orig: string) => {
        const noProto = orig.replace(/^https?:\/\//, '');
        const [host, ...rest] = noProto.split('/');
        const hyphenHost = host.split('.').join('-');
        const path = rest.join('/');
        return `https://${hyphenHost}.translate.goog/${path}` +
            `?_x_tr_sl=auto&_x_tr_tl=${selectedLanguage}&_x_tr_hl=${selectedLanguage}`;
    };

    if (redirectUrl) {
        return (
            <SafeAreaView style={styles.splash}>
                <Text style={styles.redirectText}>
                    {t('Redirecting to external site...')}
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Search bar */}
            <View style={styles.searchWrap}>
                <TextInput
                    placeholder={t('Search Conditions')}
                    placeholderTextColor="#888"
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {/* SectionList */}
            <View style={styles.listContainer}>
                <SectionList
                    ref={sectionListRef}
                    sections={sections}
                    keyExtractor={item => item.ConditionID}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    renderItem={({ item }) => (
                        <Pressable
                            style={({ pressed }) => [
                                styles.itemRow,
                                pressed && styles.itemRowPressed,
                            ]}
                            onPress={() => setRedirectUrl(makeTranslatedUrl(item.Link))}
                        >
                            {({ pressed }) => (
                                <Text style={[
                                    styles.itemText,
                                    pressed && styles.itemTextPressed
                                ]}>
                                    {t(item.ConditionName)}
                                </Text>
                            )}
                        </Pressable>
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.empty}>
                            <Text style={styles.emptyText}>
                                {t('No conditions found')}
                            </Text>
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    stickySectionHeadersEnabled
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },

    splash: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    redirectText: { fontSize: 16, color: '#333' },

    searchWrap: {
        height: 64,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        backgroundColor: '#FFF',
    },
    searchInput: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 48,
        fontSize: 16,
        color: '#333',
    },

    listContainer: { flex: 1 },

    sectionHeader: {
        backgroundColor: '#EEE',
        paddingVertical: 4,
        paddingHorizontal: 12,
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
    },
    itemRow: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        backgroundColor: '#FFF',
    },
    itemRowPressed: {
        backgroundColor: '#F0F8FF',
    },
    itemText: {
        fontSize: 16,
        color: '#0066CC',
    },
    itemTextPressed: {
        color: '#004C99',
    },

    empty: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
    },
});
