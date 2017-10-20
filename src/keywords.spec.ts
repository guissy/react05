import { db, Tree } from './keywords';

it('keyword', () => {
  const tree = new Tree(db);
  const i = 0;
  let n = 0;
  for (const it of tree) {
    console.log('\u2665  8', it);
    if (i === 0) {
      n = 1;
      expect(it.name).toEqual('es62');
    }
  }
  expect(n).toBe(1);
});
