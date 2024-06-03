//External Libraries Import
import 'react-native-url-polyfill/auto';

import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../Components/CustomButton';
import { userGlobalContext } from '../context/GlobalsProvider';

export default function App() {
  const { isLoggedIn, isLoading } = userGlobalContext();
  const handlePress = () => router.push('./sign_in');
  if (!isLoading && isLoggedIn) return <Redirect href='/home' />;
  return (
    <>
      {/* // Using safe area view so the view takes the size of any devices (for
      full screen views) */}
      <SafeAreaView className='bg-primary h-full'>
        {/* Similar to UIScrollView for overflowing Content */}
        <ScrollView
          contentContainerStyle={{
            height: '100%',
          }}
        >
          <View className='w-full min-h-[85vh] items-center px-4 justify-center'>
            <Image
              source={images.logo}
              className='w-[130px] h-[84px]'
              resizeMode='contain'
            />
            <Image
              source={images.cards}
              className='w-full h-[300px] max-w-[380px]'
              resizeMode='contain'
            />
            <View>
              <Text className='text-3xl text-white font-bold text-center'>
                Imagination is the Limit with{' '}
                <Text className='text-secondary-200'> V-Made</Text>
              </Text>
              <Image
                source={images.path}
                className='w-[200px] h-[15px] absolute -bottom-2 right-10'
                resizeMode='contain'
              />
            </View>
            <Text className='font-pregular mt-7 text-gray-100 text-center text-lg'>
              Join in to embark on joiurney with limitless exploration where
              your creativity is the only limit.
            </Text>
            <CustomButton
              title='Continue with email'
              handlePress={handlePress}
              containerStyles='w-full mt-7'
            />
          </View>
        </ScrollView>
        {/* the bar where we see the battery,time and notification symbols */}
        <StatusBar backgroundColor='#161622' style='light' />
      </SafeAreaView>
    </>
  );
}
