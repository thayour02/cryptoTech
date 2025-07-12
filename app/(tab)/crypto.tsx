import { CryptoCurrency } from "@/interfaces/cryptointerface";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import React from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Crypto = () => {
  const currencies = useQuery({
    queryKey: ["listings"],
    queryFn: () => fetch(`/api/listings`).then((res) => res.json()),
  });
  const ids = currencies.data
    ?.map((currency: CryptoCurrency) => currency.id)
    .join(",");

  const { data } = useQuery({
    queryKey: ["infos", ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  return (
    <ScrollView className="mt-6">
      <View className="px-4">
        <Text className="text-xl mb-4 text-pregular">Latest Crypto</Text>
        {currencies.data?.map((currency: CryptoCurrency) => (
          <Link
            key={currency.id}
            href={`/(crypto)/${currency.id}`}
            asChild
            className="bg-white pt-4 rounded-sm mb-2"
          >
            <TouchableOpacity className="px-4 flex-row  justify-between items-center">
              <View className="flex-row gap-4 mb-2">
                <Image
                  source={{ uri: data?.[(currency.id)]?.logo }}
                  className="w-14 h-14"
                  resizeMode="contain"
                />
                <View className="pt-2">
                  <Text className="">{currency.name}</Text>
                  <Text>{currency.symbol}</Text>
                </View>
              </View>

              <View>
                <Text className="text-psemibold">{currency?.quote.EUR.price.toFixed(2)} $</Text>
                <View>
                  <Text
                    className={
                      currency?.quote.EUR.percent_change_1h > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {currency?.quote.EUR.percent_change_1h.toFixed(3)} %
                  </Text>

                  <Ionicons
                    name={
                      currency?.quote.EUR.percent_change_1h > 0
                        ? "caret-up"
                        : "caret-down"
                    }
                    color={
                      currency?.quote.EUR.percent_change_1h > 0
                        ? "green"
                        : "red"
                    }
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default Crypto;
