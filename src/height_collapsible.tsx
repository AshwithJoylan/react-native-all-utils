import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { AnimatedView } from './animated_components';
import Animated, { Easing } from 'react-native-reanimated';
import { useTransition } from 'react-native-redash';
import { useBInterpolation } from './animation_hooks';

/**
 * @interface HeightCollapsibleProps
 */
interface HeightCollapsibleProps {
  /**
   * Style
   * @type {StyleProp<ViewStyle>}
   * @memberof HeightCollapsibleProps
   */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  /**
   * Collapsed
   * @type {boolean}
   * @memberof HeightCollapsibleProps
   */
  collapsed?: boolean;
  /**
   * Height
   * @type {number}
   * @memberof HeightCollapsibleProps
   */
  height: number;
  /**
   * Transition Node
   * @type {Animated.Node<number>}
   * @memberof HeightCollapsibleProps
   */
  transition?: Animated.Node<number>;
}

/**
 * Collapsible
 */
export default ({
  style,
  children,
  collapsed = true,
  height: h,
  transition: t,
}: HeightCollapsibleProps) => {
  const transition =
    t ||
    useTransition(!collapsed, {
      duration: 100,
      easing: Easing.linear,
    });

  const height = useBInterpolation(transition, 0, h);

  return (
    <AnimatedView
      removeClippedSubviews
      style={[style, { height: height, overflow: 'hidden' }]}
    >
      {children}
    </AnimatedView>
  );
};
