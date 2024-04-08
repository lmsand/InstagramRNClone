import { StyleSheet, Text, View, FlatList } from "react-native";
import comments from "../../assets/data/comments.json";
import Comment from "../../components/Comment";
import React from "react";
import CommentInput from "./CommentInput";

const CommentsScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={comments}
        renderItem={({ item }) => <Comment comment={item} includeDetails />}
        style={{ padding: 10 }}
      />
      <CommentInput />
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({});
