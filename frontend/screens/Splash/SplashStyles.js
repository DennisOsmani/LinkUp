import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "../../styles/genericDimensions";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A5DF0",
    height: "100%",
    width: "100%",
    paddingBottom: verticalScale(70),
  },

  text: {
    fontSize: moderateScale(60),
    textAlign: "center",
    color: "white",
  },
});
