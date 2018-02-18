import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import isoCurrency from 'iso-country-currency';
import PropTypes from 'prop-types';
import styles from './CurrencyModal.styles';
import Popup from '../../../../components/Popup/Popup';
import Button from '../../../../components/Button/Button';

const { width, height } = Dimensions.get('window');
const FOOTER_HEIGHT = 70;
const ITEMS_PER_ROW = 4;
const ITEM_WRAPPER_SIZE = width / ITEMS_PER_ROW;
const ROWS_PER_SLIDE = (height - FOOTER_HEIGHT) / ITEM_WRAPPER_SIZE;

const sortedCurrenciesWithDupes = isoCurrency.getAllISOCodes().sort((first, second) => {
  if (first.currency < second.currency) return -1;
  if (first.currency > second.currency) return 1;
  return 0;
});

const sortedCurrencies = sortedCurrenciesWithDupes.filter((curr, index, arr) => {
  const nextCurrency = arr[index + 1] || {};
  return curr.currency && curr.currency !== nextCurrency.currency;
});

const rows = sortedCurrencies.reduce(
  (accum, currency) => {
    const currentRow = accum[accum.length - 1];

    if (currentRow.length < ITEMS_PER_ROW) {
      currentRow.push(currency);
    } else {
      accum.push([currency]);
    }

    return accum;
  },
  [[]]
);

const slides = rows.reduce(
  (accum, row) => {
    const currentSlide = accum[accum.length - 1];

    if (currentSlide.length < ROWS_PER_SLIDE) {
      currentSlide.push(row);
    } else {
      accum.push([row]);
    }

    return accum;
  },
  [[]]
);

console.log(slides);

export default class CurrencyModal extends Component {
  static propTypes = {
    onSelected: PropTypes.func.isRequired,
    onBackdropPress: PropTypes.func.isRequired
  };

  state = {};

  renderItem = currency => (
    <View key={currency.id}>
      <Text>asd</Text>
    </View>
  );

  render() {
    const { onBackdropPress } = this.props;

    return (
      <Popup
        containerStyle={styles.popupContainer}
        noMargin
        animationIn={'fadeInUp'}
        animationOut={'fadeOutDown'}
        {...this.props}
      >
        <Swiper loop={false}>
          {slides.map(slide => (
            <View style={{ flex: 1, paddingBottom: FOOTER_HEIGHT }}>
              {slide.map(row => (
                <View style={{ flexDirection: 'row'}}>
                  {row.map(currency => (
                    <View style={[styles.itemWrapper, {height: ITEM_WRAPPER_SIZE, width: ITEM_WRAPPER_SIZE}]}>
                      <Button title={currency.currency} style={styles.item} />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </Swiper>
      </Popup>
    );
  }
}
