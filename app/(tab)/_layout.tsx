import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import  { BlurView } from 'expo-blur'
import Header from "@/components/customHeader";

type Props = {};

const TabLayout = (props: Props) => {
  return (
    <Tabs
      screenOptions={{
        tabBarBackground:()=> <BlurView 
        intensity={100}
        style={{
          flex:1,
          backgroundColor:'rgba(0,0,0,0.05)'
        }}/>,
        tabBarActiveTintColor: "#FF6347",
        tabBarStyle:{
          backgroundColor: 'transparent',
          left:0,
          position:'absolute',
          bottom:0,
          right:0,
        } 
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          header: () => <Header />
        }}
      />
        <Tabs.Screen
        name="crypto"
        options={{
          title: "Crypto",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="line-chart" size={size} color={color} />
          ),
          header: () => <Header />
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          header: () => <Header />

        }}
      />

      <Tabs.Screen
        name="Invest"
        options={{
          title: "Invest",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="line-chart" size={size} color={color} />
          ),
          header: () => <Header />

        }}
      />
      <Tabs.Screen
        name="Transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exchange" size={size} color={color} />
          ),
          header: () => <Header />

        }}
      />
      <StatusBar barStyle="dark-content" backgroundColor={"darkgrey"}/>
    </Tabs>
  );
};

export default TabLayout;
