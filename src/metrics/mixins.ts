import { Dimensions, Platform, PlatformIOSStatic } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

console.log('Wi:', WINDOW_WIDTH);

let guidelineBaseWidth = 400;

if (Platform.OS === 'ios') {
  const platformIOS = Platform as PlatformIOSStatic;
  if (platformIOS.isPad) {
    guidelineBaseWidth = 800;
  }
}

export const scaleSize = (size: number) =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const reverseScaleSize = (size: number) =>
  Math.round(size / (WINDOW_WIDTH / guidelineBaseWidth));
