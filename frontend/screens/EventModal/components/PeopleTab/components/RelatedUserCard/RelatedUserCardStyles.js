import { StyleSheet } from "react-native";
import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from "../../../../../../styles/genericDimensions";
import { colors } from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: verticalScale(100),
    borderRadius: moderateScale(15),
    backgroundColor: colors.foreground,
    flexDirection: "row",
    shadowColor: "black",
    shadowOffset: { width: horizontalScale(0), height: verticalScale(4) },
    shadowOpacity: moderateScale(0.2),
    shadowRadius: moderateScale(4),
  },

  imageContainer: {
    height: "100%",
    width: verticalScale(100),
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: horizontalScale(70),
    height: verticalScale(70),
    borderRadius: moderateScale(100),
  },

  secondColumn: {
    flexDirection: "column",
    width: "70%",
  },

  firstLine: {
    flexDirection: "column",
    height: verticalScale(60),
    paddingTop: verticalScale(10),
  },

  secondLine: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: horizontalScale(15),
  },

  name: {
    fontFamily: "BalooRegular",
    fontSize: moderateScale(20),
  },

  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: horizontalScale(10),
  },

  age: {
    fontFamily: "BalooRegular",
    fontSize: moderateScale(17),
    lineHeight: moderateScale(20),
  },

  relationIcon: {},

  participationIcon: {
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    width: horizontalScale(130),
    height: verticalScale(30),
  },

  participationText: {
    fontFamily: "BalooBold",
    fontSize: moderateScale(18),
    lineHeight: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(8),
    color: "white",
  },
});
