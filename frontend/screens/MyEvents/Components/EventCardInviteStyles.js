import { StyleSheet, ImageStyle } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    gap: 10,
    width: "100%"
  },
  iconTextWrapper: {
    flexDirection: "row",
    gap: 4
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerText: {
    fontSize: 14,
    color: "gray"
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    height: 200,
    display: "flex"
  },
  leftSide: {
    flex: "2",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  upperLeftSide: {
    gap: 6
  },
  title: {
    fontSize: 22,
    fontWeight: "bold"
  },
  hostText: {
    fontSize: 16
  },
  text: {
    fontSize: 16
  },
  lowerLeftSide: {
    gap: 8
  },
  addressText: {
    marginLeft: 3,
    fontSize: 14,
    color: "gray"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 12
  },
  button: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#474AEE",
    height: 32,
    width: 90
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: ""
  },
  invertedButton: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#474AEE",
    height: 32,
    width: 90
  },
  invertedButtonText: {
    color: "#474AEE",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: ""
  },
  rightSide: {
    flex: 1
  },
  ///THIS DOES NOT WORK
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 16
  }
  /////////////////////
});
