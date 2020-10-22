/* eslint-disable react-native/no-inline-styles */
//import libraries
import React from 'react';
import Icon, { IconType } from './icon';
import Text from './text';
import ReHighlight from './re_highlight';
import { Sizes } from './metrics';
import { View } from 'react-native';
import { IS_PAD } from './header';

export interface HeaderIconProps {
  onPress?: () => void;
  name?: string;
  type?: IconType;
  size?: number;
  color?: any;
  underlay?: string;
  testID?: string;
  badge?: number;
}

/**
 * Header Icon
 */
export default ({
  underlay,
  name = 'ios-arrow-back',
  onPress,
  color = 'black',
  size = Sizes.SIZE_24,
  type = 'Ion',
  testID,
  badge,
}: HeaderIconProps) => {
  return (
    <ReHighlight
      {...{ onPress, testID, underlay }}
      style={{
        borderRadius: IS_PAD ? 32 : 20,
        width: IS_PAD ? 64 : 40,
        alignItems: 'center',
        justifyContent: 'center',
        height: IS_PAD ? 64 : 40,
        paddingRight: name === 'ios-arrow-back' ? Sizes.SIZE_2 : 0,
        alignSelf: 'flex-start',
      }}
    >
      <Icon {...{ name, type, size, color }} />
      {badge && (
        <View
          style={{
            position: 'absolute',
            top: Sizes.SIZE_6,
            right: Sizes.SIZE_6,
            width: Sizes.SIZE_12,
            height: Sizes.SIZE_12,
            borderRadius: Sizes.SIZE_20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
          }}
        >
          <Text weight="bold" color="#fff" style={{ fontSize: Sizes.SIZE_6 }}>
            {badge}
          </Text>
        </View>
      )}
    </ReHighlight>
  );
};
