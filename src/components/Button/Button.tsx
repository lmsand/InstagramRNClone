import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'
import fonts from '../../theme/fonts'

interface IButton {
  text?: string
  onPress?: () => void
  inline?: boolean
}

const Button = ({ text = "", onPress = () => {}, inline = false }: IButton) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, inline ? {flex:1} : {}]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,

    padding: 5,

    alignItems: 'center',

    margin: 5
  },
  text: {
    color: colors.black,
    fontWeight: fonts.weight.semi
  }
})
