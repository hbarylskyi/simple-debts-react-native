import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './SearchItem.styles';
import ButtonDeprecated from '../../../../components/Button/ButtonDeprecated';

const SearchItem = ({ user, ...rest }) =>
  (<ButtonDeprecated style={styles.user} {...rest}>
    <Image source={{ uri: user.picture }} style={styles.avatar} />
    <View>
      <Text>{user.name}</Text>
    </View>
  </ButtonDeprecated>);


SearchItem.propTypes = {
  user: PropTypes.object.isRequired
};

SearchItem.defaultProps = {

};

export default SearchItem;
