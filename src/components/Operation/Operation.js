import React from 'react';
import PropTypes from 'prop-types';
import * as colors from '../../colors';
import * as types from './opeartion-types';
import OperationBase from '../OperationBase/OperationBase';

const Operation = ({ operation, debt, userId }) => {
  const { moneyReceiver, description, moneyAmount, status, statusAcceptor } = operation;

  const isGiven = moneyReceiver === debt.user.id;

  const image = isGiven ? debt.user.picture : operation.user.picture;
  const textColor = isGiven ? colors.green : colors.red;

  let icon;
  if (status === types.CREATION_AWAITING) {
    icon = userId === statusAcceptor ? 'bell-o' : 'clock-o';
  }

  return (
    <OperationBase
      image={image}
      topText={moneyAmount}
      topTextStyle={{ color: textColor }}
      bottomText={description}
      icon={icon}
      iconColor={colors.orange}
    />
  );
};

Operation.propTypes = {
  operation: PropTypes.object,
  debt: PropTypes.object,
  userId: PropTypes.string
};

export default Operation;
