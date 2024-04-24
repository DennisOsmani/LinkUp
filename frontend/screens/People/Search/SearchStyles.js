import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from "../../../styles/genericDimensions";

export default StyleSheet.create({
  screenInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(200),
  },
  screenInfoText: {
    fontSize: moderateScale(20),
    fontFamily: "BalooSemiBold",
    marginTop: moderateScale(20),
  },

  contentContainer: {
    paddingHorizontal: horizontalScale(15),
  },
  searchContainer: {
    flexDirection: "row",
  },
  searchBar: {
    paddingLeft: horizontalScale(10),
    marginTop: verticalScale(20),
    backgroundColor: colors.foreground,
    borderRadius: moderateScale(15),
    height: verticalScale(35),
    width: horizontalScale(335),
  },
  icon: {
    fontSize: moderateScale(25),
    color: colors.grey,
    marginTop: verticalScale(26),
    marginLeft: horizontalScale(5),
  },
});
