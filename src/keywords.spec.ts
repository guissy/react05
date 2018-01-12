import { Calc, Tree } from './keywords';
import { arr, db } from './keywords.data';


test('keyword', () => {
  const tree = new Tree(db) as any;
  let i = 0; // 计数，取前面几条
  let first = null;
  let last = null;
  for (let item of tree) {
    // console.log('☞☞☞ 9527 keywords.spec 106', i, item.name);
    if (i === 0) {
      first = item;
    } else if (i === tree.length - 1) {
      last = item;
    }
    i += 1;
  }
  expect(first.name).toEqual('es6');
  expect(last.name).toEqual('prettier');
  expect(tree).toHaveLength(arr.length);
  expect(tree.walked).toContainEqual(arr[0]);
});

test('keyword calc', () => {
  const tree = new Tree(db) as any;
  const n = tree.calc();
  expect(n).toBe(0)
});
