import React from 'react';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export const withSafeArea = (WrappedComponent: () => JSX.Element) => {
  const WrappedApp = () => (
    <SafeAreaProvider>
      <WrappedComponent />
    </SafeAreaProvider>
  );
  return WrappedApp;
};

export const useSafeArea = () => {
  return useSafeAreaInsets();
};
