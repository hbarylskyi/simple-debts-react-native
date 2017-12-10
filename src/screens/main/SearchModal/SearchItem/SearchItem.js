import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './SearchItem.styles';
import Button from '../../../../components/Button/Button';

const SearchItem = ({ user, ...rest }) =>
  (<Button style={styles.user} {...rest}>
    <Image source={{ uri: user.picture }} style={styles.avatar} />
    <View>
      <Text>{user.name}</Text>
    </View>
  </Button>);


SearchItem.propTypes = {
  user: PropTypes.object.isRequired
};

SearchItem.defaultProps = {

};

export default SearchItem;
