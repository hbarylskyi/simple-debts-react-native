import React from 'react';
import { View, Text, Image } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import * as colors from '../../colors';
import styles from './OperationBase.styles';
import TouchableArea from '../TouchableArea/TouchableArea';

const OperationBase = ({
  image,
  topText,
  bottomText,
  topTextStyle,
  bottomTextStyle,
  icon,
  iconColor,
  onSwipe,
  onAccept,
  onDecline,
  showBtns,
  ...rest
}) => {
  const renderAcceptanceBtn = (accept, onPress) => {
    const icoName = accept ? 'check' : 'times';
    const color = accept ? colors.green : colors.red;

    return (
      <MKButton onPress={onPress} style={[styles.acceptanceButton, { backgroundColor: color }]}>
        <Icon name={icoName} size={30} color={'white'} />
      </MKButton>
    );
  };

  const getAcceptanceBtns = () => [
    { component: renderAcceptanceBtn(true, onAccept) },
    { component: renderAcceptanceBtn(false, onDecline) }
  ];

  const renderMiddle = () =>
    (<View style={styles.operationMiddle}>
      <Text style={[styles.top, topTextStyle]}>
        {topText}
      </Text>
      <Text style={[styles.descr, bottomTextStyle]}>
        {`${bottomText}`}
      </Text>
    </View>);

  return (
    <Swipeout
      right={showBtns ? getAcceptanceBtns() : null}
      scroll={onSwipe}
      style={styles.swipeout}
    >
      <TouchableArea style={styles.operation} {...rest}>
        <Image source={{ uri: image }} style={styles.avatar} />
        {renderMiddle()}
        <Icon name={icon} size={30} color={iconColor} />
      </TouchableArea>
    </Swipeout>
  );
};

OperationBase.propTypes = {
  onSwipe: PropTypes.func.isRequired,
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
