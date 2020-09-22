import React from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  NativeEventSubscription,
  Platform,
  TouchableWithoutFeedback,
  PlatformIOSStatic,
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  timing,
  Extrapolate,
} from 'react-native-reanimated';
import Text from './text';
import ReHighlight from './re_highlight';
import { Typography } from './metrics';
const IS_PAD = (Platform as PlatformIOSStatic).isPad;

/***
 ** Props **
  type: 'alert' | 'indicator';
  title: Title
  description: Description or Sub title
  confirmText: Confirm button text default @OK
  cancelText: Cancel button Text default @Cancel
  cancelable: Weather alert is cancelable or not default @true
  visible: Visibility of alert
  onBack: Back function
  onConfirm: Confirm function
  backgroundBackEnabled: Weather alert can be closed on backdrop press default @true
***/

export interface AlertProps {
  /**
   * Alert Title
   * @type {string}
   * @memberof AlertProps
   */
  title?: string;
  /**
   * Alert Description
   * @type {string}
   * @memberof AlertProps
   */
  description?: string;
  /**
   * Confirm Button Text
   * @type {string}
   * @memberof AlertProps
   * @default OK
   */
  confirmText?: string;
  /**
   * Cancel Button Text
   * @type {string}
   * @memberof AlertProps
   * @default Cancel
   */
  cancelText?: string;
  /**
   * Defines Weather Alert is Cancelable
   * @type {boolean}
   * @memberof AlertProps
   * @default true
   * ```
   *
   * if True then Both Confirm and Cancel Buttons are render
   * else only Confirm Button is Rendered
   *
   * ```
   */
  cancelable?: boolean;
  /**
   * Function to Perform When Confirm Button is Pressed
   * @memberof AlertProps
   * @default () => {}
   */
  onConfirm?: () => void;
  /**
   * Function to Perform When Cancel Button is Pressed
   * @memberof AlertProps
   * @default () => {}
   */
  onCancel?: () => void;
}

/**
 * AlertComponentProps
 */
export interface AlertComponentProps {
  /**
   * Alert Background Color
   * @type {string}
   * @memberof AlertComponentProps
   * @default white
   */
  backgroundColor?: string;
  /**
   * Alert Text Color
   * @type {string}
   * @memberof AlertComponentProps
   * @default black
   */
  textColor?: string;
}
let onConfirm = () => {},
  onCancel = () => {};

/**
 * @class Alert
 * @extends {React.Component}
 */
export default class Alert extends React.Component<AlertComponentProps> {
  val: Animated.Value<number> = new Animated.Value(0);
  constructor(props: Readonly<AlertComponentProps>) {
    super(props);
  }

  listener: NativeEventSubscription | null = null;

  state = {
    type: 'alert',
    visible: false,
    cancelable: true,
    confirmText: 'OK',
    description: null,
    cancelText: 'Cancel',
    title: 'Alert',
    backgroundBackEnabled: true,
  };

  /**
   *
   * @memberof Alert
   * ### Example
   * ```
   * Alert?.show({
   *  title: 'Title',
   *  description: 'Description',
   * });
   * ```
   */
  show = (props: AlertProps) => {
    if (props.onConfirm) {
      onConfirm = props.onConfirm;
    } else {
      onConfirm = () => {};
    }

    if (props.onCancel) {
      onCancel = props.onCancel;
    } else {
      onCancel = () => {};
    }

    this.setState(
      {
        ...props,
        visible: true,
      },
      () => {
        this.val?.setValue(0);
        timing(this.val, {
          toValue: 1,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          duration: 200,
        }).start();
      }
    );
  };

  hardwareBackPress = () => {
    if (this.state.visible) {
      this.animateBack();
    }
    return true;
  };

  componentDidUpdate() {
    this.listener = BackHandler.addEventListener(
      'hardwareBackPress',
      this.hardwareBackPress
    );
    if (!this.state.visible) {
      this.listener?.remove();
    }
    return () => {
      this.listener?.remove();
    };
  }

