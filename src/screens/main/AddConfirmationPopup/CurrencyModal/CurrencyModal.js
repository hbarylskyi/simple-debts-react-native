import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import currencies from 'currency-symbol-map/map';
import PropTypes from 'prop-types';
import styles from './CurrencyModal.styles';
import Popup from '../../../../components/Popup/Popup';
import ButtonDeprecated from '../../../../components/Button/ButtonDeprecated';
import * as colors from '../../../../utils/colors';
import Button from '../../../../components/Button/Button';

const { width, height } = Dimensions.get('window');
const FOOTER_HEIGHT = 150;
const ITEMS_PER_ROW = 4;
const ITEM_WRAPPER_SIZE = width / ITEMS_PER_ROW;
const ROWS_PER_SLIDE = (height - FOOTER_HEIGHT) / ITEM_WRAPPER_SIZE;

const rows = Object.keys(currencies).reduce(
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

export default class CurrencyModal extends Component {
  static propTypes = {
    onSelected: PropTypes.func.isRequired,
    onBackdropPress: PropTypes.func.isRequired
  };

  state = {};

  render() {
    const { onBackdropPress, onSelected } = this.props;

    return (
      <Popup
        containerStyle={styles.popupContainer}
        noMargin
        animationIn={'fadeInUp'}
        animationOut={'fadeOutDown'}
        {...this.props}
      >
        <Swiper
          loop={false}
          paginationStyle={styles.pagination}
          activeDotColor={colors.white}
        >
          {slides.map(slide => (
            <ButtonDeprecated style={styles.slide}>
              {slide.map(row => (
                <View style={{ flexDirection: 'row' }}>
                  {row.map(currency => (
                    <View
                      style={[
                        styles.itemWrapper,
                        { height: ITEM_WRAPPER_SIZE, width: ITEM_WRAPPER_SIZE }
                      ]}
                    >
                      <Button
                        onPress={() => onSelected(currency)}
                        text={currency}
                        textStyle={styles.itemText}
                        style={styles.item}
                      />
                    </View>
                  ))}
                </View>
              ))}
            </ButtonDeprecated>
          ))}
        </Swiper>

        <ButtonDeprecated
          title={'Cancel'}
          onPress={onBackdropPress}
          style={styles.cancelBtn}
          textStyle={styles.cancelBtnText}
        />
      </Popup>
    );
  }
}
