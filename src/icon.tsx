import React, { Component } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';

export type IconType =
  | 'Ion'
  | 'Material'
  | 'MaterialCommunity'
  | 'SimpleLine'
  | 'AntDesign'
  | 'Evil'
  | 'Entypo'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Fontisto'
  | 'Oct';

export interface IconProps {
  /**
   * @description Icon Type
   * @default Ion
   * @type {IconType}
   * @memberof IconProps
   */
  type?: IconType;
  /**
   * @description Size of the Icon
   * @type {number}
   * @memberof IconProps
   */
  size?: number;
  /**
   * @description Color of the icon
   * @default BLACK
   * @type {string}
   * @memberof IconProps
   */
  color?: string;
  /**
   * Icon Style
   * @type {StyleProp<TextStyle>}
   * @memberof IconProps
   */
  style?: StyleProp<TextStyle>;
  /**
   * @description Icon Name
   * @type {string}
   * @memberof IconProps
   */
  name: string;
  testID?: string;
}

/**
 * Icon
 */
export default class Icon extends Component<IconProps> {
  render() {
    const { color = '#000000', size, style, name, testID, type } = this.props;
    switch (type) {
      case 'AntDesign':
        return <AntDesign {...{ color, size, style, name, testID }} />;
      case 'Entypo':
        return <Entypo {...{ color, size, style, name, testID }} />;
      case 'Evil':
        return <EvilIcons {...{ color, size, style, name, testID }} />;
      case 'Feather':
        return <Feather {...{ color, size, style, name, testID }} />;
      case 'FontAwesome':
        return <FontAwesome {...{ color, size, style, name, testID }} />;
      case 'FontAwesome5':
        return <FontAwesome5 {...{ color, size, style, name, testID }} />;
      case 'Fontisto':
        return <Fontisto {...{ color, size, style, name, testID }} />;
      case 'Material':
        return <MaterialIcons {...{ color, size, style, name, testID }} />;
      case 'MaterialCommunity':
        return (
          <MaterialCommunityIcons {...{ color, size, style, name, testID }} />
        );
      case 'Oct':
        return <Octicons {...{ color, size, style, name, testID }} />;
      case 'SimpleLine':
        return <SimpleLineIcons {...{ color, size, style, name, testID }} />;
      default:
        return <IonIcons {...{ color, size, style, name, testID }} />;
    }
  }
}
