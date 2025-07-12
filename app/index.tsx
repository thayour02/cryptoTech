import { useAssets } from "expo-asset";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Button, Text } from "react-native";
import CustomButton from "../components/customButton";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
// @ts-ignore
import homevideo from "../assets/images/intro.mp4";

export default function App() {

  const videoSource =  homevideo
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });
  if (!videoSource) return <View className="flex-1 bg-primary justify-center ">
    <Text>Loading....</Text>
  </View>;

  return (
    <View className="flex-1  bg-primary justify-between">
      <VideoView
         player={player}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        nativeControls={false}
        style={styles.video}
      />
      <View className='mt-20 p-10  relative'>
        <Text className='text-5xl text-white uppercase pt-4 font-psemibold'>Welcome Take Charge of your financial life</Text>
      </View>
      <View className="flex-row justify-between px-4 items-center -top-[30px]">
        <CustomButton
          title="Login"
          handlePress={() => router.push("/login")}
          containerStyles="w-[180px] rounded-full "
          isLoading={false}
          textStyles=""
        />
        <CustomButton
          title="Sign  Up"
          handlePress={() => router.push("/sign-up")}
          containerStyles="w-[180px] rounded-full "
          isLoading={false}
          textStyles=""
        />
      </View>
    <StatusBar style="light" translucent backgroundColor="transparent" />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    // justifyContent: "space-between",
    // backgroundColor: "#0000",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  controlsContainer: {
    padding: 10,
    display: "none",
  },
});
