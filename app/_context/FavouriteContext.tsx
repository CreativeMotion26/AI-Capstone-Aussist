import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FavouriteItem = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: any;
  url?: string;
  category: string;
  route: string;
};

type FavouriteContextType = {
  favourites: FavouriteItem[];
  addFavourite: (item: FavouriteItem) => void;
  removeFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
};

const FavouriteContext = createContext<FavouriteContextType | undefined>(undefined);

export function FavouriteProvider({ children }: { children: React.ReactNode }) {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);

  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    try {
      const savedFavourites = await AsyncStorage.getItem('favourites');
      if (savedFavourites) {
        setFavourites(JSON.parse(savedFavourites));
      }
    } catch (error) {
      console.error('Error loading favourites:', error);
    }
  };

  const saveFavourites = async (newFavourites: FavouriteItem[]) => {
    try {
      await AsyncStorage.setItem('favourites', JSON.stringify(newFavourites));
    } catch (error) {
      console.error('Error saving favourites:', error);
    }
  };

  const addFavourite = (item: FavouriteItem) => {
    const newFavourites = [...favourites, item];
    setFavourites(newFavourites);
    saveFavourites(newFavourites);
  };

  const removeFavourite = (id: string) => {
    const newFavourites = favourites.filter(item => item.id !== id);
    setFavourites(newFavourites);
    saveFavourites(newFavourites);
  };

  const isFavourite = (id: string) => {
    return favourites.some(item => item.id === id);
  };

  return (
    <FavouriteContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouriteContext);
  if (context === undefined) {
    throw new Error('useFavourites must be used within a FavouriteProvider');
  }
  return context;
} 