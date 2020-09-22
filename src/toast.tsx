import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Value,
  timing,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { Sizes, Typography } from './metrics';
import Text from './text';

interface ToastState {
  text: string;
  type: 'default' | 'success' | 'danger';
  pointerEvents?:
    | 'box-none'
    | 'none'
    | 'box-only'
    | 'auto'
    | Animated.Node<'box-none' | 'none' | 'box-only' | 'auto' | undefined>;
}

interface ToastShowProps {
  /**
   * Toast Text
   * @type {string}
   * @memberof ToastShowProps
   */
  text: string;
  /**
   * Toast Type
   * @type {('default' | 'success' | 'danger')}
   * @memberof ToastShowProps
   */
  type?: 'default' | 'success' | 'danger';
  /**
   * Toast Duration
   * @type {number}
   * @memberof ToastShowProps
   */
  duration?: number;
  /**
   * Function Which gets called when Toast is Hidden
   * @memberof ToastShowProps
   */
  onDone?: () => void;
}

class Toast extends Component<{}, ToastState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      text: '',
      type: 'default',
      pointerEvents: 'none',
    };
  }

  val: Animated.Value<number> = new Value(0);

  /**
   * show
   * @memberof Toast
   *
   * ### Example
   *  ```
   *    Toast.show({
   *      text: 'Toast Showing',
   *    })
   *  ```
   */
  show = ({
    text,
    type = 'default',
    duration = 1000,
    onDone,
  }: ToastShowProps) => {
    this.setState({
      text,
      type,
      pointerEvents: 'auto',
    });
    timing(this.val, {
      toValue: 1,
      duration: 200,
      easing: Easing.inOut(Easing.linear),
    }).start();
    setTimeout(() => {
      this.setState({ pointerEvents: 'none' });
      timing(this.val, {
        toValue: 0,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }).start(({ finished }) => {
        if (finished) {
          onDone && onDone();
        }
      });
    }, duration + 200);
  };

  render() {
    const { val, state } = this;
    const { text, type, pointerEvents } = state;
    const scale = interpolate(val, {
      inputRange: [0, 1],
      outputRange: [1.1, 1],
    });

    return (
      <Animated.View
        {...{ pointerEvents }}
        style={[styles.container, { opacity: val }]}
      >
        <Text
          fontSize={Typography.FONT_SIZE_16}
          style={[
            styles.text,
            {
              opacity: val,
              backgroundColor:
                type === 'default'
                  ? '#ffffff'
                  : type === 'success'
                  ? '#3CC864'
                  : '#FF702D',
              color: type === 'default' ? '#000000' : '#ffffff',
              transform: [{ scale }],
            },
          ]}
        >
          {text}
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000020',
  },
  text: {
    paddingHorizontal: Sizes.SIZE_20,
    paddingVertical: Sizes.SIZE_10,
    borderRadius: Sizes.SIZE_5,
    maxWidth: '70%',
    textAlign: 'center',
    overflow: 'hidden',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Toast;
