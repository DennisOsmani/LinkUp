import { StyleSheet } from "react-native";
import {
    horizontalScale,
    moderateScale,
    verticalScale,
} from "../../../../styles/genericDimensions";
import { colors } from "../../../../styles/colors";
import { version } from "react";

export const styles = StyleSheet.create({
    loader: {
        height: "80%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    tabContainer: {
        width: "100%",
        alignItems: "center",
        borderTopEndRadius: moderateScale(25),
        borderTopStartRadius: moderateScale(25),
        backgroundColor: colors.background,
    },

    topWrapper: {
        width: "90%",
        height: verticalScale(20),
        justifyContent: "center",
        alignItems: "center",
        marginTop: moderateScale(30),
        flexDirection: "column",
    },

    searchBar: {
        columnGap: horizontalScale(10),
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: moderateScale(45),
        borderRadius: moderateScale(15),
        backgroundColor: colors.foreground,
        color: colors.grey,
    },

    feather: {
        marginLeft: moderateScale(15),
    },

    searchInput: {
        fontFamily: "BalooRegular",
        fontSize: moderateScale(20),
        color: colors.grey,
        height: "100%",
        width: "85%",
    },

    inviteMoreButton: {
        marginTop: verticalScale(30),
        borderRadius: moderateScale(15),
        height: verticalScale(55),
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
    },

    inviteMoreText: {
        fontFamily: "BalooBold",
        fontSize: moderateScale(28),
        color: "white",
    },

    scrollContainer: {
        width: "100%",
    },

    scrollTabContainer: {
        width: "100%",
        alignItems: "center",
        rowGap: verticalScale(15),
        paddingTop: verticalScale(15),
        paddingBottom: verticalScale(170),
    },
});
