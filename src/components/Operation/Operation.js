import React from 'react';
import PropTypes from 'prop-types';
import * as colors from '../../colors';
import OperationBase from '../OperationBase/OperationBase';

const Operation = ({ operation, debt, user, acceptOperation, declineOperation }) => {
  const { moneyReceiver, description, moneyAmount, status, statusAcceptor } = operation;

  const showBtns = statusAcceptor === user.id;
  const isTaken = moneyReceiver === user.id;
  const image = isTaken ? user.picture : debt.user.picture;
  const color = isTaken ? colors.red : colors.green;
  const icon = status === 'CREATION_AWAITING' && user.id === statusAcceptor ? 'bell-o' : 'clock-o';

  const onAccept = () => {
    acceptOperation(operation.id);
  };

  const onDecline = () => {
    declineOperation(operation.id);
  };

  return (
    <OperationBase
      image={image}
      topText={moneyAmount}
      topTextStyle={{ color }}
      bottomText={description}
      icon={icon}
      iconColor={colors.orange}
      showBtns={showBtns}
      onAccept={onAccept}
      onDecline={onDecline}
    />
  );
};

Operation.propTypes = {
  operation: PropTypes.object,
  debt: PropTypes.object,
  user: PropTypes.object,
  acceptOperation: PropTypes.func.isRequired,
  declineOperation: PropTypes.func.isRequired
};

export default Operation;
