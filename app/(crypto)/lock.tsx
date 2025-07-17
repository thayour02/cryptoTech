import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import * as Haptics  from "expo-haptics"
import { Ionicons } from "@expo/vector-icons";
import { Props } from "react-native-confirmation-code-field/esm/CodeField";
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from "expo-router";
import Animated, { useAnimatedStyle,useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";


const Lock = (props: Props) => {
  const { user } = useUser();
  const firstName = user?.firstName || "User";
  const [code, setCode] = useState<number[]>([]);
  console.log(firstName, "firstName");
  const codeLength = Array(6).fill(0);

  

  useEffect(() => {
    const checkAuthentication = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!hasHardware || !isEnrolled) {
        console.log("No biometric authentication available");
      }
    };
   
    checkAuthentication();
  }, []);


  const offSet = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offSet.value }],
    };
  });

  const OFFSET = 20;
  const TIME =  80;

  useEffect(() => {
    if (code?.length === 6) {
      // Here you can handle the code verification logic
      if (code.join("") === "123456") { 
        router.replace('/(tab)/Home')
      }else{
        offSet.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 })

        )
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setCode([])
      }
    }
  }, [code]);

 const  onNumberPress = (num: number) =>{
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([...code , num])
  }

  const OnBackPress = () =>{
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([...code.slice(0, -1)]);
  }

  const onAuthPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
   const { success } = await LocalAuthentication.authenticateAsync()
   if(success) {
     router.replace('/(tab)/Home')
   }else{
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
   }
  }

  return (
    <SafeAreaView className="px-10">
      <View className="text-3xl  font-bold mt-10 items-center">
        <Text className="text-3xl  font-semibold mt-10 items-center">Welcome Back {firstName}</Text>
      </View>
      <Animated.View style={[style]} className={`flex-row justify-center items-center mt-10 gap-4`}>
        {codeLength.map((_, index) => (
          <View
            key={index}
            className={` w-8 h-8  rounded-full ${
              code[index] !== undefined ? "bg-blue-400" : "bg-gray-400"
            }`}
          />
        ))}
      </Animated.View>
      <View>
        <View className="flex-row items-center justify-center gap-10 mt-20">
          {[1, 2, 3].map((num) => (
            <TouchableOpacity
              key={num}
              className="bg-white h-16 w-16 items-center justify-center rounded-full text-2xl font-bold"
              onPress={() => {
                if (code.length < 6) {
                 onNumberPress(num)
                }
              }}
            >
              <Text className="text-2xl font-bold">{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row items-center justify-center gap-10 mt-10">
          {[4, 5, 6].map((num) => (
            <TouchableOpacity
              key={num}
              className="bg-white h-16 w-16 items-center justify-center rounded-full  font-bold"
              onPress={() => {
                if (code.length < 6) {
                  setCode([...code, num]);
                }
              }}
            >
              <Text className="text-2xl font-bold">{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row items-center justify-center gap-10 mt-10">
          {[7,8,9].map((num) => (
            <TouchableOpacity
              key={num}
              className="bg-white h-16 w-16 items-center justify-center rounded-full text-2xl font-bold"
              onPress={() => {
                if (code.length < 6) {
                onNumberPress(num);
                }
              }}
            >
              <Text className="text-2xl font-bold">{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

         <View className="flex-row items-center justify-center gap-10 mt-10">
            <TouchableOpacity
              className="bg-white h-16 w-16 items-center justify-center rounded-full text-2xl font-bold"
              onPress={onAuthPress}
            >
            <Ionicons name="happy" size={24} color="black" />
            </TouchableOpacity>

             <TouchableOpacity
              className="bg-white h-16 w-16 items-center justify-center rounded-full "
              onPress={() => {
                if (code.length < 6) {
                  onNumberPress(0);
                }
              }}
            >
              <Text className="text-2xl font-bold">0</Text>
            </TouchableOpacity>
              <View style={{minWidth:60}}>
                
              { code.length > 0 && (
                  <TouchableOpacity
              className="bg-white h-16 w-16 items-center justify-center rounded-full text-2xl font-bold"
              onPress={OnBackPress}
            >
            <Ionicons name="backspace" size={24} color="black" />
            </TouchableOpacity>
              )}
              </View>
        </View>
      </View>
      <TouchableOpacity className="mt-10 items-center" onPress={() => router.push('/(auth)/forgot-password')}>
        <Text className="text-xl  mt-10 items-center text-blue-950">Forget your Password ?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Lock;
