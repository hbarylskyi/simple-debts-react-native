import React from 'react';
import { View, Image } from 'react-native';
import { MKTextField } from 'react-native-material-kit';
import PropTypes from 'prop-types';
import backIcon from 'react-navigation/lib/views/assets/back-icon.png';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableArea from '../../../../components/TouchableArea/TouchableArea';
import styles from './SearchHeader.styles';
import * as colors from '../../../../colors';

const RegHeader = ({ onBackPress, onTextChange }) =>
  (<View style={styles.header}>
    <View style={styles.buttonWrapper}>
      <TouchableArea onPress={onBackPress} borderless style={styles.backButton}>
        <Image source={backIcon} style={styles.backIcon} />
      </TouchableArea>
    </View>

    <Icon name={'ios-search'} size={20} color={colors.gray} style={styles.searchIcon} />

    <MKTextField
      placeholder="Email or username"
      underlineEnabled={false}
      tintColor={'transparent'}
      onTextChange={onTextChange}
      style={styles.container}
      textInputStyle={styles.searchInput}
      autoCapitalize={'sentences'}
    />
  </View>);

RegHeader.propTypes = {
  onBackPress: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired
};

export default RegHeader;
