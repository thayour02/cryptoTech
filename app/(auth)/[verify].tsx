import { useLocalSearchParams,Link } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import { Text, View, SafeAreaView,StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";




const Verify = () => {
  const { phone, signin } = useLocalSearchParams<{
    phone: string;
    signin: string;
  }>();

 

  const [code, setCode] = useState("");

  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const CELL_COUNT = 6;

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      if (signin === "true") {
        console.log(signin, 'signin')
        verifySignIn();
      } else {
        verifyCode();
      }
    } 
  }, [code]);

  const verifyCode = async () => {
   
    try {
      await signUp!.attemptPhoneNumberVerification({
        code,
      })
      await setActive!({session:signUp!.createdSessionId})
      if (signUp!.createdSessionId) {
        Alert.alert('success', 'Phone number verified successfully');
      }
    } catch (error: any) {
      console.log('error', JSON.stringify(error, null, 2));
    if (error.errors[0].code === 'verification_already_verified') {
      try {
        await setActive!({ session: signUp!.createdSessionId });
        Alert.alert('Success', 'Signed in successfully');
      } catch (error: any) {
        console.log('error', JSON.stringify(error, null, 2));
        Alert.alert('Error', error.errors[0].message);
      }
    } else {
      Alert.alert('Error', error.errors[0].message);
    }

    }
  };
  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: 'phone_code',
        code
      })
      await setActive!({session: signIn!.createdSessionId});
      if(signIn!.createdSessionId){
        Alert.alert('Success', 'Phone number verified successfully');
      }
    } catch (error: any) {
        console.log('error', JSON.stringify(error, null, 2));
    if (error.errors[0].code === 'verification_already_verified') {
      try {
        await setActive!({ session: signIn!.createdSessionId });
      if(signIn!.createdSessionId){
        console.log('set active', signIn!.createdSessionId)
      }
        Alert.alert('Success', 'Signed in successfully');
      } catch (error: any) {
        console.log('error', JSON.stringify(error, null, 2));
        Alert.alert('Error', error.errors[0].message);
      }
    } else {
      Alert.alert('Error', error.errors[0].message);
    }
    }
  };
  
  return (
    <SafeAreaView className="bg-[#161622] h-full w-full">
      <View className="mt-16 p-4">
        <Text className="text-white mt-2 font-pbold text-4xl mb-2 w-[300px] ">
          6-digit code
        </Text>
        <Text className="font-regular text-sm text-[#FF9001]">
           Code sent to {phone} unless you already have an account
        </Text>
      </View>
      <View>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
            {index === 2 ? <View key={`separator-${index}`} style={styles.separator} /> : null}
          </Fragment>
        )}
      />

      <Link href={'/login'} replace asChild>
        <TouchableOpacity>
          <Text className="p-4 text-white">Already have an account? <Text className="text-[#FF9001]">Log in</Text></Text>
        </TouchableOpacity>
      </Link>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f1f2e',
    borderRadius: 8,
  },
  cellText: {
    color: '#FF9001',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 4,
    width: 10,
    backgroundColor: "#FF9001",
    alignSelf: 'center',
  },
});

export default Verify;
