import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import { IComment } from "../../types/models";
import { useState } from "react";

interface ICommentProps {
  comment: IComment;
  includeDetails: boolean;
}

const Comment = ({ comment, includeDetails = false }: ICommentProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked((v) => !v);
  };

  return (
    <View style={styles.comment}>
      {includeDetails && (
        <Image source={{ uri: comment.user.image }} style={styles.avatar} />
      )}

      <View style={styles.middleColumn}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment.user.username}</Text>{" "}
          {comment.comment}
        </Text>
        {includeDetails && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>2d</Text>
            <Text style={styles.footerText}>5 likes</Text>
            <Text style={styles.footerText}>Reply</Text>
          </View>
        )}
      </View>

      <Pressable onPress={toggleLike} hitSlop={2}>
        <AntDesign
          name={isLiked ? "heart" : "hearto"}
          color={isLiked ? colors.accent : colors.black}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 5,
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
  commentText: {
    color: colors.black,
    lineHeight: 18,
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 5,
  },
  middleColumn: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  footerText: {
    marginRight: 10,
    color: colors.grey,
  },
});

export default Comment;