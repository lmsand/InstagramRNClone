import { Image, FlatList } from "react-native";
import React from "react";
import user from "../../assets/data/user.json";
import ProfileHeader from "./ProfileHeader";
import FeedGridView from "../../components/FeedGridView";
import { useRoute, useNavigation } from "@react-navigation/native";
import { UserProfileNavigationProp, UserProfileRouteProp, MyProfileNavigationProp, MyProfileRouteProp } from "../../types/navigation";

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>()
  const navigation = useNavigation<UserProfileNavigationProp | MyProfileNavigationProp>()

  const userId = route.params?.userId // recieves user from route
  // query the user with userId

  return (
    <FeedGridView
     data={user.posts}
     ListHeaderComponent={ProfileHeader}
    />
  )
};

export default ProfileScreen;
