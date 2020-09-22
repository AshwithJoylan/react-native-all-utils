import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ReHighlight, ImagePicker } from 'react-native-all-utils';

/**
 * @interface TestProps
 */
interface TestProps {}

/**
 * Test
 */
export default ({}: TestProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ReHighlight
          onPress={() => {
            ImagePicker?.openImagePicker({
              onSelect: () => {},
            });
          }}
        >
          <Text>Text</Text>
        </ReHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
