import { colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: colors.foreground,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 100,
    marginLeft: 10,
  },
  detailsContainer: {
    flexDirection: "column",
    width: "80%",
  },
  iconContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  icon: {
    fontSize: 20,
    marginRight: 4,
    marginTop: 2,
  },
  textName: {
    fontSize: 20,
    marginRight: 3,
  },
  textAge: {
    fontSize: 14,
    marginLeft: 13,
    color: colors.grey,
  },
  buttonContainer: {
    marginRight: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  button: {
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: "center",
    height: 30,
    width: 130,
  },
  buttonText: {
    color: colors.foreground,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
