import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PostUploadScreen from "../screens/PostUploadScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import colors from "../theme/colors";
import HomeStackNavigator from "./HomeStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import { BottomTabNavigatorParamList } from "../types/navigation";
import SearchTabNavigator from "./SearchTabNavigator";

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false, tabBarActiveTintColor: colors.primary}}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home-filled" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchTabNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={PostUploadScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircleo" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={PostUploadScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hearto" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle-o" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
