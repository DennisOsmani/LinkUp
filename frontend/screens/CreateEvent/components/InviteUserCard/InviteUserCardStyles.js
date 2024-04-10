import { colors } from "../../../../styles/colors";
import { StyleSheet } from "react-native";
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from "../../../../styles/genericDimensions";

export const styles = StyleSheet.create({
  card: {
    width: "95%",
    paddingTop: verticalScale(10),
    paddingHorizontal: horizontalScale(5),
    marginTop: verticalScale(20),
    backgroundColor: colors.foreground,
    borderRadius: moderateScale(20),
    shadowColor: "black",
    shadowOffset: { width: horizontalScale(0), height: verticalScale(2) },
    shadowOpacity: moderateScale(0.5),
    shadowRadius: moderateScale(4),
  },

  imageContainer: {
    width: "90%",
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
    width: "90%",
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

  inviteButton: {
    height: verticalScale(29),
    width: horizontalScale(110),
    borderRadius: moderateScale(10),
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  inviteButtonText: {
    fontFamily: "BalooBold",
    fontSize: moderateScale(20),
    color: "white",
    textAlign: "center",
  },

  inviteButtonWrapper: {
    width: "93%",
    alignItems: "flex-end",
  },

  uninviteButton: {
    height: verticalScale(29),
    width: horizontalScale(110),
    borderRadius: moderateScale(10),
    backgroundColor: colors.foreground,
    borderColor: colors.primary,
    borderWidth: moderateScale(3),
    justifyContent: "center",
    alignItems: "center",
  },

  uninviteButtonText: {
    fontFamily: "BalooBold",
    fontSize: moderateScale(20),
    color: colors.primary,
    textAlign: "center",
  },
});
