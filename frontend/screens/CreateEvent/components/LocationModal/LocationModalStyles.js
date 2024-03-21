import { StyleSheet } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../../styles/genericDimensions";
import { colors } from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    gap: verticalScale(20),
    marginBottom: verticalScale(40),
    width: "80%",
    height: "45%",
    borderRadius: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    shadowOffset: {
      width: horizontalScale(15),
      height: verticalScale(20),
    },
    shadowColor: "black",
    shadowOpacity: 0.3,
    borderColor: colors.thirdary,
    borderWidth: moderateScale(3),
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

  saveButton: {
    borderRadius: moderateScale(15),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: horizontalScale(180),
    height: verticalScale(45),
    marginTop: verticalScale(10),
    borderWidth: moderateScale(3),
    borderColor: colors.primary,
  },

  saveText: {
    fontFamily: "BalooBold",
    fontSize: moderateScale(24),
    textAlign: "center",
    color: colors.primary,
  },

  x: {
    color: "gray",
    fontWeight: "bold",
    marginBottom: "-40",
    fontSize: moderateScale(28),
  },

  xcontainer: {
    alignItems: "cetner",
    width: "84%",
    gap: moderateScale(20),
    flexDirection: "row",
  },
});
