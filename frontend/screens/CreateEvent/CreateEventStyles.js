import { StyleSheet } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../styles/genericDimensions";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginTop: verticalScale(50),
    backgroundColor: colors.background,
  },

  imageContainer: {
    width: "100%",
    height: verticalScale(170),
    position: "absolute",
    zIndex: 1,
  },

  stockImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 2,
  },

  uploadContainer: {
    position: "absolute",
    right: horizontalScale(10),
    bottom: verticalScale(10),
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: horizontalScale(100),
    height: verticalScale(35),
    borderRadius: moderateScale(10),
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: horizontalScale(8),
  },

  uploadText: {
    color: "white",
    fontFamily: "BalooBold",
    textAlign: "center",
    fontSize: moderateScale(16),
  },

  inputBox: {
    fontFamily: "BalooRegular",
    fontSize: moderateScale(22),
    backgroundColor: colors.foreground,
    height: verticalScale(40),
    width: "90%",
    borderRadius: moderateScale(10),
    paddingLeft: horizontalScale(15),
  },

  inputBoxMultiline: {
    fontFamily: "BalooRegular",
    fontSize: moderateScale(22),
    backgroundColor: colors.foreground,
    height: verticalScale(150),
    width: "90%",
    borderRadius: moderateScale(10),
    paddingLeft: horizontalScale(15),
  },

  inputContainer: {
    width: "100%",
    height: "100%",
    marginTop: verticalScale(190),
    gap: moderateScale(20),
    alignItems: "center",
  },

  smallButtonContainer: {
    gap: horizontalScale(20),
    flexDirection: "row",
    height: verticalScale(20),
  },

  smallButton: {
    borderWidth: moderateScale(3),
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: horizontalScale(165),
    height: verticalScale(40),
    borderRadius: moderateScale(10),
  },

  buttonText: {
    fontFamily: "BalooBold",
    fontSize: moderateScale(24),
    color: colors.primary,
  },

  bigButtonStyles: {
    backgroundColor: colors.primary,
    marginTop: verticalScale(20),
    borderRadius: moderateScale(10),
    width: horizontalScale(280),
    height: verticalScale(50),
    justifyContent: "center",
    alignItems: "center",
  },

  bigButtonText: {
    fontFamily: "BalooBold",
    fontSize: moderateScale(28),
    color: "white",
  },
});
