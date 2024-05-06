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
    marginBottom: verticalScale(80),
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

  saveButton: {
    position: "absolute",
    bottom: verticalScale(7),
    borderRadius: moderateScale(15),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: horizontalScale(180),
    height: verticalScale(45),
    borderWidth: moderateScale(3),
    borderColor: colors.primary,
    marginBottom: horizontalScale(10),
    shadowOffset: {
      width: horizontalScale(5),
      height: verticalScale(10),
    },
    shadowColor: "black",
    shadowOpacity: 0.3,
  },

  saveText: {
    fontFamily: "BalooBold",
    fontSize: moderateScale(24),
    textAlign: "center",
    color: colors.primary,
  },

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
});
