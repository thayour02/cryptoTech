import { View, Text, TouchableOpacity,TextInput } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const Header = (props: Props) => {
    const { top } = useSafeAreaInsets()
  return (
    <BlurView intensity={80} tint="extraLight" style={{ paddingTop: top }}>
      <View className=" flex-row items-center justify-between gap-4 px-4 h-[60px] ">
        <TouchableOpacity  className="bg-gray-600 w-14 h-14 items-center justify-center   rounded-full">
             <Text className="font-psemibold text-2xl text-white">SG</Text>
        </TouchableOpacity>
        <View className="h-14   bg-gray-200  items-center rounded-full flex-1 flex-row justify-center px-4">
            <TextInput 
            placeholder="Search"
            placeholderTextColor="#7b7b8b"
            className="text-[#] font-psemibold text-xl flex-1 "
            />
            <Ionicons name="search" size={20} className="pl-10"/>
            
        </View>
        <TouchableOpacity className="bg-gray-200 w-14 h-14 items-center justify-center   rounded-full">
            <Ionicons name="stats-chart" size={20} color="#4b5563" />
        </TouchableOpacity >
         <TouchableOpacity className="bg-gray-200 w-14 h-14 items-center justify-center   rounded-full">
            <Ionicons name="card" size={20} color="#4b5563" />
        </TouchableOpacity>

      </View>
    </BlurView>
  );
};

export default Header;
