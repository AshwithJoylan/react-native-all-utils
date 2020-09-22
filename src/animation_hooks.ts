import { interpolateColor, onGestureEvent } from 'react-native-redash';
import Animated, {
  Value,
  event,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useRef } from 'react';

const useLazyRef = <T>(initializer: () => T) => {
  const ref = useRef<T>();
  if (ref.current === undefined) {
    ref.current = initializer();
  }
  return ref.current;
};

/**
 * Use Scroll Hook
 * ### EXAMPLE
 *
 * ```
 * const {y, x, onScroll} = useScroll();
 * ```
 */
export const useScroll = () => {
  const y = useLazyRef(() => new Value<number>(0));
  const x = useLazyRef(() => new Value<number>(0));
  const onScroll = event([
    {
      nativeEvent: {
        contentOffset: {
          x,
          y,
        },
      },
    },
  ]);
  return {
    x,
    y,
    onScroll,
  };
};

/**
 * Use Layout Hook
 *
 * ### EXAMPLE
 *
 * ```
 * const {height, width, x, y, onLayout} = useLayout()
 * ```
 */
export const useLayout = () => {
  const y = useLazyRef(() => new Value<number>(0));
  const x = useLazyRef(() => new Value<number>(0));
  const width = useLazyRef(() => new Value<number>(0));
  const height = useLazyRef(() => new Value<number>(0));
  const onLayout = event([
    {
      nativeEvent: {
        layout: {
          x,
          y,
          width,
          height,
        },
      },
    },
  ]);
  return {
    x,
    y,
    width,
    height,
    onLayout,
  };
};

/**
 *
 * @param value interpolation Value
 * @param inputRange number[]
 * @param outputRange number[]
 * @param extrapolate 'both' | 'left' | 'right' | undefined
 *
 * ### EXAMPLE
 *
 * ```
 * const translateY = useInterpolation(y, [0, Sizes.SIZE_360], [0, -Sizes.SIZE_360]);
 * ```
 */
export const useInterpolation = (
  value: Animated.Value<number> | Animated.Node<number>,
  inputRange: number[],
  outputRange: number[],
  extrapolate?: 'both' | 'left' | 'right'
) =>
  interpolate(value, {
    inputRange,
    outputRange,
    extrapolate: extrapolate === 'both' ? Extrapolate.CLAMP : undefined,
    extrapolateLeft: extrapolate === 'left' ? Extrapolate.CLAMP : undefined,
    extrapolateRight: extrapolate === 'left' ? Extrapolate.CLAMP : undefined,
  });

/**
 *
 * @param value interpolation Value
 * @param range1 first range
 * @param range2 second range
 * @param extrapolate both' | 'left' | 'right' | undefined
 *
 *  ### EXAMPLE
 *
 * ```
 * const translateY = useBInterpolation(y, 0, 100, 'left');
 * ```
 */
export const useBInterpolation = (
  value: Animated.Value<number> | Animated.Node<number>,
  range1: Animated.Value<number> | number,
  range2: Animated.Value<number> | number,
  extrapolate?: 'both' | 'left' | 'right'
) =>
  interpolate(value, {
    inputRange: [0, 1],
    outputRange: [range1, range2],
    extrapolate: extrapolate === 'both' ? Extrapolate.CLAMP : undefined,
    extrapolateLeft: extrapolate === 'left' ? Extrapolate.CLAMP : undefined,
    extrapolateRight: extrapolate === 'left' ? Extrapolate.CLAMP : undefined,
  });

/**
 * Binary Interpolate Color
 *
 * @param value interpolation Value
 * @param range1 first color
 * @param range2 second color
 *
 * ### Example
 *
 * ```
 * const color = bInterpolationColor(value, '#fff', '#000');
 * ```
 */
export const bInterpolationColor = (
  value: Animated.Value<number>,
  range1: string,
  range2: string
) =>
  interpolateColor(value, {
    inputRange: [0, 1],
    outputRange: [range1, range2],
  });

export const useTapGesture = ({ state }: { state: Animated.Value<number> }) => {
  return onGestureEvent({
    state,
  });
};
