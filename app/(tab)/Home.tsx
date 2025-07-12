import DropdownMore from "@/components/Dropdown";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useBalanceStore } from "@/store/balStorage";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatDate } from "@/store/utils";
import WidgetList from "@/components/SortableList/WidgetList";

type Props = {};

const Home = (props: Props) => {
  const { balance, removeTransaction, addTransaction, transactions } =
    useBalanceStore();

  const onAddMoney = () => {
    addTransaction({
      id: Math.random().toString(),
      date: new Date().toISOString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      description: "Added Money",
    });
  };
  const onExchange = () => {
    removeTransaction();
  };

  return (
    <ScrollView>
      <SafeAreaView className="bg-grey-200">
        <View>
          <View>
            <View className="mt-20 flex-row items-center justify-center gap-2">
              <Text className="font-psemibold text-4xl text-balance">
                {balance()}
              </Text>
              <Text className="font-psemibold text-xl text-balance">$</Text>
            </View>
            <View className="flex-row justify-between items-center gap-4 px-6 mt-20 ">
              <View className="flex-col items-center gap-4">
                <View className="bg-gray-200 w-16 h-16 flex-1 justify-center items-center  rounded-full">
                  <TouchableOpacity onPress={() => onAddMoney()}>
                    <Ionicons name="add" size={20} color="#FF6347" />
                  </TouchableOpacity>
                </View>
                <Text>Add Money</Text>
              </View>
              <View className="flex-col items-center gap-4">
                <View className="bg-gray-200 w-16 h-16 flex-1 justify-center items-center  rounded-full">
                  <TouchableOpacity onPress={() => onExchange()}>
                    <Ionicons name="refresh" size={30} color="#FF6347" />
                  </TouchableOpacity>
                </View>
                <Text>Exchange</Text>
              </View>
              <View className="flex-col items-center gap-4">
                <View className="bg-gray-200 w-16 h-16 flex-1 justify-center items-center  rounded-full">
                  <TouchableOpacity>
                    <Ionicons name="list" size={30} color="#FF6347" />
                  </TouchableOpacity>
                </View>
                <Text>Events</Text>
              </View>
              <DropdownMore />
            </View>
          </View>

          <View className="mt-10 px-6">
            <Text className="text-lg font-psemibold underline text-[#FF6347]">
              Recent Transactions
            </Text>

            <View className="bg-white  rounded-lg  mt-4 -pt-4  mx-2 mb-2">
              {transactions.length > 0 ? (
                transactions.map((item, index) => (
                  <View key={index}>
                    <View className="flex-row  px-6 justify-between  items-center  mt-4 -top-2">
                      <View>
                        <Text className="text-xl font-psemibold">
                          {item.description}
                        </Text>
                        <Text className="text-sm font-pregular">
                          {formatDate(new Date())}
                        </Text>
                      </View>

                      <Text
                        className={`text-sm font-psemibold ${
                          item.amount > 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {item.amount > 0 ? "+" : ""}
                        {item.amount}$
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <View className="p-4">
                  <Text className="pl-10 text-lg font-psemibold text-[#FF6347]">
                    No transaction
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <View className="mt-4">
          <Text className="text-lg font-psemibold p-4 underline text-[#FF6347]">
            Widget
          </Text>
          <WidgetList />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
