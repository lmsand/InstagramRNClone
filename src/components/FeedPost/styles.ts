import { StyleSheet } from "react-native";
import fonts from "../../theme/fonts";
import colors from "../../theme/colors";

export default StyleSheet.create({
  post: {},
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontWeight: fonts.weight.bold,
    color: colors.black,
  },
  threeDots: {
    marginLeft: "auto",
  },
  footer: {
    padding: 10,
  },
  iconContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  text: {
    color: colors.black,
    lineHeight: 18
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
});
