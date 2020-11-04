/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
  PlatformIOSStatic,
} from 'react-native';
import Text from './text';
import { Typography } from './metrics';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';
import type Animated from 'react-native-reanimated';
import HeaderIcon from './header_icon';
import { NavigationService } from './services';

export const OS = Platform.OS;
export const IS_PAD = OS === 'ios' && (Platform as PlatformIOSStatic).isPad;
const { height } = Dimensions.get('window');
export const TOP =
  OS === 'android'
    ? StatusBar.currentHeight || 0
    : IS_PAD
    ? 20
    : height >= 812
    ? 44
    : 20;
export const CENTERED = OS === 'ios' ? true : false;
export const HEIGHT = (OS === 'android' ? 50 : IS_PAD ? 64 : 40) + TOP;

interface HeaderProps {
  /**
   * @description Header Title
   * @default TITLE Navigation State title
   * @type {string}
   * @memberof HeaderProps
   */
  title?: string;
  /**
   * @description Weather header is centered?
   * @type {boolean}
   * @memberof HeaderProps
   */
  centered?: boolean;
  hideLeft?: boolean;
  /**
   * @default null
   * @description Header left component
   * @type {React.ReactNode}
   * @memberof HeaderProps
   */
  renderLeft?: (data: {
    color: Animated.Node<number> | string;
    underlay: string;
  }) => React.ReactNode;
  /**
   * @default null
   * @description Header right component
   * @type {React.ReactNode}
   * @memberof HeaderProps
   */
  renderRight?: (data: {
    color: Animated.Node<number> | string;
    underlay: string;
  }) => React.ReactElement;
  /**
   * @description Weather header has border
   * @default false
   * @type {boolean}
   * @memberof HeaderProps
   */
  bordered?: boolean;
  /**
   * @default white
   * @description Header background color
   * @type {string}
   * @memberof HeaderProps
   */
  backgroundColor?: string;
  /**
   * @description black
   * @description Title color, Icon color
   * @type {string}
   * @memberof HeaderProps
   */
  color?: string;
  /**
   * @description 'light grey'
   * @description Underlay Color
   * @type {string}
   * @memberof HeaderProps
   */
  underlay?: string;
  /**
   * @description border Color if border
   * @default black
   * @type {string}
   * @memberof HeaderProps
   */
  borderColor?: string;
  /**
   * @description Status bar style
   * @default default
   * @type {('default' | 'light-content' | 'dark-content')}
   * @memberof HeaderProps
   */
  barStyle?: 'default' | 'light-content' | 'dark-content';
  /**
   * ID Used to identify this view in End to End Testing
   * @type {string}
   * @memberof HeaderProps
   */
  testID?: string;
  hideStatusBar?: boolean;
  hideTop?: boolean;
  hideTitle?: boolean;
}

/**
 * Header
 */
export default ({
  backgroundColor = '#fff',
  bordered = false,
  renderLeft,
  testID,
  hideStatusBar = false,
  centered = true,
  renderRight,
  hideTitle,
  hideLeft = false,
  title,
  barStyle: bs = 'dark-content',
  borderColor = '#00000010', //'#DEDEE060',
  color = 'black',
  underlay = 'rgba(0, 0, 0, 0.05)',
  hideTop = false,
}: HeaderProps) => {
  const routeTitle = useRoute()
    .name.replace(/([A-Z])/g, ' $1')
    .trim();

  /**
   * Dak Mode Interpolations
   */
  const bColor = backgroundColor;
  const iconColor = color;
  const opacity = 1;
  const barStyle = bs;

  return (
    <View style={{ zIndex: 5 }}>
      {!hideStatusBar && (
        <StatusBar
          {...{ barStyle }}
          backgroundColor="rgba(0, 0, 0, 0.05)"
          translucent
        />
      )}
      <View
        {...{ testID }}
        style={[
          styles.container,

          hideTop && { paddingTop: 0, height: HEIGHT - TOP },
          {
            backgroundColor: bColor,
          },
        ]}
      >
        <View style={styles.headerButton}>
          {renderLeft
            ? renderLeft({ color: iconColor, underlay: underlay })
            : NavigationService.canGoBack() &&
              !hideLeft && (
                <HeaderIcon
                  name="ios-arrow-back"
                  color={iconColor}
                  {...{ underlay }}
                  onPress={NavigationService.goBack}
                />
              )}
        </View>

        <View style={styles.titleContainer}>
          {!hideTitle && (
            <Text
              weight="bold"
              color={color}
              style={[styles.title, centered && styles.centerTitle]}
            >
              {title || routeTitle}
            </Text>
          )}
        </View>
        {renderRight && (
          <View style={styles.headerButton}>
            {renderRight({ color: iconColor, underlay })}
          </View>
        )}
        {!renderRight && <View style={styles.headerButton} />}
      </View>
      {bordered && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[borderColor, '#ffffff00']}
          style={[styles.border, { opacity }, hideTop && { top: HEIGHT - TOP }]}
        />
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingTop: TOP,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: Typography.FONT_SIZE_16, //Typography.FONT_SIZE_17,
    fontWeight: 'bold', //Typography.FONT_WEIGHT_600,
  },
  centerTitle: {
    alignSelf: 'center',
  },
  headerButton: {
    width: OS === 'android' ? 50 : IS_PAD ? 64 : 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    left: 0,
    top: HEIGHT,
    right: 0,
    position: 'absolute',
    alignSelf: 'stretch',
    height: 3,
  },
});
