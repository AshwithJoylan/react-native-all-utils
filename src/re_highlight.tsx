import React, { ReactNode, useRef } from 'react';
import { ViewStyle, StyleSheet, StyleProp } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Easing, timing } from 'react-native-reanimated';

export interface Props {
  /**
   * Style for Container
   * @type {StyleProp<Animated.AnimateStyle<ViewStyle>>}
   * @memberof Props
   */
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  /**
   * Underlay Color
   * @type {string}
   * @memberof Props
   * @default "rgba(28, 134, 121, 0.2)""
   */
  underlayColor?: string;
  /**
   * Function To Call When Button is Pressed
   * @memberof Props
   */
  onPress?: () => void;
  /**
   * Children
   * @type {ReactNode}
   * @memberof Props
   */
  children?: ReactNode;
  /**
   * Defines Weather Button is Disabled
   * @type {boolean}
   * @memberof Props
   * @default false
   */
  disabled?: boolean;
  /**
   * Animated Value Which Changes When Button Event Changes
   * Use This to Define Animations
   * Values 0 to 1
   * @type {Animated.Value<number>}
   * @memberof Props
   */
  val?: Animated.Value<number>;
  /**
   * Function to Call When Button is Pressed In
   * @memberof Props
   */
  onPressIn?: () => void;
  /**
   * Function to Call When Button is Pressed Out
   * @memberof Props
   */
  onPressOut?: () => void;
  /**
   * Test ID
   * @type {string}
   * @memberof Props
   */
  testID?: string;
}

/**
 * Re Highlight
 */
export default ({
  onPress = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
  style,
  val,
  children,
  underlayColor = 'rgba(0,0,0,0.2)',
  testID,
  disabled = false,
}: Props) => {
  const opacity = val || useRef(new Animated.Value(0)).current;

  return (
    <TapGestureHandler
      shouldCancelWhenOutside
      enabled={!disabled}
      onHandlerStateChange={({ nativeEvent: { state } }) => {
        if (state === State.BEGAN) {
          timing(opacity, {
            toValue: 1,
            duration: 50,
            easing: Easing.linear,
          }).start();
          onPressIn();
        } else if (state === State.END) {
          timing(opacity, {
            toValue: 0,
            duration: 100,
            easing: Easing.linear,
          }).start();
          onPress();
        } else if (state === State.CANCELLED || state === State.FAILED) {
          timing(opacity, {
            toValue: 0,
            duration: 100,
            easing: Easing.linear,
          }).start();
          onPressOut();
        }
      }}
    >
      <Animated.View
        pointerEvents={!disabled ? undefined : 'none'}
        {...{ testID }}
        style={[style, { overflow: 'hidden' }]}
      >
        {children}
        <Animated.View
          pointerEvents="none"
          style={{
            ...styles.overlay,
            opacity,
            backgroundColor: underlayColor,
          }}
        />
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
