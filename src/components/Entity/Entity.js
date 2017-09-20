import React from 'react';
import PropTypes from 'prop-types';
import * as colors from '../../colors';
import OperationBase from '../OperationBase/OperationBase';

const Entity = ({ entity, debt, userId }) => {
  const { moneyReceiver, description, moneyAmount, status, statusAcceptor } = entity;

  const isGiven = moneyReceiver === debt.user.id;

  const image = isGiven ? debt.user.picture : entity.user.picture;
  const textColor = isGiven ? colors.green : colors.red;

  return (
    <OperationBase
      image={image}
      topText={moneyAmount}
      topTextStyle={{ color: textColor }}
      bottomText={description}
      iconColor={colors.orange}
    />
  );
};

Entity.propTypes = {
  entity: PropTypes.object,
  debt: PropTypes.object,
  userId: PropTypes.string
};

export default Entity;
