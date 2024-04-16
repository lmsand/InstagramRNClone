import {Image, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import user from '../../assets/data/user.json';
import ProfileHeader from './ProfileHeader';
import FeedGridView from '../../components/FeedGridView';
import {useRoute, useNavigation} from '@react-navigation/native';
import {
  UserProfileNavigationProp,
  UserProfileRouteProp,
  MyProfileNavigationProp,
  MyProfileRouteProp,
} from '../../types/navigation';
import {useQuery} from '@apollo/client';
import {getUser} from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {GetUserQuery, GetUserQueryVariables} from '../../API';
import {getCurrentUser} from 'aws-amplify/auth';

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const navigation = useNavigation<
    UserProfileNavigationProp | MyProfileNavigationProp
  >();


  const userId = route.params?.userId; // recieves user from route
  // query the user with userId

  const {data, loading, error} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userId}},
  );

  const user = data?.getUser;

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !user) {
    return (
      <ApiErrorMessage
        title="Error fetching the user"
        message={error?.message || 'User not found'}
      />
    );
  }

  return (
    <FeedGridView
      data={user.Posts?.items || []}
      ListHeaderComponent={() => <ProfileHeader user={user} />}
    />
  );
};

export default ProfileScreen;
