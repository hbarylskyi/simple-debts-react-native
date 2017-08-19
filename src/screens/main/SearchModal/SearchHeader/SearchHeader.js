import React from 'react';
import { View, Image } from 'react-native';
import { MKTextField } from 'react-native-material-kit';
import PropTypes from 'prop-types';
import backIcon from 'react-navigation/lib/views/assets/back-icon.png';
import TouchableArea from '../../../../components/TouchableArea/TouchableArea';
import styles from './SearchHeader.styles';

const RegHeader = ({ onBackPress, onTextChange }) =>
  (<View style={styles.header}>
    <View style={styles.buttonWrapper}>
      <TouchableArea onPress={onBackPress} borderless style={styles.backButton}>
        <Image source={backIcon} style={styles.backIcon} />
      </TouchableArea>
    </View>

    <MKTextField
      style={styles.searchInput}
      placeholder="Email or username"
      underlineEnabled={false}
      onTextChange={onTextChange}
    />
  </View>);

RegHeader.propTypes = {
  onBackPress: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired
};

export default RegHeader;
