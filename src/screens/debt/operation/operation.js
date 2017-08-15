import React from 'react';
import { View, Text, Image } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import TouchableArea from '../../../components/TouchableArea/TouchableArea';
import * as colors from '../../../colors';
import styles from './operation.styles';
import * as types from './operation-types';

const Operation = ({ operation, onAccept, debt, userId, userPic, onSwipe }) => {
  const { status, statusAcceptor, moneyReceiver } = operation;
  const isGiven = moneyReceiver === debt.user.id;

  const picture = isGiven ? debt.user.picture : userPic;
  const textColor = isGiven ? colors.green : colors.red;

  const renderOperationIcon = () => <Image source={{ uri: picture }} style={styles.avatar} />;

  const renderOperationMiddle = () =>
    (<View style={styles.operationMiddle}>
      <Text style={[styles.money, { color: textColor }]}>
        {operation.moneyAmount}
      </Text>
      <Text style={styles.descr}>
        {operation.description}
      </Text>
    </View>);

  const renderStatusIcon = () => {
    let name;

    if (status === types.CREATION_AWAITING) {
      name = userId === statusAcceptor ? 'bell-o' : 'clock-o';
    }

    return <Icon name={name} size={30} color={colors.orange} />;
  };

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

  return (
    <Swipeout right={getAcceptanceBtns()} left={[]} scroll={onSwipe} style={styles.swipeout}>
      <View style={styles.operation}>
        {renderOperationIcon()}
        {renderOperationMiddle()}
        {renderStatusIcon()}
      </View>
    </Swipeout>
  );
};

export default Operation;
