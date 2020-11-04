/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  BackHandler,
  NativeEventSubscription,
} from 'react-native';
import Animated, {
  timing,
  Value,
  Easing,
  Clock,
  interpolate,
} from 'react-native-reanimated';
import { AnimatedView } from './animated_components';
import { Sizes, Typography } from './metrics';
import Text from './text';
import {
  FlatList,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import ReHighlight from './re_highlight';

const textRenderer = (text: string) => text;

const renderEmpty = () => <View />;

/**
 * Picker Props
 */
export interface PickerProps {
  /**
   * Bottom Insets
   * @type {number}
   * @memberof PickerProps
   */
  bottom?: number;
}

/**
 * Sow Picker Function Props
 */
export interface PickerDataProps {
  /**
   * Data to Render
   */
  data: any[] | null;
  /**
   * Function that renders text
   *
   * EG:
   * ```
   * renderText={(item) => item.name}
   * ```
   */
  renderText?: (item: any, i: number) => string;
  /**
   * Function to call when item is pressed
   */
  onPressItem?: (item: any, index: number) => void;
  /**
   * Renders Empty Component when data.length === 0
   */
  renderEmpty?: () => JSX.Element;
}

/**
 * State Props
 */
interface PickerState {
  visible: boolean;
  data: any[] | null;
  height: number;
}

export default class Picker extends PureComponent<PickerProps, PickerState> {
  constructor(props: Readonly<PickerProps>) {
    super(props);
    this.state = {
      visible: false,
      data: [],
      height: 0,
    };
    this.renderEmpty = renderEmpty;
    this.renderText = textRenderer;
    this.value = new Value(0);
    this.y = new Value(0);
    this.clock = new Clock();
    this.onEvent = ({
      nativeEvent: { translationY, state },
    }: PanGestureHandlerGestureEvent) => {
      if (state !== State.END) {
        if (translationY >= 0) {
          this.y.setValue(translationY);
        }
      } else {
        if (translationY >= 0) {
          if (translationY <= this.state.height * 0.6) {
            timing(this.y, {
              toValue: 0,
              easing: Easing.linear,
              duration: 300,
            }).start();
          } else {
            timing(this.value, {
              toValue: 0,
              duration: 300,
              easing: Easing.linear,
            }).start(({ finished }) => {
              if (finished) {
                this.y.setValue(0);
                this.clearState();
              }
            });
          }
        } else {
        }
      }
    };

    this.gestureHandler = {
      onGestureEvent: this.onEvent,
      onHandlerStateChange: this.onEvent,
    };
  }

  clock: Animated.Clock;
  y: Animated.Value<number>;
  value: Animated.Value<number>;
  onEvent: any;
  listener: NativeEventSubscription | null = null;
  gestureHandler: any;
  renderEmpty: () => JSX.Element = renderEmpty;
  renderText: (item: any, i: number) => string = textRenderer;
  onPressItem?: (item: any, index: number) => void = undefined;

  openPicker = (props: PickerDataProps) => {
    this.y.setValue(0);
    this.value.setValue(0);
    this.onPressItem = props.onPressItem;
    this.renderEmpty = props.renderEmpty || renderEmpty;
    this.renderText = props.renderText || textRenderer;
    this.setState(
      {
        data: props.data,
        visible: true,
      },
      () => {
        timing(this.value, {
          toValue: 1,
          duration: 100,
          easing: Easing.bezier(0, 1, 0, 1),
        }).start();
      }
    );
  };

  clearState = () => {
    setTimeout(
      () =>
        this.setState({
          data: [],
          visible: false,
        }),
      0
    );
  };

  closePicker = () => {
    timing(this.value, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
    }).start(({ finished }) => {
      if (finished) {
        this.clearState();
      }
    });
  };

  onPress = (item: any, index: number) => {
    timing(this.value, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
    }).start(({ finished }) => {
      if (finished) {
        this.onPressItem?.(item, index);
        this.clearState();
      }
    });
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

  hardwareBackPress = () => {
    if (this.state.visible) {
      this.closePicker();
    }
    return true;
  };

  render() {
    const {
      closePicker,
      value,
      renderText,
      gestureHandler,
      y,
      state: { visible, data },
    } = this;

    const translateY = interpolate(value, {
      inputRange: [0, 1],
      outputRange: [Sizes.HEIGHT, y],
    });
    const opacity = interpolate(value, {
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1],
    });

    return (
      visible && (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={closePicker}>
            <AnimatedView
              style={{ flex: 1, opacity, backgroundColor: 'rgba(0,0,0,0.6)' }}
            />
          </TouchableWithoutFeedback>
          <AnimatedView
            onLayout={({
              nativeEvent: {
                layout: { height },
              },
            }) => {
              this.setState({ height });
            }}
            style={[
              styles.picksContainer,
              {
                transform: [{ translateY }],
                opacity,
                height:
                  data!.length <= 7
                    ? undefined
                    : Sizes.SIZE_20 +
                      (this.props.bottom || 0) +
                      7 * Sizes.SIZE_50,
                paddingBottom: this.props.bottom,
              },
            ]}
          >
            <PanGestureHandler {...gestureHandler}>
              <Animated.View
                style={{
                  alignSelf: 'stretch',
                  backgroundColor: 'white',
                  flex: 1,
                  borderTopLeftRadius: Sizes.SIZE_30,
                  borderTopRightRadius: Sizes.SIZE_30,
                }}
              >
                <AnimatedView style={styles.barContainer}>
                  <View style={styles.bar} />
                </AnimatedView>
                {data!.length <= 7 ? (
                  data?.map((item, index) => (
                    <ReHighlight
                      onPress={() => this.onPress(item, index)}
                      key={Math.random().toString(36).substring(7)}
                      style={styles.item}
                    >
                      <Text weight="500" style={styles.text}>
                        {renderText(item, index)}
                      </Text>
                    </ReHighlight>
                  ))
                ) : (
                  <FlatList
                    removeClippedSubviews
                    keyExtractor={(_, i) =>
                      i.toString() + Math.random().toString(36).substring(7)
                    }
                    data={data}
                    renderItem={({ item, index }) => (
                      <ReHighlight
                        onPress={() => this.onPress(item, index)}
                        style={styles.item}
                      >
                        <Text weight="500" style={styles.text}>
                          {renderText(item, index)}
                        </Text>
                      </ReHighlight>
                    )}
                    contentContainerStyle={{ paddingBottom: this.props.bottom }}
                    showsVerticalScrollIndicator={false}
                  />
                )}
              </Animated.View>
            </PanGestureHandler>
          </AnimatedView>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 40,
    backgroundColor: 'transparent',
  },
  flex: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    // backgroundColor: '#00000070',
  },
  picksContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 41,
    borderTopLeftRadius: Sizes.SIZE_30,
    borderTopRightRadius: Sizes.SIZE_30,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  barContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: Sizes.SIZE_15,
  },
  bar: {
    width: Sizes.SIZE_60,
    height: Sizes.SIZE_5,
    borderRadius: 2.5,
    backgroundColor: '#00000030',
  },
  item: {
    alignSelf: 'stretch',
    height: Sizes.SIZE_50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Typography.FONT_SIZE_14,
  },
  name: {
    fontSize: Typography.FONT_SIZE_20,
  },
  input: {
    flex: 1,
    paddingHorizontal: Sizes.SIZE_20,
  },
  icon: {
    marginLeft: Sizes.SIZE_20,
  },
  value: {
    fontSize: Typography.FONT_SIZE_16,
  },
});
