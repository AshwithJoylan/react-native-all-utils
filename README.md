# react-native-all-utils

Utils For React Native

## Features

  1. Alert
  2. Toast
  3. Picker
  4. Modal
  5. Image Picker
  6. Date Time Picker
  7. Services
    i. Navigation Service
    ii. Settings Service
  8. Re Highlight
  9. Highlight
  10. Toggle Switch Base
  11. Height Collapsible
  12. Text
  13. Icon
  14. Metrics
    i. Sizes
    ii. Typography
  15. Others
    i. withSafeArea
    ii. Animated Components
    iii. Animation hooks


## Installation

### Using Yarn
```sh
yarn add react-native-reanimated react-native-safe-area-context react-native-gesture-handler react-native-vector-icons react-native-redash react-native-safe-area-view @types/react-native-vector-icons react-native-image-crop-picker react-native-modal-datetime-picker @react-native-community/datetimepicker
```

### Android Setup

1.  Add this line in android/app/build.gradle

```sh
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

2.  Change MainActivity.java as Follows

```java
 // imports
 // Add this
 import com.facebook.react.ReactActivityDelegate;
 import com.facebook.react.ReactRootView;
 import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;


 Public Class MainActivity  extends ReactActivity {

 // Add this
   @Override
   protected ReactActivityDelegate createReactActivityDelegate() {
     return new ReactActivityDelegate(this, getMainComponentName()) {
       @Override
       protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
       }
     };
   }
 }
```

### IOS Setup

1. Install Pods

```sh
npx pod-install
```

2. Add this to Info.plist

```xml
  <key>UIAppFonts</key>
  <array>
   <string>AntDesign.ttf</string>
   <string>Entypo.ttf</string>
   <string>EvilIcons.ttf</string>
   <string>Feather.ttf</string>
   <string>FontAwesome.ttf</string>
   <string>FontAwesome5_Brands.ttf</string>
   <string>FontAwesome5_Regular.ttf</string>
   <string>FontAwesome5_Solid.ttf</string>
   <string>Foundation.ttf</string>
   <string>Ionicons.ttf</string>
   <string>MaterialCommunityIcons.ttf</string>
   <string>MaterialIcons.ttf</string>
   <string>Octicons.ttf</string>
   <string>SimpleLineIcons.ttf</string>
   <string>Zocial.ttf</string>
   <string>europa-bold.ttf</string>
   <string>europa-light.ttf</string>
   <string>europa-regular.ttf</string>
   <string>Fontisto.ttf</string>
   <string>Roboto_medium.ttf</string>
   <string>Roboto.ttf</string>
   <string>rubicon-icon-font.ttf</string>
  </array>
  <key>NSCameraUsageDescription</key>
  <string>$(PRODUCT_NAME) wants to access your camera</string>
  <key>NSPhotoLibraryUsageDescription</key>
  <string>$(PRODUCT_NAME) wants to access your gallery</string>
  <key>NSMicrophoneUsageDescription</key>
  <string>$(PRODUCT_NAME) wants to access your microphone</string>
```

## Usage

1. Add Root in App.js

```js
import { Root } from 'react-native-all-utils';

const App = () => (
  <Root>
    // Components
  </Root>
);
```

```js
import { Alert } from 'react-native-all-utils';

// ...
Alert.show({
  title: 'Alert',
  description: 'Alert Description',
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
