const fs = require('fs');
test('test fetch html', () => {
  const html = fs.readFileSync('./src/jest/my.htm');
  document.body.innerHTML = html;
  // console.log('☞☞☞ 9527 contentscript.spec 4', html);
  expect(document.URL).toContain('localhost');
  expect(document.body.innerHTML).toContain('51job');
  expect(true).toBeTruthy();
});