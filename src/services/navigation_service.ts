import { createRef } from 'react';
import {
  NavigationContainerRef,
  NavigationState,
  PartialState,
  EventListenerCallback,
  NavigationAction,
  StackActions,
  NavigationContainerEventMap,
} from '@react-navigation/native';

// Creating Navigation Reference
export const navigationRef = createRef<NavigationContainerRef>();

/**
 * Navigate to a route in current navigation tree.
 *
 * @param name — Name of the route to navigate to.
 *
 * @param params — Params object for the route.
 */
export const navigate = (name: string, params?: object) => {
  navigationRef.current?.navigate(name, params);
};

/**
 * Go back to the previous route in history.
 */
export const goBack = () => {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.goBack();
  }
};

/**
 * Check if dispatching back action will be handled by navigation. Note that this method doesn't re-render screen when the result changes. So don't use it in render.
 */
export const canGoBack = () => navigationRef.current?.canGoBack();

/**
 * Subscribe to events from the parent navigator.
 *
 * @param type — Type of the event (e.g. focus, blur)
 *
 * @param callback — Callback listener which is executed upon receiving the event.
 */
export const addListener = (
  type: 'state',
  callback: EventListenerCallback<NavigationContainerEventMap, 'state'>
) => navigationRef.current?.addListener(type, callback);

/**
 * UnSubscribe to events from the parent navigator.
 *
 * @param type — Type of the event (e.g. focus, blur)
 *
 * @param callback — Callback listener which is executed upon receiving the event.
 */
export const removeListener = (
  type: 'state',
  callback: EventListenerCallback<NavigationContainerEventMap, 'state'>
) => navigationRef.current?.removeListener(type, callback);

/**
 * Update the param object for the route. The new params will be shallow merged with the old one.
 *
 * @param params — Params object for the current route.
 */
export const setParams = (params: object | undefined) =>
  navigationRef.current!.setParams(params);

/**
 * Reset the navigation state to the provided state.
 *
 * @param state — Navigation state object.
 */
export const reset = (state: NavigationState | PartialState<NavigationState>) =>
  navigationRef.current!.reset(state);
/**
 * Check if the screen is focused. The method returns `true` if focused, `false` otherwise.
 * Note that this method doesn't re-render screen when the focus changes. So don't use it in `render`.
 * To get notified of focus changes, use `addListener('focus', cb)` and `addListener('blur', cb)`.
 * To conditionally render content based on focus state, use the `useIsFocused` hook.
 */
export const isFocused = () => navigationRef.current?.isFocused();

/**
 * Dispatch an action or an update function to the router.
 * The update function will receive the current state,
 *
 * @param action Action object or update function.
 */
export const dispatch = (
  action: NavigationAction | ((state: NavigationState) => NavigationAction)
) => navigationRef.current!.dispatch(action);

/**
 * Reset the navigation state of the root navigator to the provided state.
 *
 * @param state Navigation state object.
 */
export const resetRoot = (
  state?: NavigationState | PartialState<NavigationState> | undefined
) => {
  navigationRef.current!.resetRoot(state);
};

/**
 * Get the rehydrate navigation state of the navigation tree.
 */
export const getRootState = () => navigationRef.current?.getRootState();

/**
 *
 * @param name string
 * @param params object
 */
export const replace = (name: string, params?: object) => {
  navigationRef.current!.dispatch(StackActions.replace(name, params));
};

/**
 * Gets screens to map in the <Navigator>
 */
export const getScreens = (screens: object) => {
  const names = Object.keys(screens);
  const components = Object.values(screens);
  return names.map((name, i) => ({
    name,
    component: components[i],
  })) as {
    name: string;
    component: React.ComponentClass<any, any> | React.FunctionComponent<any>;
  }[];
};
