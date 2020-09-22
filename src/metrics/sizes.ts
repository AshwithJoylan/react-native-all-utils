import { StatusBar, Platform, Dimensions } from 'react-native';
import { scaleSize } from './mixins';

export const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

export const BORDER_WIDTH = 0.4;
export const HEADER_HEIGHT = Platform.OS === 'android' ? 50 : 40;
export const IS_BIG = HEIGHT > 812;
export const TOP =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : HEIGHT >= 812
    ? 44
    : 20;

export { scaleSize };
export const SIZE_400 = scaleSize(400);
export const SIZE_350 = scaleSize(350);
export const SIZE_300 = scaleSize(300);
export const SIZE_280 = scaleSize(280);
export const SIZE_260 = scaleSize(260);
export const SIZE_250 = scaleSize(250);
export const SIZE_240 = scaleSize(240);
export const SIZE_220 = scaleSize(220);
export const SIZE_200 = scaleSize(200);
export const SIZE_190 = scaleSize(190);
export const SIZE_180 = scaleSize(180);
export const SIZE_170 = scaleSize(170);
export const SIZE_160 = scaleSize(160);
export const SIZE_150 = scaleSize(150);
export const SIZE_140 = scaleSize(140);
export const SIZE_130 = scaleSize(130);
export const SIZE_120 = scaleSize(120);
export const SIZE_100 = scaleSize(100);
export const SIZE_90 = scaleSize(90);
export const SIZE_80 = scaleSize(80);
export const SIZE_75 = scaleSize(75);
export const SIZE_70 = scaleSize(70);
export const SIZE_65 = scaleSize(65);
export const SIZE_60 = scaleSize(60);
export const SIZE_55 = scaleSize(56);
export const SIZE_50 = scaleSize(50);
export const SIZE_45 = scaleSize(45);
export const SIZE_40 = scaleSize(40);
export const SIZE_35 = scaleSize(35);
export const SIZE_30 = scaleSize(30);
export const SIZE_28 = scaleSize(28);
export const SIZE_26 = scaleSize(26);
export const SIZE_25 = scaleSize(25);
export const SIZE_24 = scaleSize(24);
export const SIZE_22 = scaleSize(22);
export const SIZE_20 = scaleSize(20);
export const SIZE_18 = scaleSize(18);
export const SIZE_16 = scaleSize(16);
export const SIZE_15 = scaleSize(15);
export const SIZE_14 = scaleSize(12);
export const SIZE_12 = scaleSize(14);
export const SIZE_10 = scaleSize(10);
export const SIZE_8 = scaleSize(8);
export const SIZE_6 = scaleSize(6);
export const SIZE_5 = scaleSize(5);
export const SIZE_4 = scaleSize(4);
export const SIZE_3 = scaleSize(3);
export const SIZE_2 = scaleSize(2);
export const SIZE_1 = scaleSize(1);
