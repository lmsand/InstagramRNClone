import { Text, View, Image } from "react-native";
import React from "react";
import user from "../../assets/data/user.json";
import styles from "./styles";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigationProp } from "../../types/navigation";
import { signOut } from 'aws-amplify/auth';
import { User } from "../../API";
import { DEFAULT_USER_IMAGE } from "../../config";

interface IProfileHeader {
  user: User
}

const ProfileHeader = ({user}: IProfileHeader) => {
  const navigation = useNavigation<ProfileNavigationProp>()

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        {/* Profile image */}
        <Image source={{ uri: user.image || DEFAULT_USER_IMAGE }} style={styles.avatar} />

        {/* Posts, followers, following number */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofPosts}</Text>
          <Text>Posts</Text>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowers}</Text>
          <Text>Followers</Text>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowings}</Text>
          <Text>Following</Text>
        </View>
      </View>

      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>

      {/* Buttons */}
      <View style={{ flexDirection: "row" }}>
        <Button
          text="Edit Profile"
          onPress={() => navigation.navigate("Edit Profile")}
          inline
        />

        <Button text="sign out" onPress={() => handleSignOut()} inline />
      </View>


    </View>
  );
};

export default ProfileHeader
