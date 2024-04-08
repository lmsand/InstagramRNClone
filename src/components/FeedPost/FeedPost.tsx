import { Image, Pressable, Text, View } from "react-native";
import colors from "../../theme/colors";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import Comment from "../Comment";
import { IPost } from "../../types/models";
import { useState } from "react";
import DoublePressable from "../DoublePressable";
import Carousel from "../Carousel";
import VideoPlayer from "../VideoPlayer";
import { useNavigation } from "@react-navigation/native";
import {FeedNavigationProp} from '../../types/navigation'

{
  /* <StatusBar style="auto" /> */
}

interface IFeedPost {
  post: IPost;
  isVisible: boolean
}

const FeedPost = ({ post, isVisible }: IFeedPost) => {
  // const {post} = props
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const navigation = useNavigation<FeedNavigationProp>()

  const navigateToUser = () => {
    navigation.navigate('UserProfile', {userId: post.user.id})
  }

  const navigateToComments = () => {
    navigation.navigate("Comments", {postId: post.id})
  }

  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded((v) => !v);
  };

  const toggleLike = () => {
    setIsLiked((v) => !v);
  };

  let content = null;
  if (post.image) {
    content = (
      <DoublePressable onDoublePress={toggleLike}>
        <Image
          source={{
            uri: post.image,
          }}
          style={styles.image}
        />
      </DoublePressable>
    );
  } else if (post.images) {
    content = <Carousel images={post.images} onDoublePress={toggleLike} />;
  } else if (post.video) {
    content =
    <DoublePressable onDoublePress={toggleLike}>
      <VideoPlayer uri={post.video} paused={!isVisible ? false : true} />
    </DoublePressable>
  }

  return (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: post.user.image,
          }}
          style={styles.userAvatar}
        />
        <Text onPress={navigateToUser} style={styles.userName}>{post.user.username}</Text>

        <Entypo
          name="dots-three-horizontal"
          size={16}
          style={styles.threeDots}
        />
      </View>

      {/* Content */}
      {content}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={toggleLike}>
            <AntDesign
              name={isLiked ? "heart" : "hearto"}
              size={24}
              color={isLiked ? colors.accent : colors.black}
              style={styles.icon}
            />
          </Pressable>

          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={colors.black}
            style={styles.icon}
          />

          <Feather
            name="send"
            size={24}
            color={colors.black}
            style={styles.icon}
          />

          <Feather
            name="bookmark"
            size={24}
            color={colors.black}
            style={{ marginLeft: "auto" }}
          />
        </View>

        {/* Likes */}
        <Text style={styles.text}>
          Liked by <Text style={styles.bold}>username99</Text> and{" "}
          <Text style={styles.bold}>{post.nofLikes} others</Text>
        </Text>

        {/* Post description */}
        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 3}>
          <Text style={styles.bold}>{post.user.username}</Text>{" "}
          {post.description}
        </Text>
        <Text
          onPress={toggleDescriptionExpanded}
          style={{ color: colors.lightgrey }}
        >
          {isDescriptionExpanded ? "less" : "more"}
        </Text>

        {/* Comments */}
        <Text onPress={navigateToComments} style={{ color: colors.lightgrey }}>
          View all {post.nofComments} comments
        </Text>
        {post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}

        {/* Posted Date */}
        <Text>{post.createdAt}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
