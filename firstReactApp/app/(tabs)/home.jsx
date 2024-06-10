import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../Components/SearchInput';
import Trending from '../../Components/Trending';
import EmptyState from '../../Components/EmptyState';
import { getAllPosts, getLatestlPosts } from '../../lib/appwrite';
import { useAppWrite } from '../../lib/useAppwrite';
import VideoCard from '../../Components/VideoCard';
import { userGlobalContext } from '../../context/GlobalsProvider';

const home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, isLoading, reFetchData } = useAppWrite(getAllPosts);
  const { data: latestPosts } = useAppWrite(getLatestlPosts);
  const { user } = userGlobalContext();

  //To fetch new video on pull down to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await reFetchData();
    setRefreshing(false);
  };

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
            <View className='my-6 px-4 space-y-6'>
              <View className='justify-between items-start flex-row mb-6'>
                <View>
                  <Text className='font-pmedium text-sm text-gray-100'>
                    Welcome Back
                  </Text>
                  <Text className='font-psemibold text-2xl text-white'>
                    {user.userName || 'User'}
                  </Text>
                </View>
                <View className='mt-1.5'>
                  <Image
                    source={images.logoSmall}
                    className='w-9 h-10'
                    resizeMode='contain'
                  />
                </View>
              </View>
              <SearchInput />
              <View className='w-full flex-1 pt-5 pb-10'>
                <Text className='text-gray-100 text-lg font-pregular mb-3'>
                  Trending Videos
                </Text>
                <Trending posts={latestPosts ?? []} />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subTitle='Be the first one to upload a video'
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default home;
