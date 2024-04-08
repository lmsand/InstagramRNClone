import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import React from "react";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import { useState } from "react";

const CommentInput = () => {
  const [newComment, setNewComment] = useState("");

  const onPost = () => {
    console.warn("posting the comment");
    // sending the data to backend
    setNewComment('')
  };

  return (
    <SafeAreaView>
      <View style={styles.root}>
        <Image
          source={{
            uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg",
          }}
          style={styles.image}
        />
        <TextInput
          value={newComment}
          // onChangeText={newText => setNewComment(newText)}
          onChangeText={setNewComment}
          placeholder="Write your comment..."
          style={styles.input}
          multiline
        />
        <Text onPress={onPost} style={styles.button}>
          POST
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    padding: 5,
    borderTopWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-end'
  },
  image: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
  },
  input: {
    flex: 1,

    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 25,

    paddingVertical: 5,
    paddingRight: 50,
    paddingHorizontal: 10,
    marginLeft: 5,
  },
  button: {
    position: "absolute",
    right: 15,
    bottom: 15,
    fontSize: fonts.size.s,
    fontWeight: fonts.weight.full,
    color: colors.primary,
  },
});
