import { Calc, KeywordItem, Tree } from './keywords';
import { arr, db } from './keywords.data';


test('keyword', () => {
  const tree = new Tree(db);
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
  const tree = new Tree([{
    name: 'first', children: [{ name: 'first', score: 2.5 }]
  } as KeywordItem]);
  expect(tree.calc()).toBe(0);
  const kw = tree.items[0].children[0] as KeywordItem;
  kw.works = []
  kw.works.push({startDate: new Date(2017, 1, 1), endDate: new Date(2017, 7, 1)});
  expect(tree.calc()).toBe(2.5);
});

test('keyword calcStore', () => {
  const tree = new Tree([{
    name: 'first', score: 2.5, children: []
  } as KeywordItem]);
  expect(tree.calcScore(2, 9)).toBe(3);
  expect(tree.calcScore(2.5, 12)).toBe(5);
  expect(tree.calcScore(1000, 24)).toBe(3000);
})
test.only('keyword calcMonth', () => {
  const tree = new Tree([{
    name: 'first', score: 2.5, children: []
  } as KeywordItem]);
  let works = [
    {startDate: new Date(2017, 0, 1), endDate: new Date(2017, 0, 2)},
    {startDate: new Date(2017, 0, 4), endDate: new Date(2017, 0, 5)},
    {startDate: new Date(2017, 0, 2), endDate: new Date(2017, 0, 6)},
    ];
  expect(tree.calcMonth(works)).toBe(5 * 1000 * 60 * 60 * 24 );
})
