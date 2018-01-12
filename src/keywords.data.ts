import { Calc } from './keywords';

export const db = [
  {
    name: '核心项',
    score: 10,
    children: [
      { name: 'es6', alias: ['es2015'], score: 2.5 },
      {
        name: 'esnext',
        alias: ['es2016'],
        score: 2.5,
        calc: Calc.max,
        children: [
          { name: 'es7', alias: ['es2016'], score: 2.5 },
          { name: 'es8', alias: ['es2017'], score: 2.5 },
          { name: 'es9', alias: ['es2018'], score: 2.5 },
        ],
      },
      { name: 'react', score: 2 },
      { name: 'vue', alias: ['vuejs', 'vue2'], score: 2 },
      { name: 'angular2', alias: ['angular2', 'angular4', 'angular5'], score: 1.5 },
    ]
  },
  {
    name: '函数式和类js语言',
    children: [
      { name: 'typescript', alias: ['ts'], score: 2 },
      { name: 'flow', alias: ['flowjs'], score: 0.5 },
      { name: 'redux', score: 2 },
      { name: 'vuex', score: 2 },
      { name: 'saga', score: 2 },
      { name: 'dva', score: 2 },
      { name: 'rxjs', alias: ['ReactiveX'], score: 2 },
      { name: 'lodash', score: 1 },
      { name: 'underscore', score: 0.5 },
    ]
  },
  {
    name: '代码质量', children: [
    {
      name: 'unit test',
      calc: Calc.max,
      children: [
        { name: 'mocha', score: 1.5 },
        { name: 'jasmine', score: 1.5 },
        { name: 'jest', score: 1.5 },
        { name: 'ava', score: 1.5 },
      ]
    },
    {
      name: 'mock',
      calc: Calc.max,
      children: [
        { name: 'mock', score: 1.5 },
        { name: 'mockjs', score: 1.5 },
      ]
    },
    {
      name: 'mock',
      calc: Calc.max,
      children: [
        { name: 'tslint', score: 1.5 },
        { name: 'eslint', score: 1.5 },
        { name: 'jslint', score: 1.5 },
      ]
    },
    { name: 'prettier', score: 0.5 },
  ]
  }
];
export const arr = [
  { name: 'es6', alias: ['es2015'], score: 2.5 },
  { name: 'es7', alias: ['es2016'], score: 2.5 },
  { name: 'es8', alias: ['es2017'], score: 2.5 },
  { name: 'es9', alias: ['es2018'], score: 2.5 },
  { name: 'react', score: 2 },
  { name: 'vue', alias: ['vuejs', 'vue2'], score: 2 },
  { name: 'angular2', alias: ['angular2', 'angular4', 'angular5'], score: 1.5 },
  { name: 'typescript', alias: ['ts'], score: 2 },
  { name: 'flow', alias: ['flowjs'], score: 0.5 },
  { name: 'redux', score: 2 },
  { name: 'vuex', score: 2 },
  { name: 'saga', score: 2 },
  { name: 'dva', score: 2 },
  { name: 'rxjs', alias: ['ReactiveX'], score: 2 },
  { name: 'lodash', score: 1 },
  { name: 'underscore', score: 0.5 },
  { name: 'mocha', score: 1.5 },
  { name: 'jasmine', score: 1.5 },
  { name: 'jest', score: 1.5 },
  { name: 'ava', score: 1.5 },
  { name: 'mock', score: 1.5 },
  { name: 'mockjs', score: 1.5 },
  { name: 'tslint', score: 1.5 },
  { name: 'eslint', score: 1.5 },
  { name: 'jslint', score: 1.5 },
  { name: 'prettier', score: 0.5 },
];