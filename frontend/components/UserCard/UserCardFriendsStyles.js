import { colors } from "../../styles/colors";
import { StyleSheet } from "react-native";
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from "../../styles/genericDimensions";

export default StyleSheet.create({
  card: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    marginTop: verticalScale(20),
    backgroundColor: colors.foreground,
    borderRadius: moderateScale(20),
    shadowColor: "black",
    shadowOffset: { width: horizontalScale(0), height: verticalScale(4) },
    shadowOpacity: moderateScale(0.5),
    shadowRadius: moderateScale(4),
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: horizontalScale(65),
    height: verticalScale(65),
    borderRadius: moderateScale(100),
    marginLeft: horizontalScale(10),
  },
  detailsContainer: {
    flexDirection: "column",
    width: "80%",
    marginBottom: verticalScale(16),
  },
  iconContainer: {
    flexDirection: "row",
    marginLeft: horizontalScale(10),
  },
  icon: {
    fontSize: moderateScale(19),
    marginRight: horizontalScale(4),
    marginTop: verticalScale(5),
  },
  textName: {
    fontSize: moderateScale(20),
    marginRight: horizontalScale(3),
    fontFamily: "BalooRegular",
    marginBottom: verticalScale(-15),
  },
  textAge: {
    fontSize: moderateScale(16),
    marginLeft: horizontalScale(13),
    color: colors.grey,
    fontFamily: "BalooRegular",
  },
});
