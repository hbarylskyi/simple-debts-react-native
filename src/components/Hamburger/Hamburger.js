import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as colors from '../../utils/colors';
import Dropdown from '../Dropdown/Dropdown';

const Hamburger = ({ data }) => {
  return (
    <Dropdown onSelect={item => item.onPress()} data={data}>
      <Icon name="bars" size={20} color={colors.white} />
    </Dropdown>
  );
};

Hamburger.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
};

export default Hamburger;
