import { View, Image } from 'react-native'
import React from 'react'
import { Post } from '../../API';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../theme/colors';

const FeedGridItem = ({post}: {post: Post}) => {
  return (
    <View style={{ flex: 1, padding: 1, aspectRatio: 1, maxWidth: `${100 / 3}%` }}>
       <Image
        source={{ uri: post.image || post.images?.[0] }}
        style={{flex: 1}}
      />
      {post.images && (
        <MaterialIcons name="collections" size={16} color={colors.white} style={{position: 'absolute', top: 5, right: 5}} />
      )}
    </View>
  )
}

export default FeedGridItem
