import React from 'react';
import PropTypes from 'prop-types';
import styles from './Debt.styles';
import * as colors from '../../colors';
import OperationBase from '../OperationBase/OperationBase';

const icons = {
  CREATION_AWAITING: { name: 'user', color: colors.green },
  DELETE_AWAITING: { name: 'trash', color: colors.red },
  CHANGE_AWAITING: { name: 'clock-o', color: colors.orange }
};

const Debt = ({
  debt,
  userId,
  acceptDebt,
  declineDebt,
  acceptDebtDeletion,
  declineDebtDeletion,
  goToDebt,
  ...rest
}) => {
  const { moneyReceiver, summary } = debt;
  const isGiven = moneyReceiver === userId;
  const color = isGiven ? colors.green : colors.red;
  const icon = icons[debt.status];

  const showBtns =
    debt.statusAcceptor === userId &&
    (debt.status === 'CREATION_AWAITING' || debt.status === 'DELETE_AWAITING');

  const onAccept = () => {
    if (debt.status === 'CREATION_AWAITING') acceptDebt(debt.id);
    else if (debt.status === 'DELETE_AWAITING') acceptDebtDeletion(debt.id);
  };

  const onDecline = () => {
    if (debt.status === 'CREATION_AWAITING') declineDebt(debt.id);
    else if (debt.status === 'DELETE_AWAITING') declineDebtDeletion(debt.id);
  };

  return (
    <OperationBase
      image={debt.user.picture}
      topText={debt.user.name}
      bottomText={summary}
      bottomTextStyle={[styles.bottomText, { color }]}
      icon={icon.name}
      iconColor={icon.color}
      showBtns={showBtns}
      onAccept={onAccept}
      onDecline={onDecline}
      onPress={() => goToDebt(debt.id)}
      {...rest}
    />
  );
};

Debt.propTypes = {
  acceptDebt: PropTypes.func.isRequired,
  declineDebt: PropTypes.func.isRequired,
  goToDebt: PropTypes.func.isRequired,
  acceptDebtDeletion: PropTypes.func.isRequired,
  declineDebtDeletion: PropTypes.func.isRequired,
  debt: PropTypes.object,
  userId: PropTypes.number
};

export default Debt;
