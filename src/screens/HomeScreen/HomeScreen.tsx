import { FlatList, ViewabilityConfig, ViewToken, SafeAreaView, ActivityIndicator, Text } from "react-native";
import FeedPost from "../../components/FeedPost";
import posts from "../../assets/data/posts.json";
import { useRef, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

{
  /* <StatusBar style="auto" /> */
}

export const listPosts = /* GraphQL */ gql`
query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      description
      image
      images
      video
      nofComments
      nofLikes
      userID
      createdAt
      updatedAt
      __typename
      User {
        id
        name
        username
        image
      }
      Comments {
        items {
          id
          comment
          User {
            id
            name
            username
          }
        }
      }
    }
    nextToken
    __typename
  }
}
`

const HomeScreen = () => {
  const [acivePostId, setActivePostId] = useState<string | null>(null)
  const {data, loading, error} = useQuery(listPosts)


  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id)
      }
    },
  );

  if (loading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>{error.message}</Text>
  }

  const posts = data.listPosts.items

  return (
    <SafeAreaView>
      <FlatList
      data={posts}
      renderItem={({ item }) => <FeedPost isVisible={item.id === acivePostId} post={item}  />}
      // keyExtractor={item => { return `post-${item.createdAt}`}}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged.current}
    />
    </SafeAreaView>
  );
};

export default HomeScreen;
