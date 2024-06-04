import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '../constants';

const SearchInput = (props) => {
  const {
    title,
    value,
    handleChangeField,
    otherStyles,
    keyboardType,
    placeholder,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className='w-full h-16 px-4 bg-black-100 rounded-2xl items-center border-black-200 flex-row focus:border-secondary border-2 space-x-4'>
      <TextInput
        className='flex-1 text-white font-pregular text-base mt-0.5 '
        value={value}
        placeholder={'Search for a video...'}
        placeholderTextColor='#7b7b8b'
        onChangeText={handleChangeField}
        secureTextEntry={title === 'Password' && !showPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
