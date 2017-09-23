// 应该就是 reload contentscript.js
import ext from './utils/ext';

const LIVERELOAD_HOST = 'localhost:';
const LIVERELOAD_PORT = 35729;
const connection = new WebSocket('ws://' + LIVERELOAD_HOST + LIVERELOAD_PORT + '/livereload');

connection.onerror = function (error: Event) {
  console.error('reload connection got error:', error);
};

connection.onmessage = function (e: MessageEvent) {
  if (e.data) {
    var data = JSON.parse(e.data);
    if (data && data.command === 'reload') {
      ext.runtime.reload();
    }
  }
};