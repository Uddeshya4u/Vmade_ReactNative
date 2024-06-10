import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../Components/SearchInput';
import EmptyState from '../../Components/EmptyState';
import { getSearchedPosts } from '../../lib/appwrite';
import { useAppWrite } from '../../lib/useAppwrite';
import VideoCard from '../../Components/VideoCard';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, reFetchData } = useAppWrite(() =>
    getSearchedPosts(query)
  );

  useEffect(() => {
    reFetchData();
  }, [query]);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        key={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} />;
        }}
        ListHeaderComponent={() => {
          return (
            <View className='my-6 px-4'>
              <Text className='font-pmedium text-sm text-gray-100'>
                Search Results For
              </Text>
              <Text className='font-psemibold text-2xl text-white'>
                {query}
              </Text>
              <View className='mt-6 mb-8'>
                <SearchInput initialQuery={query} />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subTitle='No videos found for the searched query'
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
