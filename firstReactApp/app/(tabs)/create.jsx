import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import FormField from '../../Components/FormField';
import CustomButton from '../../Components/CustomButton';
import { Video, ResizeMode } from 'expo-av';
import * as DocumnentPicker from 'expo-document-picker';
import { icons } from '../../constants';
import { router } from 'expo-router';
import { createVideo } from '../../lib/appwrite';
import { userGlobalContext } from '../../context/GlobalsProvider';

const create = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { user } = userGlobalContext();
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const submit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      return Alert.alert('Please fill all the fields');
    }
    setIsUploading(true);
    try {
      await createVideo({ ...form, userId: user.$id });

      Alert.alert('Success', 'Post Uploaded successfully');
      router.push('./home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      });
      setIsUploading(false);
    }
  };

  const openSelector = async (selectType) => {
    const result = await DocumnentPicker.getDocumentAsync({
      type:
        selectType === 'image'
          ? ['image/png', 'image/jpeg']
          : ['video/mp4', 'video/gif'],
    });
    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-2 my-6'>
        <Text className='text-2xl text-white font-psemibold'>Upload Video</Text>
        <FormField
          title='Video Title'
          value={form.title}
          placeholder='Add some title for your video...'
          handleChangeField={(e) => setForm({ ...form, title: e })}
          otherStyles='mt-10'
        />
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openSelector('video')}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className='w-full h-64 rounded-2xl'
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className='w-full h-40 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='w-14 h-14  border border-dashed border-secondary-100 justify-center items-center'>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className='w-1/2 h-1/2'
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Add thumbnail image
          </Text>
          <TouchableOpacity onPress={() => openSelector('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode='cover'
                className='w-full h-64 rounded-2xl'
              />
            ) : (
              <View className='w-full h-16 bg-black-100 rounded-2xl justify-center items-center flex-row'>
                <Image
                  source={icons.upload}
                  resizeMode='contain'
                  className='w-5 h-5'
                />
                <Text className='text-sm text-gray-100 font-pmedium ml-2'>
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title='AI Prompt'
          value={form.prompt}
          placeholder='AI Prompt you used to create this video'
          handleChangeField={(e) => setForm({ ...form, prompt: e })}
          otherStyles='mt-7'
        />
        <CustomButton
          title='Submit & Publish'
          handlePress={() => submit()}
          containerStyles='mt-7'
          isLoading={isUploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;
