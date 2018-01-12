const fs = require('fs');
// require('./setupTests1.js');
import { extractTags, TableData } from './contentscript';

test('test fetch html', () => {
  const html = fs.readFileSync('./src/jest/my.html');
  document.body.innerHTML = html;
  Object.defineProperty(document, 'URL', {
    get() {
      return 'http://i.51job.com/resume/resume_preview.php?lang=c&resumeid=';
    }
  });
  expect(document.URL).toContain('51job');
  expect(document.body.innerHTML).toContain('51job');
  const data = extractTags();
  expect(data).toEqual(expect.objectContaining({
    article: expect.any(String),
    title: expect.any(String),
    url: expect.any(String),
    scores: expect.any(Number),
    skills: expect.any(Array),
    error: null,
  }));
  expect(data.skills.pop()).toEqual(expect.objectContaining({
    kw: expect.any(String),
    age: expect.any(Number),
    score: expect.any(Number),
  }));
  expect(data.article.length).toBeGreaterThan(1);
  expect(data.title.length).toBeGreaterThan(1);
  expect(data.url.length).toBeGreaterThan(1);
  expect(data.scores).toBeGreaterThan(1);
  expect(data.scores).toBeLessThan(100);
  // expect(data.skills.length).toBeGreaterThan(0);
});
test.skip('test empty', () => {
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
  expect(data).toHaveProperty('article');
  expect(data).toHaveProperty('title');
  expect(data).toHaveProperty('url');
  expect(data).toHaveProperty('scores');
  expect(data).toHaveProperty('skills');
  expect(data).toHaveProperty('error');
  expect(data.scores).toBe(0);
  // expect(data.error).toContain('！');
});