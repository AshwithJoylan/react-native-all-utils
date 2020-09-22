// react-hooks/exhaustive-deps
import React, { useMemo, useEffect, useState } from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  Platform,
  Dimensions,
  StatusBar,
  View,
  BackHandler,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Value,
  Clock,
  useCode,
  set,
  cond,
  neq,
  and,
  not,
  clockRunning,
  call,
} from 'react-native-reanimated';
import { timing } from 'react-native-redash';
import { useBInterpolation } from './animation_hooks';

const { height, width: WIDTH } = Dimensions.get('window');
const HEIGHT =
  Platform.select({
    android: height + 56 + (StatusBar.currentHeight ?? 0),
    ios: height,
  }) || 0;

type Insets = 'never' | 'always';

/**
 * @export
 * @interface ModalProps
 */
export interface ModalProps {
  /**
   * @description Visibility of the modal
   * @type {boolean}
   * @memberof ModalProps
   */
  visible: boolean;
  /**
   * @description Weather Modal is animated or not
   * @type {boolean}
   * @memberof ModalProps
   */
  animated?: boolean;
  /**
   * @description Animation type of the modal
   * @requires animated
   * @type {('bounceIn'
   *     | 'bounceOut'
   *     | 'slideInBottom'
   *     | 'slideInLeft'
   *     | 'slideInTop'
   *     | 'default'
   *     | 'slideInRight')}
   * @memberof ModalProps
   * @default default (opacity)
   */
  animationType?:
    | 'bounceIn'
    | 'bounceOut'
    | 'slideInBottom'
    | 'slideInLeft'
    | 'slideInTop'
    | 'default'
    | 'slideInRight';
  /**
   * @description Wether background press enabled
   * @type {boolean}
   * @memberof ModalProps
   * @default false
   */
  backgroundBackEnabled?: boolean;
  /**
   * @description Style of the sub view
   * @type {StyleProp<ViewStyle>}
   * @memberof ModalProps
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description Function to call when backdrop is pressed
   * @memberof ModalProps
   * @requires backgroundBackEnabled to True
   */
  onBack: () => void;
  /**
   * Insets for SafeAreaView
   * @type {{top: Insets; bottom: Insets}}
   * @memberof ModalProps
   * @default {top: 'never', {bottom: 'never'}}
   */
  forceInset?: { top: Insets; bottom: Insets };
  /**
   * @description Animation Duration
   * @type {number}
   * @memberof ModalProps
   * @default 100
   */
  duration?: number;
  /**
   * @description Background Color of the container
   * @type {string}
   * @memberof ModalProps
   * @default rgba(0,0,0,0.2)
   */
  backgroundColor?: string;
  fullScreen?: boolean;
}

const CustomModal: React.FC<ModalProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  // Props
  const {
    visible,
    animated: a = false,
    backgroundBackEnabled = false,
    style = { width: '100%', height: '100%', backgroundColor: 'white' },
    duration = 100,
    animationType = 'default',
    onBack,
    forceInset = { top: 'never', bottom: 'never' },
    children,
    fullScreen = false,
    backgroundColor = 'rgba(0,0,0,0.2)',
  } = props;

  useEffect(() => {
    if (visible) {
      setIsVisible(visible);
    }
  }, [visible]);

  // Animation
  const { value, clock, animated } = useMemo(
    () => ({
      value: new Value(0),
      clock: new Clock(),
      animated: new Value(a ? 1 : 0),
    }),
    [a]
  );
  const opacity = value;
  const scale = useBInterpolation(
    value,
    animationType === 'bounceOut' ? 0.9 : 1.1,
    1
  );
  const translateY = useBInterpolation(
    value,
    animationType === 'slideInTop' ? -HEIGHT : HEIGHT,
    0
  );
  const translateX = useBInterpolation(
    value,
    animationType === 'slideInLeft' ? -WIDTH : WIDTH,
    0
  );

  useCode(
    () => [
      cond(
        neq(animated, 0),
        [
          set(
            value,
            timing({
              from: value,
              to: visible ? 1 : 0,
              duration,
              easing: Easing.linear,
              clock,
            })
          ),
          cond(and(not(clockRunning(clock)), !visible ? 1 : 0), [
            call([], () => {
              setIsVisible(false);
            }),
          ]),
        ],
        set(value, visible ? 1 : 0)
      ),
      call([value], ([val]) => {
        console.log('val:', val);
      }),
    ],
    [visible]
  );

  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        onBack();
      }
      return true;
    });
    if (!visible) {
      listener?.remove();
    }
    return () => {
      listener.remove();
    };
  }, [visible, onBack]);

  return isVisible ? (
    <Animated.View
      {...{ forceInset }}
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        styles.topContainer,
        {
          opacity,
          backgroundColor,
        },
      ]}
    >
      <TouchableWithoutFeedback
        disabled={!backgroundBackEnabled}
        containerStyle={styles.back}
        style={{
          flex: 1,
          backgroundColor: fullScreen ? 'transparent' : 'rgba(0,0,0,0.6)',
        }}
        onPress={onBack}
      />

      <Animated.View
        style={[
          style,
          {
            position: 'absolute',
          },
          (animationType === 'bounceIn' || animationType === 'bounceOut') && {
            transform: [{ scale }],
          },
          (animationType === 'slideInBottom' ||
            animationType === 'slideInTop') && {
            transform: [{ translateY }],
          },
          (animationType === 'slideInLeft' ||
            animationType === 'slideInRight') && {
            transform: [{ translateX }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </Animated.View>
  ) : (
    <View />
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  topContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    width: '100%',
    height: ' 100%',
    backgroundColor: 'transparent',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
});
