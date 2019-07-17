import React from 'react';
import { View, Text, Image } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import * as colors from '../../utils/colors';
import styles from './OperationBase.styles';
import ButtonDeprecated from '../Button/ButtonDeprecated';

const OperationBase = ({
  image,
  topText,
  bottomText,
  topTextStyle,
  bottomTextStyle,
  icon,
  iconColor,
  onAccept,
  onDecline,
  showBtns,
  ...rest
}) => {
  const renderAcceptanceBtn = (accept, onPress) => {
    const iconName = accept ? 'md-checkmark' : 'md-close';
    const color = accept ? colors.green : colors.red;

    return (
      <MKButton onPress={onPress} style={styles.acceptanceButton}>
        <Icon name={iconName} size={30} color={color} />
      </MKButton>
    );
  };

  const renderMiddle = () => (
    <View style={styles.operationMiddle}>
      <Text style={[styles.top, topTextStyle]}>{topText}</Text>
      <Text style={[styles.descr, bottomTextStyle]}>{`${bottomText}`}</Text>
    </View>
  );

  return (
    <View style={styles.swipeout}>
      <ButtonDeprecated style={styles.operation} {...rest}>
        <Image source={{ uri: image }} style={styles.avatar} />
        {renderMiddle()}
        <View style={styles.actionsRow}>
          <Icon name={icon} size={30} color={iconColor} style={styles.icon} />
          {showBtns && renderAcceptanceBtn(true, onAccept)}
          {showBtns && renderAcceptanceBtn(false, onDecline)}
        </View>
      </ButtonDeprecated>
    </View>
  );
};

OperationBase.propTypes = {
  image: PropTypes.string.isRequired,
  topText: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
  topTextStyle: Text.propTypes.style,
  bottomTextStyle: Text.propTypes.style,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  showBtns: PropTypes.bool.isRequired
};

OperationBase.defaultProps = {
  topTextStyle: null,
  bottomTextStyle: null,
  icon: null,
  iconColor: null
};

export default OperationBase;
