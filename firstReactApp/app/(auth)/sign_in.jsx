import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../Components/FormField';
import CustomButton from '../../Components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { userGlobalContext } from '../../context/GlobalsProvider';

const sign_in = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { setUser, setIsLoggedIn } = userGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  function handleChangeField(e) {
    setForm({ ...form, email: e });
  }
  function handlePasswordTextField(e) {
    setForm({ ...form, password: e });
  }
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Sign Up Error', 'Please fill all the fields!!');
    }
    try {
      setIsSubmitting(true);
      await signIn(form.email, form.password);
      const user = await getCurrentUser();
      setUser(user);
      setIsLoggedIn(true);
      router.replace('/home');
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full min-h-[85vh] justify-center px-4 my-2'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl text-white mt-10 font-psemibold'>
            Log in to{' '}
            <Text className='text-2xl text-secondary-200 mt-10 font-psemibold'>
              V-Made
            </Text>
          </Text>
          <FormField
            title='Email'
            value={form.email}
            handleChangeField={handleChangeField}
            otherStyles='mt-7'
            keyboardType='email-address'
            placeholder='example@gmail.com'
          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeField={handlePasswordTextField}
            otherStyles='mt-7'
            keyboardType='password'
            placeholder='*#123A*n@'
          />
          <CustomButton
            title='Sign In'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View className='justify-center flex-row pt-5 gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't Have an account ?
            </Text>
            <Link
              href='/sign_up'
              className='text-secondary text-lg font-pregular'
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default sign_in;
