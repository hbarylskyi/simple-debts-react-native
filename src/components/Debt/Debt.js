import React from 'react';
import PropTypes from 'prop-types';
import styles from './Debt.styles';
import * as colors from '../../utils/colors';
import OperationBase from '../OperationBase/OperationBase';
import { currencyToSymbol } from '../../utils/helpers';

const icons = {
  CREATION_AWAITING: { name: 'user', color: colors.green },
  DELETE_AWAITING: { name: 'trash', color: colors.red },
  CHANGE_AWAITING: { name: 'clock-o', color: colors.orange }
};

const Debt = ({ debt, userId, acceptDebt, declineDebt, ...rest }) => {
  const { moneyReceiver, summary } = debt;
  const isTaken = moneyReceiver === userId;
  const color = isTaken ? colors.red : colors.green;
  const icon = icons[debt.status] || {};

  const summarySign = isTaken ? '-' : '';
  const debtSummary =
    summarySign + currencyToSymbol(debt.currency) + summary.toString();

  // const showBtns =
  //   debt.statusAcceptor === userId &&
  //   (debt.status === 'CREATION_AWAITING' || debt.status === 'DELETE_AWAITING');
  // TODO I've disabled swiping on Debt item for now - maybe will add it later
  const showBtns = false;

  const onAccept = () => {
    if (debt.status === 'CREATION_AWAITING') acceptDebt(debt.id);
  };

  const onDecline = () => {
    if (debt.status === 'CREATION_AWAITING') declineDebt(debt.id);
  };

  return (
    <OperationBase
      image={debt.user.picture}
      topText={debt.user.name}
      bottomText={debtSummary}
      bottomTextStyle={[styles.bottomText, { color }]}
      icon={icon.name}
      iconColor={icon.color}
      showBtns={showBtns}
      onAccept={onAccept}
      onDecline={onDecline}
      {...rest}
    />
  );
};

Debt.propTypes = {
  acceptDebt: PropTypes.func.isRequired,
  declineDebt: PropTypes.func.isRequired,
  debt: PropTypes.object,
  userId: PropTypes.string
};

export default Debt;
