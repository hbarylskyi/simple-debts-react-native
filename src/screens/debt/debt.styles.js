import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 500
  },

  summaryContainer: {
    flex: 1,
    height: 300
  },

  listContainer: {
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#D7D7D7"
  },

  buttonsContainerContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },

  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonsContainer: {
    flex: 1,
    alignItems: "flex-end",
    padding: 30,
    width: width,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  toTakeValue: {
    color: "#9E0E15"
  },

  toGiveValue: {
    color: "#17840C"
  },

  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  textInput: {
    width: 100,
    margin: 10
  },

  personContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },

  operation: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 10
  }
});
