import isBrowser from '../isBrowser';
import onRouterUpdate from './onRouterUpdate';
import initGoogleAnalytics from './ga';

export default function checkScroll(prevRouterProps, { location }) {
  // change of page
  // onRouterUpdate();
  initGoogleAnalytics();

  if (prevRouterProps && location.pathname !== prevRouterProps.location.pathname) {
    if (isBrowser()) {
      var container = document.getElementById('container');
      if (container) {
        container.scrollTop = 0;
        return true;
      }
    }
    return false;
  }

  return true;
}
