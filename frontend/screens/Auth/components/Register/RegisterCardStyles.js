import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/colors";

export default StyleSheet.create({
  card: {
    paddingVertical: 50,
    paddingHorizontal: 30,
    marginTop: 40,
    backgroundColor: colors.background,
    borderRadius: 30,
  },
  inputContainer: {
    borderColor: colors.red,
    borderWidth: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: colors.foreground,
    height: 40,
    borderRadius: 15,
    marginBottom: 30,
    width: 300,
    paddingLeft: 12,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 40,
    marginBottom: 20,
  },
  text: {
    color: colors.background,
    fontSize: 20,
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
  },
  question: {
    color: colors.grey,
    marginRight: 5,
  },
  link: {
    color: "blue",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(20),
  },
  compHeader: {
    textAlign: "center",
    fontFamily: "BalooBold",
    fontSize: moderateScale(35),
  },
});
