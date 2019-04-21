import isBrowser from '../isBrowser';
import Dispatcher from '../Dispatcher';
import isTouchDevice from '../isTouchDevice';

var isSetup = false;
export default function onRouterUpdate() {
  if (isBrowser()) {
    // in browser
    if (window.Rubix) {
      if (isSetup) {
        window.Rubix.Cleanup();
      }

      isSetup = true;
    }

    if (window.Pace) Pace.restart();

    if (isTouchDevice()) {
      // close sidebar on router update
      Dispatcher.publish('sidebar', false);
    }
  }
}
