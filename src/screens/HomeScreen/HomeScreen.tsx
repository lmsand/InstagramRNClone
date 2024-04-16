import {
  FlatList,
  ViewabilityConfig,
  ViewToken,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from 'react-native';
import FeedPost from '../../components/FeedPost';
import posts from '../../assets/data/posts.json';
import {useRef, useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import {listPosts} from './queries';
import {ListPostsQueryVariables, ListPostsQuery} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';

{
  /* <StatusBar style="auto" /> */
}

const HomeScreen = () => {
  const [acivePostId, setActivePostId] = useState<string | null>(null);
  const {data, loading, error} = useQuery<
    ListPostsQuery,
    ListPostsQueryVariables
  >(listPosts);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id);
      }
    },
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ApiErrorMessage title='Error fetching posts' message={error.message} />
  }

  const posts = data?.listPosts?.items || [];

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        renderItem={({item}) =>
          item && <FeedPost isVisible={item.id === acivePostId} post={item} />
        }
        // keyExtractor={item => { return `post-${item.createdAt}`}}
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
