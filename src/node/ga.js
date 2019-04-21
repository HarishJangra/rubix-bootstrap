import isBrowser from '../isBrowser';

export default function initGoogleAnalytics() {
  if (isBrowser()) {
    if(window.hasOwnProperty('ga') && typeof window.ga === 'function') {
      window.ga('send', 'pageview', {
       'page': window.location.pathname + window.location.search  + window.location.hash
      });
    }
  }
};