  clearState = () => {
    setTimeout(
      () =>
        this.setState({
          type: 'alert',
          cancelable: true,
          confirmText: 'OK',
          description: null,
          visible: false,
          cancelText: 'Cancel',
          title: 'Alert',
          backgroundBackEnabled: true,
        }),
      0
    );
  };

  animateBack = () => {
    timing(this.val, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
    }).start(({ finished }) => {
      if (finished) {
        this.clearState();
      }
    });
  };

  render() {
    const {
      type,
      visible,
      cancelable,
      confirmText,
      description,
      cancelText,
      title,
    } = this.state;

    const { val, props } = this;

    const scale = interpolate(val, {
      inputRange: [0, 1],
      outputRange: [0.9, 1],
      extrapolate: Extrapolate.CLAMP,
    });

    const backgroundColor = props.backgroundColor || '#ffffff';
    const color = props.textColor || '#000000';

    return (
      visible && (
        <View
          pointerEvents={visible ? 'auto' : 'none'}
          style={[styles.topContainer]}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={{
                width: '100%',
                height: '100%',
                opacity: val,
                backgroundColor: 'rgba(0,0,0,0.6)',
              }}
            />
          </TouchableWithoutFeedback>
          <Animated.View
            testID="alert"
            style={[
              {
                position: 'absolute',
                opacity: val,
                backgroundColor,
                transform: [
                  {
                    scale,
                  },
                ],
              },
              styles.container,
            ]}
          >
            <View style={type === 'alert' ? { flex: 1 } : {}}>
              {type === 'alert' ? (
                <View style={{ width: '100%' }}>
                  <View
                    style={[
                      styles.titleContainer,
                      { paddingBottom: !description ? 15 : 5 },
                    ]}
                  >
                    <Text
                      fontSize={Typography.FONT_SIZE_16}
                      weight="bold"
                      color={color}
                      testID="alert.title"
                      style={styles.title}
                    >
                      {title}
                    </Text>
                  </View>
                  {description && (
                    <View style={styles.subTitleContainer}>
                      <Text
                        fontSize={Typography.FONT_SIZE_14}
                        weight="600"
                        color={`${color}70`}
                        testID="alert.description"
                        style={styles.description}
                      >
                        {description}
                      </Text>
                    </View>
                  )}
                  <View style={[styles.footerContainer]}>
                    {cancelable && (
                      <ReHighlight
                        testID="alert.cancelButton"
                        onPress={() => {
                          onCancel();
                          this.animateBack();
                        }}
                        style={[styles.cancel]}
                      >
                        <Text
                          fontSize={Typography.FONT_SIZE_16}
                          weight="bold"
                          color={color}
                          style={styles.text}
                        >
                          {cancelText}
                        </Text>
                      </ReHighlight>
                    )}
                    {/* <View
                    style={{
                      height: '100%',
                      width: IS_PAD ? 0.8 : 0.4,
                      backgroundColor: color,
                    }}
                  /> */}
                    <ReHighlight
                      testID="alert.confirmButton"
                      onPress={() => {
                        onConfirm();
                        this.animateBack();
                      }}
                      style={[styles.confirm]}
                    >
                      <Text
                        fontSize={Typography.FONT_SIZE_16}
                        weight="bold"
                        color={color}
                        style={styles.text}
                      >
                        {confirmText}
                      </Text>
                    </ReHighlight>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
          </Animated.View>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 60,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    // backgroundColor: '#00000020'
  },
  container: {
    width: IS_PAD ? 470 : 270,
    borderRadius: 15,
    overflow: 'hidden',
  },
  text: {
    fontSize: IS_PAD ? 20 : 14,
    fontWeight: '600',
  },
  titleContainer: {
    paddingTop: IS_PAD ? 20 : 15,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomWidth: borderWidth,
    // borderBottomColor: borderColor,
  },
  subTitleContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footerContainer: {
    width: '100%',
    height: IS_PAD ? 65 : 45,
    flexDirection: 'row',
  },
  back: {
    width: '100%',
    height: ' 100%',
  },
  cancel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirm: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: {
    color: 'black',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
});
