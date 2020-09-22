/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import {
  ViewStyle,
  StyleSheet,
  StyleProp,
  TouchableWithoutFeedback,
} from 'react-native';
import { useValue } from 'react-native-redash';
import Animated, { timing, Easing } from 'react-native-reanimated';
import { AnimatedView } from './animated_components';

export interface HighlightProps {
  /**
   * Style
   * @type {StyleProp<ViewStyle>}
   * @memberof HighlightProps
   */
  style: StyleProp<ViewStyle>;
  /**
   * Underlay Color
   * @type {string}
   * @memberof HighlightProps
   */
  underlayColor: string;
  /**
   * Callback When Button is Pressed
   * @memberof HighlightProps
   */
  onPress: () => void;
  /**
   * Props to Disable The Button
   * @type {boolean}
   * @memberof HighlightProps
   */
  disabled: boolean;
  /**
   * Test ID
   * @type {string}
   * @memberof HighlightProps
   */
  testID?: string;
  /**
   * Callback Long Pressed
   * @memberof HighlightProps
   */
  onLongPress?: () => void;
  /**
   * Pointer Events
   * @type {*}
   * @memberof HighlightProps
   */
  pointerEvents?: any;
  /**
   * Callback Press IN
   * @memberof HighlightProps
   */
  onPressIn?: () => void;
  /**
   * Callback Press Out
   * @memberof HighlightProps
   */
  onPressOut?: () => void;
}

/**
 * Highlight
 */
const Highlight: FC<HighlightProps> = (props) => {
  const opacity = useValue(0);

  // Animating Opacity
  const onPressIn = () => {
    timing(opacity, {
      toValue: 1,
      duration: 50,
      easing: Easing.linear,
    }).start();
    props.onPressIn && props.onPressIn();
  };

  const onPressOut = () => {
    timing(opacity, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
    }).start();
    props.onPressOut && props.onPressOut();
  };

  return (
    <TouchableWithoutFeedback
      disabled={props.disabled}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        testID={props.testID}
        pointerEvents={props.pointerEvents}
        style={[{ overflow: 'hidden' }, props.style]}
      >
        {props.children}
        <AnimatedView
          pointerEvents="none"
          style={{
            ...styles.overlay,
            opacity,

            backgroundColor: props.underlayColor,
          }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

Highlight.defaultProps = {
  underlayColor: 'rgba(0,0,0,0.2)',
  onPress: () => {},
  disabled: false,
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Highlight;
