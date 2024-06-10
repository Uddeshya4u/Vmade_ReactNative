import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserPosts, signOut } from '../../lib/appwrite';
import { useAppWrite } from '../../lib/useAppwrite';
import { userGlobalContext } from '../../context/GlobalsProvider';
import EmptyState from '../../Components/EmptyState';
import VideoCard from '../../Components/VideoCard';
import { icons } from '../../constants';
import InfoBox from '../../Components/InfoBox';
import { router } from 'expo-router';

const profile = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = userGlobalContext();

  const { data: posts } = useAppWrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/sign_in');
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
        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className='flex-row w-full mb-10 justify-end gap-2'
              onPress={logout}
            >
              <Text className='font-pmedium text-gray-100 text-lg '>
                Log Out
              </Text>
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-5 h-5'
              />
            </TouchableOpacity>
            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image
                source={{ uri: user?.avatar }}
                resizeMode='cover'
                className='w-[90%] h-[90%] rounded-lg'
              />
            </View>
            <InfoBox
              title={user?.userName}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />
            <View className='flex-row mt-5'>
              <InfoBox
                title={posts.length || 0}
                subTitle='Posts'
                containerStyles='mr-5'
                titleStyles='text-xl'
              />
              <InfoBox
                title='1.2k'
                subTitle='Followers'
                containerStyles='mr-5'
                titleStyles='text-xl'
              />
            </View>
          </View>
        )}
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

export default profile;
