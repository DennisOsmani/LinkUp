import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from "../../../styles/genericDimensions";

export default StyleSheet.create({
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
