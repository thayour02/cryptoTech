import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'

type Props = {}

const explore = (props: Props) => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
       <View className='p-4 '>
          <Text>Explore </Text>
        </View>
        </SafeAreaView>
  )
}

export default explore

const styles = StyleSheet.create({})