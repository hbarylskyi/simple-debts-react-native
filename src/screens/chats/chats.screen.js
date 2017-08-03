import React, { PropTypes } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { loadMockedChats } from "../../modules/actions";

// типо private функция
const loadData = props => {
  props.loadMockedChats();
};

// TODO: render chats as FlatList

class ChatsSlide extends React.Component {
  componentWillMount() {
    loadData(this.props);
  }

  // TODO какая разница?
  componentWillReceiveProps(nextProps) {
    if (nextProps.fullName !== this.props.fullName) {
      loadData(nextProps);
    }
  }

  render = () => {
    let { chats } = this.props;

    return (
      <View>
        <Text>
          {chats[0]}
        </Text>
        <Text>
          Chats text
        </Text>
      </View>
    );
  };
}

ChatsSlide.navigationOptions = {
  title: "Chats"
};

ChatsSlide.propTypes = {
  chats: PropTypes.array.isRequired
};

// TODO что такое ownProps
const mapStateToProps = state => (state, ownProps) => {
  // здесь нужно сделать mapping chats: Array<Id> --> chats: Array<Chat>
  const { chats = [] } = state;

  return {
    chats
  };
};

export default connect(mapStateToProps, {
  loadMockedChats
})(ChatsSlide);
