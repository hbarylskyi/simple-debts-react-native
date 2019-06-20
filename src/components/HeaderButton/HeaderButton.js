import React from 'react';
import { StyleSheet } from 'react-native';
import { ViewPropTypes } from 'react-native-material-kit/lib/utils';
import Button from '../Button/Button';

const HeaderButton = ({ style, ...rest }) => (
  <Button style={[styles.button, style]} {...rest} />
);

HeaderButton.propTypes = {
  style: ViewPropTypes
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 22
  }
});

export default HeaderButton;
