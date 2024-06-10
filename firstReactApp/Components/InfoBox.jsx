import { View, Text } from 'react-native';
import React from 'react';

const InfoBox = (props) => {
  const { title, subTitle, containerStyles, titleStyles } = props;
  return (
    <View className={containerStyles}>
      <Text className={`${titleStyles} text-white text-center font-psemibold`}>
        {title}
      </Text>
      <Text className='text-sm text-gray-100 text-center font-pregular'>
        {subTitle}
      </Text>
    </View>
  );
};

export default InfoBox;
