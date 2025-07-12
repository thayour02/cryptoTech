import { Alert, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView, Text, View, ScrollView, TextInput,StyleSheet } from "react-native";
import { Link, useNavigation, useRouter } from "expo-router";
import { useState,useRef } from "react";
import CustomButton from "../../components/customButton";
import { Ionicons } from "@expo/vector-icons";
import {useSignUp,useSignIn} from "@clerk/clerk-expo"


const SignInType = {
  Phone: "phone",
  Email: "email",
  Apple: "apple",
  Google: "google",
};

const SignUp = () => {
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

const router = useRouter()

const {signUp} = useSignUp()


    const inputRef = useRef<TextInput>(null);

  const handleChange = (text:string) => {
    if (text.length <= 4) {
      setCountryCode(text);
      if (text.length === 4) {
        inputRef.current?.blur(); 
      }
    }
  };

  const handleSubmit = async (SignInType:string) => {
     if (!phoneNumber.trim()) {
    Alert.alert("Input Error", "Please enter your phone number.");
    return;
  }
    const fullNumber = `${countryCode}${phoneNumber}`
    try {
      await signUp!.create({
        phoneNumber:fullNumber
      })
      signUp!.preparePhoneNumberVerification();
        router.push({ pathname: "/[verify]", params: { verify: fullNumber, phone: fullNumber } })
        // router.push('/home')
    } catch (error: any) {
       console.log('error', JSON.stringify(error, null, 2))
      Alert.alert('Error', error?.errors[0]?.message)
    }
  };






  return (
    <SafeAreaView className="bg-[#161622] h-full w-full ">
        <ScrollView>
          <View className="p-4">
            <Text className="text-white uppercase font-pbold text-4xl w-[300px] mb-">
              Let Get Started !!
            </Text>
            <Text className="text-white font-psemibold text-xm">
              Enter your phone number a confirmation code will be sent to this number..
            </Text>
          </View>
          <View className="flex-row items-center gap-4  p-4">
            <TextInput
              ref={inputRef}
              placeholder=""
              value={countryCode}
              className="w-20 h-16  rounded-md bg-[#1f1f2e] text-white px-4"
              placeholderTextColor="#6b7280"
              maxLength={4}
              onChangeText={handleChange}
            /> 
             <TextInput
              placeholder="Mobile Number"
              value={phoneNumber}
              className="h-16 w-[258px] rounded-md bg-[#1f1f2e] text-white px-4"
              placeholderTextColor="gray"
              onChangeText={setPhoneNumber}
              keyboardType="number-pad"
            />
          </View>
          <View className="pl-4 flex-row -mt-2 items-center  gap-2">
            <Link href="/sign-email"              
            >
              <Text className="text-white  font-pregular text-2sm"> Sign up with  </Text>
              <Text className={"text-[#FF9C01] font-pregular text-xl underline"}>
                email instead?
              </Text>
            </Link>
          </View>
          <View className="p-4 flex-row -mt-1 items-center  gap-2">
            <Text className={"text-white font-pregular text-2sm"}>
              Already have an account?
            </Text>
            <Link
              href="/login"
              style={{
                color: "#FF9C01",
              }}
              className={"underline font-pregular text-2sm"}
            >
              Sign-In
            </Link>
          </View>
       

          <View style={{flex: 1}} className="px-6 mt-4">
          <CustomButton
            containerStyles="w-full   rounded-full items-center mx-auto "
            textStyles="text-white"
            title="Register"
            // handlePress={()=>handleSubmit(SignInType.Phone)}
            handlePress={()=>handleSubmit(SignInType.Email)}
            isLoading={isSubmitting}
          />
        </View>
        
      <View className='flex-row items-center px-4 mt-4'>
          <View style={{flex:1, marginRight:8, height:StyleSheet.hairlineWidth, backgroundColor:"#FF9001"}}></View>
          <Text className='text-white text-2xl '>OR</Text>
          <View style={{flex:1, marginLeft:8, height:StyleSheet.hairlineWidth, backgroundColor:"#FF9001"}}></View>
        </View>
        <View className="items-center   px-10 space-y-5" >
          <TouchableOpacity className="flex-row items-center px-10 h-16  mt-4 w-full  bg-black-200  rounded-full p-2">
            <Ionicons name="mail" color={"#FF9001"} className='px-4' size={24}/>
            <Text className="text-white font-psemibold px-4">Continue with Email</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center gap-2 h-16  mt-4 px-10 w-full  bg-black-200  rounded-full p-2" 
           onPress={() =>handleSubmit(SignInType.Apple)}>
            <Ionicons name="logo-apple" color={"#FF9001"} className='px-4' size={24}/>
            <Text className="text-white font-psemibold">Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center gap-2 h-16  
          mt-4 px-10 w-full bg-black-200  rounded-full p-2"
          onPress={()=>handleSubmit(SignInType.Google)}>
            <Ionicons name="logo-google" color={"#FF9001"} className='px-4' size={24}/>
            <Text className="text-white font-psemibold">Continue with Google</Text>
          </TouchableOpacity>
        </View>
   
        </ScrollView>
     

    </SafeAreaView>
  );
};

export default SignUp;
