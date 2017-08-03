import React, { PropTypes } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Container, Content, InputGroup, Input, Item } from "native-base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

const ChatScreen = ({ navigation }) =>
  <Container>
    <Text>Privet leha alexei</Text>
    <Content>
      <Item regular>
        <Input placeholder="Eenpooth" />
      </Item>
    </Content>
  </Container>;

ChatScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

ChatScreen.navigationOptions = {
  title: "Chat (name goes here)"
};

export default ChatScreen;
