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
        shadowOpacity: moderateScale(0.05),
        shadowRadius: moderateScale(4),
    },

    blockedCard: {
        paddingVertical: verticalScale(15),
        paddingHorizontal: horizontalScale(10),
        marginTop: verticalScale(20),
        backgroundColor: colors.foreground,
        borderRadius: moderateScale(20),
        shadowColor: "black",
        shadowOffset: { width: horizontalScale(0), height: verticalScale(4) },
        shadowOpacity: moderateScale(0.05),
        shadowRadius: moderateScale(4),
    },

    blockedOpacity: {
        opacity: moderateScale(0.8),
    },
    blockedContainer: {
        flexDirection: "column",
        width: "80%",
    },

    textBlocked: {
        color: colors.red,
        borderRadius: moderateScale(10),
        borderWidth: moderateScale(2),
        width: "25%",
        paddingLeft: horizontalScale(6),
        borderColor: colors.red,
        fontFamily: "BalooRegular",
        justifyContent: "flex-end",
        marginLeft: horizontalScale(193),
        marginTop: verticalScale(-30),
        marginBottom: verticalScale(-5),
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
        marginBottom: verticalScale(-12),
    },

    buttonContainer: {
        marginRight: horizontalScale(10),
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexDirection: "row",
    },

    buttonAdd: {
        borderRadius: moderateScale(10),
        backgroundColor: colors.primary,
        justifyContent: "center",
        height: verticalScale(30),
        width: horizontalScale(130),
    },
    buttonTextAdd: {
        color: colors.foreground,
        textAlign: "center",
        fontSize: moderateScale(18),
        fontFamily: "BalooBold",
    },

    buttonPending: {
        borderRadius: moderateScale(10),
        borderColor: colors.primary,
        borderWidth: moderateScale(2),
        backgroundColor: colors.foreground,
        justifyContent: "center",
        height: verticalScale(30),
        width: horizontalScale(130),
    },
    buttonTextPending: {
        color: colors.primary,
        textAlign: "center",
        fontSize: moderateScale(18),
        fontFamily: "BalooBold",
    },

    buttonAccept: {
        borderRadius: moderateScale(10),
        backgroundColor: colors.primary,
        justifyContent: "center",
        height: verticalScale(30),
        width: horizontalScale(80),
        marginRight: horizontalScale(5),
    },
    buttonTextAccept: {
        color: colors.foreground,
        textAlign: "center",
        fontSize: moderateScale(18),
        fontFamily: "BalooBold",
    },

    buttonReject: {
        borderRadius: moderateScale(10),
        borderColor: colors.primary,
        borderWidth: moderateScale(2),
        backgroundColor: colors.foreground,
        justifyContent: "center",
        height: verticalScale(30),
        width: horizontalScale(80),
    },
    buttonTextReject: {
        color: colors.primary,
        textAlign: "center",
        fontSize: moderateScale(18),
        fontFamily: "BalooBold",
    },
});
