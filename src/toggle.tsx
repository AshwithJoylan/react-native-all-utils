import React from 'react';
import { View } from 'react-native';
import { Sizes } from './metrics';

/**
 * @interface ToggleProps
 */
interface ToggleProps {
  /**
   * Toggles State
   * @type {boolean}
   * @memberof ToggleProps
   * @default false
   */
  toggled: boolean;
  /**
   * Color
   * @type {string}
   * @memberof ToggleProps
   * @default #257CCC
   */
  color?: string;
  /**
   * BorderColor
   * @type {string}
   * @memberof ToggleProps
   * @default #E5E5EA
   */
  borderColor?: string;
  /**
   * Size
   * @type {number}
   * @memberof ToggleProps
   * @default 35
   */
  size?: number;
  /**
   * Background Color
   * @type {string}
   * @memberof ToggleProps
   * @default #ffffff
   */
  backgroundColor?: string;
}

/**
 * Toggle
 */
export default ({
  toggled = false,
  color = '#257CCC',
  borderColor = '#E5E5EA',
  size = Sizes.SIZE_35,
  backgroundColor = '#ffffff',
}: ToggleProps) => {
  return (
    <View
      style={{
        width: size + Sizes.SIZE_20,
        height: size,
        borderRadius: size,
        borderWidth: Sizes.SIZE_2,
        borderColor: toggled ? color : borderColor,
        backgroundColor: toggled ? color : backgroundColor,
      }}
    >
      <View
        style={{
          width: size - Sizes.SIZE_4,
          backgroundColor: '#ffffff',
          height: size - Sizes.SIZE_4,
          borderRadius: (size - Sizes.SIZE_4) / 2,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      />
    </View>
  );
};
