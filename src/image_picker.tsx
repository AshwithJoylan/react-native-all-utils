/* eslint-disable react-native/no-inline-styles */
//import libraries
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  Image,
  StyleSheet,
} from 'react-native';

// import SvgUri from 'react-native-svg-uri';
import Highlight from './re_highlight';
import ImagePicker, { Image as IM } from 'react-native-image-crop-picker';
import CustomModal from './modal';
import { Sizes, Typography } from './metrics';
import Images from './images';

export interface ImagePickerProps {
  onSelect: (data: string | string[]) => void;
  multiple?: boolean;
}

/**
 * ImagePickerState
 */
export interface ImagePickerState {
  visible: boolean;
  multiple?: boolean;
}

/**
 * ImagePickerComponentProps
 */
export interface ImagePickerComponentProps {
  color?: string;
}

//component
class CustomImagePicker extends PureComponent<
  ImagePickerComponentProps,
  ImagePickerState
> {
  static defaultProps: { color: string };
  constructor(props: Readonly<ImagePickerComponentProps>) {
    super(props);
  }

  state = {
    visible: false,
    multiple: undefined,
  };

  onBack = () => {
    this.setState({
      visible: false,
    });
  };

  onSelect: (data: string | string[]) => void = () => {};

  openGallery = () => {
    const { multiple } = this.state;
    ImagePicker.openPicker({
      cropping: true,
      multiple: multiple || false,
    })
      .then((im) => {
        if (Array.isArray(im)) {
          const ims = im.map(({ path }: IM) => path);
          this.onSelect(ims);
        } else {
          this.onSelect((im as IM).path);
        }
      })
      .catch((err) => {
        console.log('err:', err);
      });
    this.onBack();
  };

  openCamera = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then(
        (granted) => {
          if (granted) {
            ImagePicker.openCamera({ cropping: true })
              .then((im) => {
                this.onSelect((im as IM).path);
              })
              .catch(() => {});
          }
        }
      );
    } else {
      ImagePicker.openCamera({ cropping: true })
        .then((im) => {
          this.onSelect((im as IM).path);
        })
        .catch((err) => {
          console.log('err:', err);
        });
    }
    this.onBack();
  };

  openImagePicker = ({ multiple, onSelect }: ImagePickerProps) => {
    this.onSelect = onSelect;
    this.setState({
      multiple,
      visible: true,
    });
  };

  render() {
    const {
      props: { color },
    } = this;
    return (
      <CustomModal
        onBack={this.onBack}
        backgroundBackEnabled
        animated
        style={{
          flex: 1,
          width: '80%',
          borderRadius: Sizes.SIZE_20,
          overflow: 'hidden',
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          justifyContent: 'center',
        }}
        animationType="bounceIn"
        visible={this.state.visible}
      >
        <View
          style={{
            width: '100%',
            paddingVertical: Sizes.SIZE_15,
            borderBottomColor: `${color}20`,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'black',
              fontSize: Typography.FONT_SIZE_20,
            }}
          >
            Select Images
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Highlight
            style={{
              width: '50%',
              paddingVertical: Sizes.SIZE_20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={this.openGallery}
          >
            <Image
              source={Images.GALLERY}
              style={{ width: Sizes.SIZE_60, height: Sizes.SIZE_60 }}
            />

            <Text style={{ color }}>Gallery</Text>
          </Highlight>
          <Highlight
            style={{
              width: '50%',
              paddingVertical: Sizes.SIZE_20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={this.openCamera}
          >
            <Image
              source={Images.CAMERA}
              style={{ width: Sizes.SIZE_60, height: Sizes.SIZE_60 }}
            />
            <Text style={{ color }}>Camera</Text>
          </Highlight>
        </View>
        <Highlight
          onPress={this.onBack}
          style={{
            width: '100%',
            paddingVertical: Sizes.SIZE_15,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopColor: `${color}20`,
            borderTopWidth: StyleSheet.hairlineWidth,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: color,
            }}
          >
            Cancel
          </Text>
        </Highlight>
      </CustomModal>
    );
  }
}

CustomImagePicker.defaultProps = {
  color: '#000000',
};

export default CustomImagePicker;
