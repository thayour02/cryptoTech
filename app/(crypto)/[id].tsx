import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { Circle, useFont } from "@shopify/react-native-skia";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
} from "react-native";

import { CartesianChart, Line, useChartPressState } from "victory-native";
import { format, isValid } from "date-fns";
import * as haptic from "expo-haptics";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
import { TextInput } from "react-native";




function Tooltip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={"#D3D3D3"} />;
}
Animated.addWhitelistedNativeProps({text:true})
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const font = useFont(require("@/assets/fonts/Poppins-Regular.ttf"));
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

  const handleScroll = (event: any) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  useEffect(() => {
    console.log(isActive);
    if (isActive) haptic.selectionAsync();
  }, [isActive]);

  const category = [
    {
      id: 1,
      name: "Overview",
    },
    {
      id: 2,
      name: "News",
    },
    {
      id: 3,
      name: "Orders",
    },
    {
      id: 4,
      name: "Transaction",
    },
  ];
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const headerHeight = useHeaderHeight();

  const singleId = Array.isArray(id) ? id[0] : id;

  const { data } = useQuery({
    queryKey: ["info", singleId],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${singleId}`).then((res) =>
        res.json()
      );

      return info[singleId];
    },
  });

  const { data: tickers } = useQuery({
    queryKey: ["tickers"],
    queryFn: async (): Promise<any[]> =>
      fetch("/api/tickers")
        .then((res) => res.json())
        .then((json) =>
          Array.isArray(json) ? json : json.data || Object.values(json)
        ),
  });

  const transformedTickers =
    tickers?.map((ticker) => ({
      timestamp: ticker,
      price: parseFloat(ticker[1]),
    })) || [];


  const animatedText = useAnimatedProps(() => {
    return {
      text: `${state.y.price.value.value.toFixed(2)} $`,
      defaultValue: ``,
    };
  });
  const animatedDate = useAnimatedProps(() => {
  const timeValue = state.x.value.value;
  const timestamp = Number(timeValue); // Convert string to number
  const date = new Date(timestamp);

  return {
    text: isNaN(timestamp) || isNaN(date.getTime())
      ? ''
      : `${date.toLocaleDateString()}`,
    defaultValue: '',
  };
});
  if (data) {
    return (
      <>
        <Stack.Screen
          options={{
            headerLeft: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="arrow-back" size={28} color={"#000"} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View className="flex-row gap-4">
                <TouchableOpacity>
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color={"#000"}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="star-outline" size={20} color={"#000"} />
                </TouchableOpacity>
              </View>
            ),
            headerTitle: data?.name ? data?.name : <Text>Loading....</Text>,
            headerTransparent: true,
            headerLargeTitle: true,
            headerBackTitle: "",
            // headerShown: false,
            headerShadowVisible: false,
          }}
        />
        <SectionList
          style={{ marginTop: headerHeight }}
          sections={[
            {
              data: [{ title: "" }],
            },
          ]}
          ListHeaderComponent={() => (
            <View className="">
              <View className="flex-row justify-between items-center px-4 ">
                <Text className="font-psemibold text-xl">{data?.symbol}</Text>
                <Image
                  source={{ uri: data?.logo }}
                  resizeMode="contain"
                  className="h-14 w-14 rounded-full"
                />
              </View>
              <View className="flex-row items-center gap-4 px-4">
                <TouchableOpacity className=" flex-row px-6 bg-[#FF6347] w-[100px] h-[40px] rounded-full items-center">
                  <Ionicons name="add" size={20} color="" />
                  <Text>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity className=" flex-row px-6 bg-[#D3D3D3] w-[120px] h-[40px] rounded-full items-center">
                  <Ionicons name="arrow-back" size={20} />
                  <Text>Receive</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          onScroll={handleScroll}
          renderSectionHeader={() => (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                paddingHorizontal: 16,
                paddingBottom: 8,
                borderBottomColor: "#D3D3D3",
                borderBottomWidth: StyleSheet.hairlineWidth,
                backgroundColor: scrollY > 0 ? "#FFF" : "", // Change background color based on scrollY
              }}
            >
              {category.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveIndex(index)}
                  className={
                    activeIndex === index
                      ? " mt-2 mb-2 rounded-lg"
                      : " mt-2 opacity-50"
                  }
                >
                  <Text
                    className={
                      activeIndex === index
                        ? "text-black font-bold mt-2 text-lg"
                        : "text-gray-600 mt-2"
                    }
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          keyExtractor={(item) => item.title}
          contentInsetAdjustmentBehavior="automatic"
          renderItem={({ item }) => (
            <>
              <View className="mt-2">
                <View className="px-4 pt-4 bg-white mx-2 mb-2 h-[400px]">
                  {!isActive && (
                    <View>
                      <Text className="text-psemibold text-2xl">
                        {transformedTickers[
                          transformedTickers.length - 1
                        ].price.toFixed(2)}{" "}
                      </Text>
                      <Text className="text-gray-400">Today</Text>
                    </View>
                  )}
                  {isActive && (
                    <View>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={"transparent"}
                        className="text-psemibold text-2xl"
                        animatedProps={animatedText}
                      >
                      </AnimatedTextInput>
                        <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={"transparent"}
                        className="text-psemibold text-2xl"
                        animatedProps={animatedDate}
                      >
                      </AnimatedTextInput>
                      <Text className="text-gray-400">Today</Text>
                    </View>
                  )}

                  <CartesianChart
                    chartPressState={state}
                    axisOptions={{
                      font,
                      tickCount: 5,
                      labelOffset: { x: -2, y: 0 },
                      labelColor: "#D3D3D3",
                      formatYLabel: (v) => `${v} $`,
                      formatXLabel: (isoStr) => {
                        const date = new Date(isoStr);
                        return isValid(date) ? format(date, "MM/yy") : "";
                      },
                    }}
                    data={transformedTickers}
                    xKey="timestamp"
                    yKeys={["price"]}
                  >
                    {({ points }) => (
                      <>
                        <Line
                          points={points.price!}
                          color="green"
                          strokeWidth={2}
                        />
                        {isActive && (
                          <Tooltip
                            x={state.x.position}
                            y={state.y.price.position}
                          />
                        )}
                      </>
                    )}
                  </CartesianChart>
                </View>

                <View className="  px-4 pt-4 bg-white mx-2 mb-2">
                  <Text>
                    [Reanimated] Reading from `value` during component render.
                    Please ensure that you don't access the `value` property nor
                    use `get` method of a shared value while React is rendering
                    a component. If you don't want to see this message, you can
                    disable the `strict` mode. Refer to:
                    https://docs.swmansion.com/react-native-reanimated/docs/debugging/logger-configuration
                    for more details. λ Bundled 2ms app\api\info+api.ts (1
                    module) WARN [Layout children]: No route named "help" exists
                    in nested children: ["index", "_sitemap", "+not-found",
                    "(auth)", "(crypto)", "(tab)"] [Reanimated] Reading from
                    `value` during component render. Please ensure that you
                    don't access the `value` property nor use `get` method of a
                    shared value while React is rendering a component. If you
                    don't want to see this message, you can disable the `strict`
                    mode. Refer to:
                    https://docs.swmansion.com/react-native-reanimated/docs/debugging/logger-configuration
                    for more details. λ Bundled 2ms app\api\info+api.ts (1
                    module) WARN [Layout children]: No route named "help" exists
                    in nested children: ["index", "_sitemap", "+not-found",
                    "(auth)", "(crypto)", "(tab)"] [Reanimated] Reading from
                    `value` during component render. Please ensure that you
                    don't access the `value` property nor use `get` method of a
                    shared value while React is rendering a component. If you
                    don't want to see this message, you can disable the `strict`
                    mode. Refer to:
                    https://docs.swmansion.com/react-native-reanimated/docs/debugging/logger-configuration
                    for more details. λ Bundled 2ms app\api\info+api.ts (1
                    module) WARN [Layout children]: No route named "help" exists
                    in nested children: ["index", "_sitemap", "+not-found",
                    "(auth)", "(crypto)", "(tab)"] [Reanimated] Reading from
                    `value` during component render. Please ensure that you
                    don't access the `value` property nor use `get` method of a
                    shared value while React is rendering a component. If you
                    don't want to see this message, you can disable the `strict`
                    mode. Refer to:
                    https://docs.swmansion.com/react-native-reanimated/docs/debugging/logger-configuration
                    for more details. λ Bundled 2ms app\api\info+api.ts (1
                    module) WARN [Layout children]: No route named "help" exists
                    in nested children: ["index", "_sitemap", "+not-found",
                    "(auth)", "(crypto)", "(tab)"]
                  </Text>
                </View>
              </View>
            </>
          )}
        />
      </>
    );
  } else {
    return <Text>loading...</Text>;
  }
};

export default Page;
