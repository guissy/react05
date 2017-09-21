/// <reference types="chrome" />
const apis = [
  'alarms',
  'bookmarks',
  'browserAction',
  'commands',
  'contextMenus',
  'cookies',
  'downloads',
  'events',
  'extension',
  'extensionTypes',
  'history',
  'i18n',
  'idle',
  'notifications',
  'pageAction',
  'runtime',
  'storage',
  'tabs',
  'webNavigation',
  'webRequest',
  'windows',
];
// declare const chrome: any; // tslint:disable-line
// declare const browser: any; // tslint:disable-line

class Extension { // tslint:disable-line
  browserAction: any;
  runtime: any;
  storage: any;
  tabs: any;

  constructor() {
    apis.forEach( (api: string) => {

      this[api] = null;

      try {
        if (chrome[api]) {
          this[api] = chrome[api];
        }
      } catch (e) {
        console.error(e);
      }

      try {
        if (window[api]) {
          this[api] = window[api];
        }
      } catch (e) {
        console.error(e);
      }

    });

  }

}
// tslint:disable-next-line
const ext = new Extension();
export default ext;