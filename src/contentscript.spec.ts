const fs = require('fs');
test('test fetch html', () => {
  const html = fs.readFileSync('./src/jest/my.htm');
  document.body.innerHTML = html;
  (document as any).URL = 'http://i.51job.com/resume/resume_preview.php?lang=c&resumeid='
  expect(document.URL).toContain('51job');
  expect(document.body.innerHTML).toContain('51job');
  expect(true).toBeTruthy();
});