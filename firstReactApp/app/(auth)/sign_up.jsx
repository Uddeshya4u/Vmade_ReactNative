import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../Components/FormField';
import CustomButton from '../../Components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const sign_up = () => {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleUsernameChangeField(e) {
    setForm({ ...form, userName: e });
  }
  function handleChangeField(e) {
    setForm({ ...form, email: e });
  }
  function handlePasswordTextField(e) {
    setForm({ ...form, password: e });
  }
  const submit = async () => {
    if (!form.email || !form.userName || !form.password) {
      Alert.alert('Sign Up Error', 'Please fill all the fields!!');
    }
    try {
      setIsSubmitting(true);
      const newUser = await createUser(
        form.email,
        form.password,
        form.userName
      );
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
            Sign up to{' '}
            <Text className='text-2xl text-secondary-200 mt-10 font-psemibold'>
              V-Made
            </Text>
          </Text>
          <FormField
            title='Username'
            value={form.userName}
            handleChangeField={handleUsernameChangeField}
            otherStyles='mt-10'
            placeholder='Jhon Doe'
          />
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
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View className='justify-center flex-row pt-5 gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Already Have an account ?
            </Text>
            <Link
              href='/sign_in'
              className='text-secondary text-lg font-pregular'
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default sign_up;
