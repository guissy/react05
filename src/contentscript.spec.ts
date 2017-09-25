import any = jasmine.any;

const fs = require('fs');
import { extractTags } from './contentscript';

test('test fetch html', () => {
  const html = fs.readFileSync('./src/jest/my.htm');
  document.body.innerHTML = html;
  Object.defineProperty(document, 'URL', {
    get() {
      return 'http://i.51job.com/resume/resume_preview.php?lang=c&resumeid=';
    }
  });
  expect(document.URL).toContain('51job');
  expect(document.body.innerHTML).toContain('51job');
  const data = extractTags();
  const re = /[^\n]{100,}/g;
  expect(data.article).toMatch(re);
  expect(data.article.length).toBeGreaterThan(100);
  expect(data.scores).toBeGreaterThan(8);
  expect(data.scores).toBeLessThan(18);
});
test('test empty', () => {
  document.body.innerHTML = '<h1></h1>';
  if (!document.URL.includes('51job')) {
    Object.defineProperty(document, 'URL', {
      get() {
        return 'http://i.51job.com/resume/resume_preview.php?lang=c&resumeid=';
      }
    });
  }
  expect(document.URL).toContain('51job');
  const data = extractTags();
  expect(data.scores).toBe(0);
  // expect(data.error).toContain('！');
});