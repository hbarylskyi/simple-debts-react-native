import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import styles from './Dropdown.styles';
import ButtonDeprecated from '../Button/ButtonDeprecated';

export default class Dropdown extends Component {
    static propTypes = {
      data: PropTypes.arrayOf(PropTypes.object),
      onSelect: PropTypes.func.isRequired
    };

    state = {
      dropdownTop: 0,
      visible: false
    };

    componentDidMount() {
      // get the button's bottom y position
      setTimeout(() =>
        this.button.measureInWindow((x, y, width, height) => {
          const dropdownRight = Dimensions.get('window').width - (width / 2) - x;
          this.setState({ dropdownTop: y + (height / 2), dropdownRight });
        })
      );
    }

    toggleDropdown = () => this.setState(prevState => ({ visible: !prevState.visible }));

    renderItem = (item, index) =>
      (<ButtonDeprecated
        onPress={() => {
          this.toggleDropdown();
          this.props.onSelect(item);
        }}
        title={item.text}
        style={styles.item}
        key={index}
        lowercase
      />);

    renderDropdown = () => (
      <Modal
        onBackdropPress={this.toggleDropdown}
        onBackButtonPress={this.toggleDropdown}
        backdropOpacity={0.5}
        useNativeDriver
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={this.state.visible}
      >
        <View style={[styles.bgContainer, { top: this.state.dropdownTop, right: this.state.dropdownRight }]}>
          <ScrollView style={styles.scroll}>
            {this.props.data.map(this.renderItem)}
          </ScrollView>
        </View>
      </Modal>
    );

    render() {
      return (
        <View>
          {this.renderDropdown()}
          <View ref={button => (this.button = button)} collapsable={false} >
            <ButtonDeprecated onPress={this.toggleDropdown} {...this.props} />
          </View>
        </View>
      );
    }
}
