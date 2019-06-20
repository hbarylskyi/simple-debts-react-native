import React from 'react';
import { View } from 'react-native';
import { MKTextField } from 'react-native-material-kit';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableArea from '../../../../components/TouchableArea/TouchableArea';
import styles from './SearchHeader.styles';
import * as colors from '../../../../utils/colors';

const RegHeader = ({ onBackPress, onTextChange }) => (
  <View style={styles.header}>
    <View style={styles.buttonWrapper}>
      <TouchableArea onPress={onBackPress} borderless style={styles.backButton}>
        <Icon name="ios-arrow-back" color={colors.black} size={30} />
      </TouchableArea>
    </View>

    <Icon
      name="ios-search"
      size={20}
      color={colors.gray}
      style={styles.searchIcon}
    />

    <MKTextField
      placeholder="Email or username"
      underlineEnabled={false}
      tintColor="transparent"
      onTextChange={onTextChange}
      style={styles.container}
      textInputStyle={styles.searchInput}
      autoCapitalize="none"
      autoCorrect={false}
    />
  </View>
);

RegHeader.propTypes = {
  onBackPress: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired
};

export default RegHeader;
