import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '../constants';
import { router, usePathname } from 'expo-router';

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  return (
    <View className='w-full h-16 px-4 bg-black-100 rounded-2xl items-center border-black-200 flex-row focus:border-secondary border-2 space-x-4'>
      <TextInput
        className='flex-1 text-white font-pregular text-base mt-0.5 '
        placeholder={'Search for a video...'}
        placeholderTextColor='#CDCDE0'
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          console.log('Tapped for Query', query);
          if (!query) {
            return Alert.alert(
              'Search Something',
              'Please enter a valid query'
            );
          }
          if (pathname.startsWith('/search')) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
