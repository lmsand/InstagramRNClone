import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {SignInNavigationProp} from '../../../types/navigation';
import { signIn, type SignInInput } from 'aws-amplify/auth'
import { useState } from 'react';

type SignInData = {
  username: string;
  password: string;
};

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation<SignInNavigationProp>();
  const[loading, setLoading] = useState(false)

  const {control, handleSubmit, watch, reset} = useForm<SignInData>();

  const onSignInPressed = async ({username, password}: SignInData) => {
    if (loading) {
      return
    }
    setLoading(true)

    try {
      const cognitoUser = await signIn({ username, password })
    } catch (e) {
      Alert.alert('oops', (e as Error).message)
      // if ((e as Error).name === 'UserNotConfirmedException') {
      //   navigation.navigate('Confirm email', {username})
      // } else {
      //   Alert.alert('oops', (e as Error).message)
      // }
    } finally {
      setLoading(false)
      reset()
    }

    // validate user
    // navigation.navigate('Home');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('Forgot password');
  };

  const username = watch('username')

  const onCodeRegisterPressed = () => {
    navigation.navigate('Confirm email', {username});
  };

  const onSignUpPress = () => {
    navigation.navigate('Sign up');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <FormInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{required: 'Username is required'}}
        />

        <FormInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />

        <CustomButton text={loading ? 'loading' : "Sign In"} onPress={handleSubmit(onSignInPressed)} />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />

        <CustomButton
          text="Already registered? Enter code"
          onPress={onCodeRegisterPressed}
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
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
