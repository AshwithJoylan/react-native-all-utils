import React from 'react';
import { StyleProp, TextStyle, Platform } from 'react-native';
import { Typography } from './metrics';
import Animated from 'react-native-reanimated';

/**
 * @interface TextProps
 */
export interface TextProps {
  children?: React.ReactNode;
  /**
   * Text Style
   * @type {StyleProp<TextStyle>}
   * @memberof TextProps
   */
  style?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  /**
   * Test ID
   * @type {string}
   * @memberof TextProps
   */
  testID?: string;
  /**
   * Number Of Lines
   * @type {string}
   * @memberof TextProps
   */
  numberOfLines?: number;
  /**
   * Italic
   * @type {boolean}
   * @memberof TextProps
   */
  italic?: boolean;
}

export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | Animated.Node<
      | number
      | 'normal'
      | 'bold'
      | '100'
      | '200'
      | '300'
      | '400'
      | '500'
      | '600'
      | '700'
      | '800'
      | '900'
      | undefined
    >;
/**
 *
 * @param val string
 * @param length number default 50
 * @returns Reduced Text
 *
 * ### Example
 * ```
 * reduceText('123456', 3) -> gives '123...'
 * ```
 */
export const reduceText = (val: string, length?: number) => {
  if (val.length > (length || 50)) {
    return val.substr(0, (length || 50) - 3) + '...';
  }
  return val;
};

/**
 * Inset
 */
interface Inset {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  horizontal?: number | string;
  vertical?: number | string;
}

export interface CustomTextProps extends TextProps {
  weight?: FontWeight;
  color?: string;
  fontSize?: number | Animated.Node<number | undefined>;
  onPress?: () => void;
  margin?: Inset;
  padding?: Inset;
  textAlign?:
    | 'left'
    | 'right'
    | 'center'
    | 'auto'
    | 'justify'
    | Animated.Node<
        number | 'left' | 'right' | 'center' | 'auto' | 'justify' | undefined
      >;
  textAlignVertical?:
    | 'bottom'
    | 'top'
    | 'center'
    | 'auto'
    | Animated.Node<number | 'bottom' | 'top' | 'center' | 'auto' | undefined>;
}

export const getFont = (weight: any, italic: boolean) => {
  if (italic) {
    switch (weight) {
      case '500':
      case '600':
        return {
          fontFamily: 'Roboto-MediumItalic',
        };
      case '100': {
        return {
          fontFamily: 'Roboto-ThinItalic',
        };
      }
      case '200':
      case '300':
        return {
          fontFamily: 'Roboto-LightItalic',
        };
      case '400':
      case 'normal':
        return {
          fontFamily: 'Roboto-RegularItalic',
        };
      case '700':
      case 'bold':
        return {
          fontFamily: 'Roboto-BoldItalic',
        };
      case '400':
      case 'normal':
      default:
        return {
          fontFamily: 'Roboto-RegularItalic',
        };
    }
  } else {
    switch (weight) {
      case '500':
      case '600':
        return {
          fontFamily: 'Roboto-Medium',
        };
      case '100': {
        return {
          fontFamily: 'Roboto-Thin',
        };
      }
      case '200':
      case '300':
        return {
          fontFamily: 'Roboto-Light',
        };

      case '700':
      case 'bold':
        return {
          fontFamily: 'Roboto-Bold',
        };
      case '400':
      case 'normal':
      default:
        return {
          fontFamily: 'Roboto-Regular',
        };
    }
  }
};

export const toLocaleString = (val: number | string) => {
  const number = Number(val);
  return number
    .toFixed(2)
    .replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
    .split('.')[0];
};

/**
 * Text
 */
export default ({
  children,
  style,
  testID,
  numberOfLines,
  color: c,
  onPress,
  fontSize = Typography.FONT_SIZE_14,
  italic = false,
  weight = 'normal',
  margin,
  padding,
  textAlign,
  textAlignVertical,
}: CustomTextProps) => {
  const textColor = c || '#000000';

  /**
   * Dark Mode Interpolations
   */
  const color = textColor;

  return (
    <Animated.Text
      {...{ testID, numberOfLines, onPress }}
      style={[
        style,
        {
          color,
          fontWeight: weight,
          fontSize,

          textAlign,
          textAlignVertical,
        },
        margin && {
          marginHorizontal: margin.horizontal,
          marginVertical: margin.vertical,
          marginLeft: margin.left,
          marginRight: margin.right,
          marginTop: margin.top,
          marginBottom: margin.bottom,
        },
        padding && {
          paddingHorizontal: padding.horizontal,
          paddingVertical: padding.vertical,
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingTop: padding.top,
          paddingBottom: padding.bottom,
        },
        { ...(Platform.OS === 'android' && getFont(weight, italic)) },
      ]}
    >
      {children}
    </Animated.Text>
  );
};
