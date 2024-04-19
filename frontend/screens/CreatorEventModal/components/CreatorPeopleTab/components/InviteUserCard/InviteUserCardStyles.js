import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from "../../../../../../styles/genericDimensions";
import { colors } from "../../../../../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: verticalScale(90),
    borderRadius: moderateScale(15),
    backgroundColor: colors.foreground,
  },
});
