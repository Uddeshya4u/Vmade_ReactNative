import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';
import { userGlobalContext } from '../context/GlobalsProvider';
import { saveUserPost, removeUserPost } from '../lib/appwrite';
import { useSavedPostsContext } from '../context/SavedPostsProvider';
const VideoCard = ({
  video: {
    $id: id,
    title,
    thumbnail,
    video,
    users: { userName, avatar },
  },
}) => {
  const { savedPosts, setSavedPosts } = useSavedPostsContext();
  const [play, setPlay] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const thisVideo = useRef(null);
  const [status, setStatus] = useState({});
  const { user } = userGlobalContext();
  const addVideoToBookMark = async () => {
    try {
      if (isLiked) {
        await removePost();
        const updatedArray = savedPosts.filter((post) => post != id);
        setSavedPosts(updatedArray);
      } else {
        await savePost();
        setSavedPosts((prev) => [...prev, id]);
      }
      setIsLiked((prev) => !prev);
    } catch (error) {
      Alert.alert('Failed to save post', error.message);
    }
  };
  const savePost = async () => {
    try {
      await saveUserPost(user.$id, id);
    } catch (error) {
      console.error('Failed to save post for user: ', user.$id);
    }
  };
  const removePost = async () => {
    try {
      await removeUserPost(user.$id, id);
    } catch (error) {
      console.error('Failed to save post for user: ', user.$id);
    }
  };
  useEffect(() => {
    if (savedPosts.indexOf(id) == -1) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  }, [savedPosts]);
  return (
    <View className='flex-col items-center px-4 mb-14'>
      <View className='flex-row gap-3 items-start'>
        <View className='justify-center items-center flex-row flex-1'>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-centerp-0.5'>
            <Image
              source={{ uri: avatar }}
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>
          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text
              className='text-white font-psemibold text-sm'
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className='text-xs text-gray-100 font-pregular'
              numberOfLines={1}
            >
              {userName}
            </Text>
          </View>
        </View>
        <View className='pt-2'>
          <Pressable onPress={addVideoToBookMark}>
            <Image
              source={isLiked ? icons.heartFilled : icons.heart}
              className='w-8 h-8'
              resizeMode='contain'
            />
          </Pressable>
        </View>
      </View>
      {play ? (
        <Video
          ref={thisVideo}
          source={{
            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          className='w-full h-72 rounded-[35px] mt-3'
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          useNativeControls
          onPlaybackStatusUpdate={(status) => {
            setStatus(() => status);
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className='w-full h-60 rounded-xl mt-3 justify-center items-center relative'
          activeOpacity={0.5}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className='w-full h-full rounded-xl mt-3'
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
