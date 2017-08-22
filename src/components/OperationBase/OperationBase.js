import React from 'react';
import { View, Text, Image } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import TouchableArea from '../TouchableArea/TouchableArea';
import * as colors from '../../colors';
import styles from './OperationBase.styles';

const OperationBase = ({
  operation,
  onAccept,
  debt,
  userId,
  image,
  onSwipe,
  topText,
  bottomText,
  topTextStyle,
  bottomTextStyle,
  icon,
  iconColor
}) => {
  const renderAcceptanceBtn = accept => {
    const icoName = accept ? 'check' : 'times';
    const color = accept ? colors.green : colors.red;

    return (
      <MKButton
        style={[styles.acceptanceButton, { backgroundColor: color }]}
        onPress={() => onAccept(operation.id, accept)}
      >
        <Icon name={icoName} size={30} color={'white'} />
      </MKButton>
    );
  };

  const getAcceptanceBtns = () => {
    if (operation.statusAcceptor === userId) {
      return [{ component: renderAcceptanceBtn(true) }, { component: renderAcceptanceBtn(false) }];
    }

    return [];
  };

  const renderOperationMiddle = () =>
    (<View style={styles.operationMiddle}>
      <Text style={[styles.top, topTextStyle]}>
        {topText}
      </Text>
      <Text style={[styles.descr, bottomTextStyle]}>
        {bottomText}
      </Text>
    </View>);

  return (
    <Swipeout right={getAcceptanceBtns()} left={[]} scroll={onSwipe} style={styles.swipeout}>
      <View style={styles.operation}>
        <Image source={{ uri: image }} style={styles.avatar} />
        {renderOperationMiddle()}
        <Icon name={icon} size={30} color={iconColor} />
      </View>
    </Swipeout>
  );
};

export default OperationBase;
