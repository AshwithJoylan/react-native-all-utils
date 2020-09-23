import React, { FC } from 'react';
import AlertComponent, { AlertComponentProps } from './alert';
import ToastComponent from './toast';
import PickerComponent, { PickerProps } from './picker';
import ImagePickerComponent, {
  ImagePickerComponentProps,
} from './image_picker';
import DateTimePickerComponent, {
  DateTimePickerComponentProps,
} from './date_time_picker';

let Alert: AlertComponent | null = null;
let Toast: ToastComponent | null = null;
let Picker: PickerComponent | null = null;
let ImagePicker: ImagePickerComponent | null = null;
let DateTimePicker: DateTimePickerComponent | null = null;

/**
 * RootProps
 */
export interface RootProps {
  alertProps?: AlertComponentProps;
  pickerProps?: PickerProps;
  imagePickerProps?: ImagePickerComponentProps;
  dateTimePickerProps?: DateTimePickerComponentProps;
}
/**
 * Root
 */
const CustomRoot: FC<RootProps> = (props) => {
  return (
    <>
      <ToastComponent ref={(ref) => (Toast = ref)} />
      <PickerComponent {...props.pickerProps} ref={(ref) => (Picker = ref)} />
      <AlertComponent {...props.alertProps} ref={(ref) => (Alert = ref)} />
      <ImagePickerComponent
        {...props.imagePickerProps}
        ref={(ref) => (ImagePicker = ref)}
      />
      {props.children}
      <DateTimePickerComponent
        {...props.dateTimePickerProps}
        ref={(ref) => (DateTimePicker = ref)}
      />
    </>
  );
};

export default CustomRoot;

export { Alert, Toast, Picker, ImagePicker, DateTimePicker };
