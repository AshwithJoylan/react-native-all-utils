import * as React from 'react';
import { Root, withSafeArea, useSafeArea } from 'react-native-all-utils';
import Test from './Test';

const App = () => {
  const { bottom } = useSafeArea();
  return (
    <Root pickerProps={{ bottom }}>
      <Test />
    </Root>
  );
};

export default withSafeArea(App);
