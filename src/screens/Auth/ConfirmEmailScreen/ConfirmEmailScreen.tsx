import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, Button} from 'react-native';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {
  ConfirmEmailNavigationProp,
  ConfirmEmailRouteProp,
} from '../../../types/navigation';
import {useRoute} from '@react-navigation/native';
import { confirmSignUp } from 'aws-amplify/auth';
import { resendSignUpCode } from 'aws-amplify/auth';


type ConfirmEmailData = {
  username: string;
  confirmationCode: string;
};

const ConfirmEmailScreen = () => {
  const route = useRoute<ConfirmEmailRouteProp>();
  const {control, handleSubmit, watch} = useForm<ConfirmEmailData>({
    defaultValues: {username: route.params.username},
  });
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation<ConfirmEmailNavigationProp>();
  const username = watch('username')

  const onConfirmPressed = async ({username, confirmationCode}: ConfirmEmailData) => {
    try {
      await confirmSignUp({
        username,
        confirmationCode
      });
      navigation.navigate('Sign in');
    } catch (e) {
      Alert.alert('oops', (e as Error).message)
    } finally {
      setLoading(false)
    }


  };

  const onSignInPress = () => {
    navigation.navigate('Sign in');
  };

  const onResendPress = async () => {
    try {
      await resendSignUpCode({username});
    } catch (e) {
      console.log(e)
    }

  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <FormInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
          }}
        />

        <FormInput
          name="confirmationCode"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />

        <CustomButton text={loading ? 'loading' : "Confirm"} onPress={handleSubmit(onConfirmPressed)} />



        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmEmailScreen;
