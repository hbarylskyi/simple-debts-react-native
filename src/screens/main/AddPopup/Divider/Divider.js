import React from 'react';
import { View, Text } from 'react-native';
import styles from './Divider.styles';

const Line = () =>
  (<View style={styles.line}>
    <View style={styles.lineTop} />
    <View style={styles.lineBottom} />
  </View>);

const Divider = () =>
  (<View style={styles.container}>
    <Line />
    <Text style={styles.text}>OR</Text>
    <Line />
  </View>);

export default Divider;
