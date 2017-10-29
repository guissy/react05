import chrome from '@types/chrome';
declare global {

  interface Window {
    chrome: chrome;
  }
  namespace NodeJS {
    interface Global {
      window: Window;
    }
  }
}