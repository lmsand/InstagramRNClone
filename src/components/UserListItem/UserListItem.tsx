import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { IUser } from '../../types/models'
import fonts from '../../theme/fonts'
import colors from '../../theme/colors'
import { useNavigation } from '@react-navigation/native'

interface IUserListITem {
  user: IUser
 }
const UserListItem = ({user}: IUserListITem) => {
  const navigation = useNavigation()

  const goToUserScreen = () => {
    navigation.navigate('UserProfile', {userId: user.id})
  }

  return (
    <Pressable onPress={goToUserScreen} style={styles.root}>

      <Image source={{uri: user.image}} style={styles.image} />

      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </Pressable>
  )
}

export default UserListItem

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 10
  },
  name: {
    fontWeight: fonts.weight.bold,
    marginBottom: 5
  },
  username: {
    color: colors.grey
  }
})
