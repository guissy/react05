import { db, Tree } from './keywords';
// import './setupTests';
it('keyword', () => {
  const tree = new Tree(db) as any;
  let i = 0;
  let n = 0;
  // const it = tree[Symbol.iterator]();
  // let e = it.next();
  // while (!e.done) {
    // e = it.next();
  // }
  // expect(tree.length).toBe(2)
  for (let item of tree) {
    console.log('\u2665  8', item);
    if (i === 0) {
      expect(item.name).toEqual('es6');
      i += 1;
    }
  }
  expect(n).toBe(1);
});
