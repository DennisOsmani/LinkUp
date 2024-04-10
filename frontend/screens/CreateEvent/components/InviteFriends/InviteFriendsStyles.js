import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/colors";
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from "../../../../styles/genericDimensions";

export const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
  },

  searchContainer: {
    flexDirection: "row",
    width: "90%",
  },

  searchBar: {
    paddingLeft: horizontalScale(10),
    marginTop: verticalScale(20),
    backgroundColor: colors.foreground,
    borderRadius: moderateScale(15),
    height: verticalScale(40),
    width: "90%",
    fontFamily: "BalooRegular",
    fontSize: moderateScale(20),
  },

  icon: {
    fontSize: moderateScale(25),
    color: colors.grey,
    marginTop: verticalScale(26),
    marginLeft: horizontalScale(5),
  },
});
