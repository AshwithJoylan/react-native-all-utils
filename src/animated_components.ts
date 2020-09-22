import type React from 'react';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
  View,
  ViewStyle,
  Image,
  StyleProp,
  ViewProps,
  ImageStyle,
  ImageProps,
  Text,
} from 'react-native';
import Icon, { IconProps } from './icon';
import SafeAreaView, { ForceInsetProp } from 'react-native-safe-area-view';

export interface SafeAreaViewProps {
  forceInset?: ForceInsetProp;
  style: StyleProp<ViewStyle>;
}

const { createAnimatedComponent } = Animated;

export const AnimatedView = createAnimatedComponent(View) as React.FC<
  Animated.AnimateProps<ViewStyle, ViewProps>
>;

export const AnimatedImage = createAnimatedComponent(Image) as React.FC<
  Animated.AnimateProps<ImageStyle, ImageProps>
>;

export const AnimatedSafeArea = createAnimatedComponent(
  SafeAreaView
) as React.FC<Animated.AnimateProps<ViewStyle, SafeAreaViewProps & ViewProps>>;

export const AnimatedScrollView = createAnimatedComponent(
  ScrollView
) as typeof Animated.ScrollView;

export const AnimatedFlatList = createAnimatedComponent(
  FlatList
) as typeof FlatList;

export const AnimatedText = createAnimatedComponent(
  Text
) as typeof Animated.Text;

export const AnimatedIcon = createAnimatedComponent(Icon) as React.FC<
  Animated.AnimateProps<ViewStyle, IconProps>
>;
