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
  expect(data.scores).toBeGreaterThan(8);
});
test('test empty', () => {
  document.body.innerHTML = '<h1></h1>';
  expect(document.URL).toContain('51job');
  const data = extractTags();
  expect(data.scores).toBe(0);
  expect(data.error).toContain('流动性比利润更重要！');
});