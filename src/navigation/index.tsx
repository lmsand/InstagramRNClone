import {NavigationContainer, LinkingOptions} from '@react-navigation/native';
import CommentsScreen from '../screens/CommentsScreen';
import {Text} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';

import {RootNavigatorParamList} from '../types/navigation';

import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

const Stack = createNativeStackNavigator<RootNavigatorParamList>(); // {Navigator, Screen}

const linking: LinkingOptions<RootNavigatorParamList> = {
  // prefixes: ['notjustinsta://', 'https://notjustinsta.com']
  // prefixes: [Linking.createURL('/'), 'https://notjustinsta.com'],
  prefixes: ['notjustphotos://', 'https://notjustphotos.com'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Comments: 'comments',
      Home: {
        screens: {
          HomeStack: {
            initialRouteName: 'Feed',
            screens: {
              UserProfile: 'user/:userId',
            },
          },
        },
      },
    },
  },
};

const Navigation = () => {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{headerShown: true}}>



        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />

        <Stack.Screen name="Comments" component={CommentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
