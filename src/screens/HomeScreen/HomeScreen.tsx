import { FlatList, ViewabilityConfig, ViewToken, SafeAreaView } from "react-native";
import FeedPost from "../../components/FeedPost";
import posts from "../../assets/data/posts.json";
import { useRef, useState } from "react";

{
  /* <StatusBar style="auto" /> */
}

const HomeScreen = () => {
  const [acivePostId, setActivePostId] = useState<string | null>(null)

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

  return (
    <SafeAreaView>
      <FlatList
      data={posts}
      renderItem={({ item }) => <FeedPost post={item} isVisible={acivePostId === item.id} />}
      // keyExtractor={item => { return `post-${item.createdAt}`}}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged.current}
    />
    </SafeAreaView>
  );
};

export default HomeScreen;
