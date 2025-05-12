import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useTranslation } from '../../_context/TranslationContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../_lib/theme';
import { useFavourites } from '../../_context/FavouriteContext';
import TText from '../../components/TText';

export default function FavouritePage() {
  const { selectedLanguage, translateAll, registerText, translatedTexts } = useTranslation();
  const { favourites, removeFavourite } = useFavourites();
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    registerText("Favourites");
    registerText("Your saved services and information");
    registerText("No favourites yet");
    registerText("Add services to your favourites for quick access");
  }, []);

  React.useEffect(() => {
    translateAll(selectedLanguage);
  }, [selectedLanguage]);

  const handleFavouritePress = (item: any) => {
    if (item.route) {
      router.push(item.route as any);
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: translatedTexts["Favourites"] || "Favourites",
          headerBackTitle: 'Back'
        }} 
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: theme.colors.primary }]}>
            <TText style={styles.headerTitle}>
              {translatedTexts["Favourites"] || "Favourites"}
            </TText>
            <TText style={styles.headerSubtitle}>
              {translatedTexts["Your saved services and information"] || "Your saved services and information"}
            </TText>
      </View>

          <View style={styles.favouritesContainer}>
        {favourites.length > 0 ? (
              favourites.map((item, index) => (
            <TouchableOpacity
                  key={index}
                  style={styles.favouriteCard}
                  onPress={() => handleFavouritePress(item)}
            >
                  <View style={styles.favouriteContent}>
                    {item.image && (
                      <Image source={item.image} style={styles.favouriteImage} />
                    )}
                    <View style={styles.favouriteTextContainer}>
                      <TText style={styles.favouriteTitle}>{item.title}</TText>
                      <TText style={styles.favouriteDescription}>{item.description}</TText>
                    </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                    onPress={() => removeFavourite(item.id)}
                >
                    <MaterialIcons name="favorite" size={24} color={theme.colors.primary} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyState}>
                <MaterialIcons name="favorite-border" size={48} color="#ccc" />
                <TText style={styles.emptyStateTitle}>
                  {translatedTexts["No favourites yet"] || "No favourites yet"}
                </TText>
                <TText style={styles.emptyStateDescription}>
                  {translatedTexts["Add services to your favourites for quick access"] || "Add services to your favourites for quick access"}
                </TText>
              </View>
            )}
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
  header: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
  },
  favouritesContainer: {
    padding: 15,
  },
  favouriteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  favouriteContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  favouriteImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  favouriteTextContainer: {
    flex: 1,
  },
  favouriteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  favouriteDescription: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
}); 