import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/colors";
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from "../../../../styles/genericDimensions";

export default StyleSheet.create({
  card: {
    paddingVertical: verticalScale(50),
    paddingHorizontal: horizontalScale(30),
    marginTop: verticalScale(40),
    backgroundColor: colors.background,
    borderRadius: moderateScale(30),
  },

  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    backgroundColor: colors.foreground,
    height: verticalScale(50),
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(30),
    width: horizontalScale(300),
    paddingLeft: horizontalScale(12),
    fontFamily: "BalooRegular",
    fontSize: moderateScale(20),
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: moderateScale(15),
    alignItems: "center",
    justifyContent: "center",
    width: horizontalScale(230),
    height: verticalScale(55),
    marginBottom: verticalScale(20),
    fontFamily: "BalooBold",
  },

  text: {
    color: colors.background,
    fontSize: moderateScale(26),
    fontWeight: "bold",
    fontFamily: "BalooBold",
  },

  linkContainer: {
    flexDirection: "row",
  },

  question: {
    color: colors.grey,
    marginRight: horizontalScale(5),
    fontSize: moderateScale(16),
  },

  link: {
    color: "blue",
    fontSize: moderateScale(16),
    fontWeight: "500",
  },

  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  compHeader: {
    textAlign: "center",
    fontFamily: "BalooBold",
    fontSize: moderateScale(50),
    color: "white",
  },
});
