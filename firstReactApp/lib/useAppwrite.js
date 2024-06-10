import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
//Custom hook to fetch different data from appwrite using cb func
export const useAppWrite = (callbackFunction) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await callbackFunction();
      setData(response);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const reFetchData = () => fetchData();

  return { data, isLoading, reFetchData };
};
