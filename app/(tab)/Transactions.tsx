import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'

type Props = {}

const Transactions = (props: Props) => {
  return (
   <SafeAreaView className='flex-1 bg-white'>
      <View className='p-4 '>
         <Text>Home </Text>
       </View>
       </SafeAreaView>
  )
}

export default Transactions