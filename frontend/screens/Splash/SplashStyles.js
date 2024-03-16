import { StyleSheet } from "react-native";
import { moderateScale } from "../../styles/genericDimensions";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A5DF0",
  },

  text: {
    fontFamily: "BalooBold",
    fontSize: moderateScale(50),
    textAlign: "center",
  },
});
