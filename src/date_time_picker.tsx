import React, { PureComponent } from 'react';
import ModalDateTimePicker from 'react-native-modal-datetime-picker';

/**
 * @interface DateTimePickerProps
 */
interface DateTimePickerProps {
  /**
   * Handler called when the user presses the confirm button Passes the current selected date
   */
  onSelect?: (date: Date) => void;
  /**
   * Handler called when the user presses the cancel button Passes the current selected date
   */
  onCancel?: (date: Date) => void;
  /**
   * Minimum date the picker can go back to
   */
  minimumDate?: Date;
  /**
   * Maximum date the picker can go forward to
   */
  maximumDate?: Date;
  /**
   * The mode of the picker
   *
   * Available modes are: date - Shows Datepicker time - Shows Timepicker datetime - Shows a combined Date and Time Picker
   *
   * @Default 'date'
   */
  mode?: 'date' | 'time' | 'datetime';
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
}

/**
 * DateTimePickerComponentState
 */
export interface DateTimePickerComponentState {
  visible: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  testID?: string;
}

/**
 * DateTimePickerComponentProps
 */
export interface DateTimePickerComponentProps {
  /**
   * Toggles the dark mode style of the picker If not set, the picker tries to use the color-scheme from the Appearance module, if available.
   *
   * @Default undefined
   */
  timePickerModeAndroid?: 'spinner' | 'clock' | 'default';
  /**
   * Toggles the time mode on Android between spinner and clock views
   *
   * @Default 'default' which shows either spinner or clock based on Android version
   */
  isDarkModeEnabled?: boolean;
}

/**
 * DateTimePicker
 */
export default class DateTimePicker extends PureComponent<
  DateTimePickerComponentProps,
  DateTimePickerComponentState
> {
  constructor(props: Readonly<DateTimePickerComponentProps>) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  onSelect?: (date: Date) => void;
  onCancel?: (date: Date) => void;

  hidePicker = (onDone: () => void) => {
    this.setState(
      {
        visible: false,
      },
      onDone
    );
  };

  openDateTimePicker = (props: DateTimePickerProps) => {
    this.onSelect = props.onSelect;
    this.onCancel = props.onCancel;
  };

  render() {
    const { state, hidePicker, onCancel, onSelect, props } = this;
    return (
      <ModalDateTimePicker
        minimumDate={state.minimumDate}
        maximumDate={state.maximumDate}
        isDarkModeEnabled={props.isDarkModeEnabled}
        timePickerModeAndroid={props.timePickerModeAndroid}
        mode={state.mode}
        testID={state.testID}
        isVisible={state.visible}
        onCancel={(date) => {
          onCancel &&
            hidePicker(() => {
              onCancel(date);
            });
        }}
        onConfirm={(date) => {
          onSelect &&
            hidePicker(() => {
              onSelect(date);
            });
        }}
      />
    );
  }
}
