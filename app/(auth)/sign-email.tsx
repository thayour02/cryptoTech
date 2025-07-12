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

const SignUpEmail = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email,setEmail] = useState("")

const router = useRouter()

const {signUp} = useSignUp()
const {signIn,setActive} = useSignIn()


 const handleSubmit = async (SignInType: string) => {
  if (!email.trim()) {
    Alert.alert("Please input your email");
    return;
  }
  try {
    // Step 1: Create a new sign-up attempt with the email
  const res =  await signUp!.create({ email });
  // console.log(res)

   await signIn!.attemptFirstFactor({
        strategy: 'ticket',
        // email
      })
      await setActive!({session: signIn!.createdSessionId});

    // Step 2: Prepare to send the verification code
    // const coode = await signUp!.prepareEmailAddressVerification({
    //   strategy:"email_code"
    // });
    // if(!coode){
    //   Alert.alert("Error", error?.errors?.[0]?.message || error.message);
    // }

    // Step 3: Redirect to verification screen
    router.push({
      pathname: "/Home",
      params: { verify: email, email: email },
    });

  } catch (error: any) {
    console.log("error", JSON.stringify(error, null, 2));
    Alert.alert("Error", error?.errors?.[0]?.message || error.message);
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
              placeholder="Email"
              value={email}
              className="h-16 w-[260px] rounded-md bg-[#1f1f2e] text-white px-4"
              placeholderTextColor="gray"
              onChangeText={setEmail}
               keyboardType="email-address"
             />
          </View>
            <View className="pl-4 flex-row -mt-2 items-center  gap-2">
            <Link href="/sign-up"              
            >
              <Text className="text-white  font-pregular text-2sm"> Sign up with  </Text>
              <Text className={"text-[#FF9C01] font-pregular text-xl underline"}>
                phone number instead?
              </Text>
            </Link>
          </View>
          <View className="p-4 flex-row -mt-2 items-center  gap-2">
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

export default SignUpEmail;
