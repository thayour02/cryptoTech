import { Alert, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView, Text, View, ScrollView, TextInput,StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import CustomButton from "../../components/customButton";
import { Ionicons } from "@expo/vector-icons";
import {useSignIn} from "@clerk/clerk-expo"
import { useRouter } from "expo-router";


const SignInType = {
  Phone: "phone",
  Email: "email",
  Apple: "apple",
  Google: "google",
};

const SignIn = () => {
 const [phoneNumber,setPhoneNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");


  const inputRef = useRef<TextInput>(null)

  const handleChange = (text: string) => {
    if(text.length <= 4){
      setCountryCode(text)
    } 
    if(text.length === 4){
      inputRef.current?.blur()
    }
  }

  const {signIn,setActive} = useSignIn();

  const router = useRouter()

  const handleSubmit = async (signInType: string) => {
    if(signInType === SignInType.Phone){
      try {
        const fullNumber = `${countryCode}${phoneNumber}`
        const {supportedFirstFactors} = await signIn!.create({
          identifier: fullNumber,
        })

        const firstPhoneFactor: any = supportedFirstFactors?.find((factor:any)=>{
          return factor.strategy === 'phone_code'
        });

        const {phoneNumberId} = firstPhoneFactor
        await signIn!.prepareFirstFactor({
          strategy:'phone_code',
          phoneNumberId
        })

      await setActive!({session: signIn!.createdSessionId});

        router.push({pathname:"/[verify]",  params:{verify: fullNumber, phone: fullNumber, signin: 'true'}})
      } catch (error) {
        console.log("error", JSON.stringify(error, null, 2));
       Alert.alert("Error", error?.errors?.[0]?.message || error.message);
      }
    }


  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : 0;

  return (
    <SafeAreaView className="bg-[#161622] h-full w-full">
        <ScrollView>
          <View className="mt-18 p-4">
            <Text className="text-white font-pbold text-4xl w-[300px] mb-2">
              Welcome Back !!
            </Text>
            <Text className="text-white font-psemibold text-xm">
              Enter your phone number you used to your create account
            </Text>
          </View>
          <View className="flex-row items-center gap-4 mt-4 p-4">
            <TextInput
               ref={inputRef}
              placeholder=""
              value={countryCode}
              maxLength={4}
              className="w-20 h-16  rounded-md bg-[#1f1f2e] text-white px-4"
              placeholderTextColor="#6b7280"
              onChangeText={handleChange}
            />
            <TextInput
              placeholder="Mobile Number"
              value={phoneNumber}
              className="h-16 w-[258px] rounded-md bg-[#1f1f2e] text-white px-4"
              placeholderTextColor="gray"
              onChangeText={setPhoneNumber}
              // keyboardType="number-pad"
            />
          </View>

          <View className="px-4 flex-row -mt-2 items-center  gap-2">
            <Text className={"text-white text-sm font-pregular"}>
              Don&apos;t have an account?
            </Text>
            <Link
              href="/sign-up"
              style={{
                color: "#FF9C01",
              }}
              className={"underline font-pregular text-1xl"}
            >
              Sign-Up
            </Link>
          </View>

          <View style={{flex: 1}} className="px-6 mt-4">
              <CustomButton
            containerStyles="w-full   rounded-full items-center mx-auto "
            textStyles="text-white"
            title="Login"
            handlePress={()=>handleSubmit(SignInType.Phone)}
            isLoading={isSubmitting}
          />
        </View>
        
      <View className='flex-row items-center mx-2 mt-2'>
          <View style={{flex:1, marginRight:8, height:StyleSheet.hairlineWidth, backgroundColor:"#FF9001"}}></View>
          <Text className='text-white text-2xl'>OR</Text>
          <View style={{flex:1, marginLeft:4, height:StyleSheet.hairlineWidth, backgroundColor:"#FF9001"}}></View>
        </View>
        <View className="items-center   px-10 space-y-5" >
            {/* // log-in with mail */}
          <TouchableOpacity className="flex-row items-center px-10 h-16  mt-4 w-full  bg-black-200  rounded-full p-2"  
          onPress={() =>handleSubmit(SignInType.Email)}>
            <Ionicons name="mail" color={"#FF9001"} className='px-4' size={24}/>
            <Text className="text-white font-psemibold px-4">Continue with Email</Text>
          </TouchableOpacity>

            {/* // log-in with appleId */}
          <TouchableOpacity className="flex-row items-center h-16 gap-2 mt-4 px-10 w-full  bg-black-200  rounded-full p-2" 
           onPress={() =>handleSubmit(SignInType.Apple)}>
            <Ionicons name="logo-apple" color={"#FF9001"} className='px-4' size={24}/>
            <Text className="text-white font-psemibold">Continue with Apple</Text>
          </TouchableOpacity>

            {/* // log-in with gmail */}
          <TouchableOpacity className="flex-row items-center h-16 gap-2 mt-4 px-10 w-full bg-black-200  rounded-full p-2">
            <Ionicons name="logo-google" color={"#FF9001"} className='px-4' size={24}/>
            <Text className="text-white font-psemibold">Continue with Google</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
