import { StyleSheet } from "react-native";
import {
    horizontalScale,
    moderateScale,
    verticalScale,
} from "../../../../styles/genericDimensions";
import { colors } from "../../../../styles/colors";

export const styles = StyleSheet.create({
    scrollContainer: {
        width: "100%",
        borderTopEndRadius: moderateScale(25),
        borderTopStartRadius: moderateScale(25),
    },

    keyboardContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    eventTabContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        borderTopEndRadius: moderateScale(25),
        borderTopStartRadius: moderateScale(25),
        backgroundColor: colors.background,
        rowGap: verticalScale(10),
    },
});
