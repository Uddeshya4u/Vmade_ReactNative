import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, getAllSavedPosts } from '../lib/appwrite';
import { userGlobalContext } from './GlobalsProvider';

const SavedPostsContext = createContext();
//custom hook to use a global context
export const useSavedPostsContext = () => useContext(SavedPostsContext);
const SavedPostsProvider = ({ children }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const { user } = userGlobalContext();

  const fetchSavedPosts = async () => {
    try {
      const posts = await getAllSavedPosts(user.$id);
      const videoArray = posts.map((post) => {
        return post['videoId'];
      });
      setSavedPosts(videoArray);
    } catch (error) {
      console.error('Failed to fetch saved posts for user: ', user.$id);
    }
  };
  const fetchVideos = async () => {};
  useEffect(() => {
    fetchSavedPosts();
  }, [user]);

  return (
    <SavedPostsContext.Provider
      value={{
        savedPosts,
        setSavedPosts,
      }}
    >
      {children}
    </SavedPostsContext.Provider>
  );
};

export default SavedPostsProvider;
