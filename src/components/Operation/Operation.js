import React from 'react';
import PropTypes from 'prop-types';
import * as colors from '../../utils/colors';
import OperationBase from '../OperationBase/OperationBase';
import { currencyToSymbol } from '../../utils/helpers';

const Operation = ({ operation, debt, user, processOperation, ...rest }) => {
  const {
    moneyReceiver,
    description,
    moneyAmount,
    status,
    statusAcceptor
  } = operation;

  const isTaken = moneyReceiver === user.id;
  const image = isTaken ? user.picture : debt.user.picture;
  const color = isTaken ? colors.red : colors.green;
  const showBtns = statusAcceptor === user.id && status === 'CREATION_AWAITING';
  let icon;

  if (status === 'CREATION_AWAITING') {
    icon = statusAcceptor === user.id ? 'md-notifications-outline' : 'md-time';
  } else if (status === 'CANCELLED') {
    icon = 'md-close-circle-outline';
  }

  const _processOperation = async (oid, accepted) => {
    const { error, payload } = await processOperation(operation.id, accepted);

    if (error) {
      const { response = {} } = payload;
      alert(response.error || payload.message);
    }
  };

  return (
    <OperationBase
      image={image}
      topText={currencyToSymbol(debt.currency) + moneyAmount}
      topTextStyle={{ color }}
      bottomText={description}
      icon={icon}
      iconColor={colors.orange}
      showBtns={showBtns}
      onAccept={() => _processOperation(true)}
      onDecline={() => _processOperation(false)}
      {...rest}
    />
  );
};

Operation.propTypes = {
  operation: PropTypes.object,
  debt: PropTypes.object,
  user: PropTypes.object,
  processOperation: PropTypes.func.isRequired
};

export default Operation;
