import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../Components/SearchInput';
import EmptyState from '../../Components/EmptyState';
import {
  getAllSavedPosts,
  getSearchedPosts,
  getVideos,
} from '../../lib/appwrite';
import { useAppWrite } from '../../lib/useAppwrite';
import VideoCard from '../../Components/VideoCard';
import { useSavedPostsContext } from '../../context/SavedPostsProvider';

const bookmarks = () => {
  const { savedPosts, setSavedPosts } = useSavedPostsContext();
  const [bookMarkedPosts, setBookMarkedPosts] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const savedVideos = [];
      if (!savedPosts.length) return;
      for (let videoId of savedPosts) {
        const video = await getVideos(videoId);
        savedVideos.push(video);
      }
      console.log('Video Data', savedVideos);
      return savedVideos;
    };
    fetchVideos().then((res) => {
      setBookMarkedPosts(res);
    });
  }, [savedPosts]);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={bookMarkedPosts}
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
              <Text className='font-psemibold text-2xl text-white'>Query</Text>
              <View className='mt-6 mb-8'>
                <SearchInput initialQuery='Query' />
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

export default bookmarks;

// const testData = [
//   {
//     $collectionId: '6654d415001fee3c53e2',
//     $createdAt: '2024-06-11T21:30:20.558+00:00',
//     $databaseId: '6654d3a6002dd92a4664',
//     $id: '6668c1ec00053b1eda09',
//     $permissions: [
//       'read("user:665b8a96003b1599c816")',
//       'update("user:665b8a96003b1599c816")',
//       'delete("user:665b8a96003b1599c816")',
//     ],
//     $updatedAt: '2024-06-11T21:30:20.558+00:00',
//     prompt: 'Test prompt.',
//     thumbnail:
//       'https://cloud.appwrite.io/v1/storage/buckets/6654d6d80022b2de1028/files/6668c1e8002b7d95f62d/preview?width=2000&height=2000&gravity=top&quality=100&project=665498420028aa477076',
//     title: 'Prompt.',
//     users: {
//       $collectionId: '6654d3e60025918b8e1b',
//       $createdAt: '2024-06-01T20:54:50.168+00:00',
//       $databaseId: '6654d3a6002dd92a4664',
//       $id: '665b8a99000cdbe315e2',
//       $permissions: [Array],
//       $updatedAt: '2024-06-16T10:07:42.916+00:00',
//       accountId: '665b8a96003b1599c816',
//       avatar:
//         'https://cloud.appwrite.io/v1/avatars/initials?name=uddeshya_468&project=665498420028aa477076',
//       email: 'uddeshyaTest3@gmail.com',
//       userName: 'uddeshya_468',
//     },
//     video:
//       'https://cloud.appwrite.io/v1/storage/buckets/6654d6d80022b2de1028/files/6668c1e8002bb09cec3b/view?project=665498420028aa477076',
//   },
//   {
//     $collectionId: '6654d415001fee3c53e2',
//     $createdAt: '2024-06-03T20:31:22.830+00:00',
//     $databaseId: '6654d3a6002dd92a4664',
//     $id: '665e2819003ac1b769ee',
//     $permissions: [],
//     $updatedAt: '2024-06-05T20:17:47.518+00:00',
//     prompt:
//       'Create a motivating AI driven video aimed at inspiring coding enthusiasts with simple language',
//     thumbnail: 'https://i.ibb.co/tJBcX20/Appwrite-video.png',
//     title: 'Get inspired to code',
//     users: {
//       $collectionId: '6654d3e60025918b8e1b',
//       $createdAt: '2024-06-01T20:54:50.168+00:00',
//       $databaseId: '6654d3a6002dd92a4664',
//       $id: '665b8a99000cdbe315e2',
//       $permissions: [Array],
//       $updatedAt: '2024-06-16T10:07:42.916+00:00',
//       accountId: '665b8a96003b1599c816',
//       avatar:
//         'https://cloud.appwrite.io/v1/avatars/initials?name=uddeshya_468&project=665498420028aa477076',
//       email: 'uddeshyaTest3@gmail.com',
//       userName: 'uddeshya_468',
//     },
//     video: 'https://www.youtube.com/watch?v=co5UiHbwO-c',
//   },
//   {
//     $collectionId: '6654d415001fee3c53e2',
//     $createdAt: '2024-06-03T20:29:31.125+00:00',
//     $databaseId: '6654d3a6002dd92a4664',
//     $id: '665e27aa0030eaf44349',
//     $permissions: [],
//     $updatedAt: '2024-06-03T20:29:31.125+00:00',
//     prompt:
//       'Make a fun video about hackers and all the cool stuff they do with computers',
//     thumbnail: 'https://i.ibb.co/DzXRfyr/Bucket-59038.png',
//     title: 'A World where Ideas Grow Big',
//     users: {
//       $collectionId: '6654d3e60025918b8e1b',
//       $createdAt: '2024-05-27T20:33:38.711+00:00',
//       $databaseId: '6654d3a6002dd92a4664',
//       $id: '6654ee20001c23653ca2',
//       $permissions: [Array],
//       $updatedAt: '2024-05-27T20:33:38.711+00:00',
//       accountId: '6654ee1e0014f1ca639a',
//       avatar:
//         'https://cloud.appwrite.io/v1/avatars/initials?name=uddeshya_gupta&project=665498420028aa477076',
//       email: 'uddeshyaTest@gmail.com',
//       userName: 'uddeshya_gupta',
//     },
//     video: 'https://player.vimeo.com/video/949620200?h=d60220d68d',
//   },
// ];
