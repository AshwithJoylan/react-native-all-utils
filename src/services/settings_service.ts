import { Linking } from 'react-native';

export const openAppSettings = () => {
  Linking.canOpenURL('app-settings:')
    .then((supported) => {
      if (supported) {
        Linking.openURL('app-settings:');
      }
    })
    .catch(() => {});
};

export const openSettings = () => Linking.openSettings;
