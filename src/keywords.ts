export enum Calc {
  sum = 'sum', // 默认
  max = 'max',
  avg = 'avg',
}
interface TreeItem {
  name: string;
  children?: TreeItem[];
}
export interface KeywordItem extends TreeItem {
  name: string;
  score?: number;
  alias?: string[];
  calc?: Calc;
  children?: KeywordItem[];
}

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
      { name: 'typescript', alias: 'ts', score: 2 },
      { name: 'flow', alias: 'flowjs', score: 0.5 },
      { name: 'redux', score: 2 },
      { name: 'vuex', score: 2 },
      { name: 'saga', score: 2 },
      { name: 'dva', score: 2 },
      { name: 'rxjs', alias: 'ReactiveX', score: 2 },
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
// export const db;

export class Tree<T extends TreeItem> implements IterableIterator<TreeItem> {
  private index: number = 0;
  private walked: T[] = [];
  constructor(private items: TreeItem[]) {
    if (!Array.isArray(items)) {
      this.items = [] as TreeItem[];
    }
    this.walk(this.items as T[]);
    console.log('☞☞☞ 9527 keywords 97', this.walked);
  }

  walk(items: T[]) {
    items.forEach((item: T) => {
      const notArray = !Array.isArray(item.children);
      const isEmpty = item.children && !(item.children.length > 0);
      if (notArray || isEmpty) {
        this.walked.push(item);
      } else {
        this.walk(item.children as T[]);
      }
    })
  }

  next(value?: T): IteratorResult<T> {
    // 忽略 level 1, 遍历 level 2 和 level 3
    // 分别使用 Lv1 Lv2 Lv3 表示各级别
    let item: T = null;
    item = this.walked[this.index];
    console.log('\u2665 next', this.index);
    this.index += 1;
    return { value: item, done: item === null };
  }

  // return(value?: T): IteratorResult<T> {
  //   return { value, done: false };
  // }

  throw(e?: Error): IteratorResult<T> {
    return { value: null, done: true };
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }
}

const keywords = {
  // 以下key会作为正则的一部分，不要加不相关的符号
  // 核心项
  '(es6|ECMAScript6|es2015)': 2.5,
  '(es7|ECMAScript7|es2016)': 1.5,
  'react': 2,
  '(vue|vuejs|vue2)': 2,
  '(angular2|angular4)': 2,
  '(angular|angularjs)': 1.5,

  // 函数式
  '(ts|typescript)': 2,
  '(redux|react-redux)': 2,
  'vuex': 2,
  'saga': 2,
  'dva': 2,
  '(rxjs|ReactiveX)': 1.5,
  'lodash': 1,

  // 质量
  'mocha': 1.5,
  'jasmine': 1.5,
  'jest': 1.5,
  'ava': 1.5,
  '(mock|mocking)': 1.5,
  '(eslint|jslint)': 1,

  // 样式
  '(less|sass|scss)': 1,
  'postcss': 1,
  'stylus': 1,
  '(flexbox|flex)': 1,

  // ui / mobile
  '(element|elementUI|eleme|elemeUI)': 1.5,
  '(antd|Ant Design)': 1.5,
  'react native': 1,
  'vux': 1,

  // 附加分
  '(express|koa|koa2)': 0.5,
  '(node|nodejs)': 0.3,
  'ionic': 0.3,
  'ionic2': 0.5,
  'jenkins': 0.3,
  '(gulp|gulp4)': 0.3,
  'grunt': 0.2,
  'ApiCloud': 0.3,
  '(jQuery.Mobile|jqm)': 0.3,
  '(PhantomJS|Phantom)': 0.3,
  'underscore': 0.3,
  'websocket': 0.5,
  '(webpack|webpack2)': 0.5,
  'babel': 0.3,
  'browserify': 0.2,
  'browser.sync': 0.2,
  'canvas': 0.3,
  '(velocity|velocityjs)': 0.5,
  'animate.css': 0.3,
  '(greensock|gsap)': 0.3,
  'webgl': 0.5,
  '(requirejs|require.js)': 0.3,
  '(fis|fis3)': 0.2,
  '(sea|seajs)': 0.2,
  'git': 0.3,
  'svn': 0.2,
  'github': 0.5,
  'axure': 0.5,
  'axios': 0.3,
  'fetch': 0.2,
  '(d3|d3js)': 0.3,
  'knockout': 0.2,
  'ember': 0.2,
  'backbone': 0.2,
  '(shim|polyfill)': 0.2,
  'html5': 0.3,
  'css3': 0.3,
  'graphQL': 0.5,
  '(as3|ActionScript3)': 0.3,
  '(photoshop|ps)': 0.3,
  'spa': 0.5,
  'pwa': 0.5,
  'amp': 0.2,
  'fullpage': 0.2,
  'router': 0.2,
  'service': 0.2,
  'XSS': 0.5,
  'csrf': 0.5,
  'cordova': 0.3,
  'hack': 0.3,
  'SOAP': 0.2,
  'yeoman': 0.2,
  'bower': 0.2,
  'bash': 0.2,
  'review': 0.3,
  '(linux|centos)': 0.2,
  'mvvm': 0.3,
  'mvc': 0.2,

  '(restful|rest|restAPI|restfulAPI)': 0.1,
  '(sql|mysql|sqlserver|mongodb|redis|db2|oracle)': 0.1,
  'jwt': 0.1,
  'seo': 0.1,
  'cdn': 0.1,
  '(webstorm|vscode)': 0.1,
  '(ajax|jsonp)': 0.1,
  '(bootstrap|bootstrap4)': 0.1,
  'hybird': 0.1,
  'vue-resource': 0.1,
  'svg': 0.1,
  '(echart|echarts)': 0.1,
  'rem': 0.1,
  'flash': 0.1,
  'media': 0.1,
  'C#': 0.1,
  'java': 0.1,
  'php': 0.1,
  'python': 0.1,
  '(xcode|ios|swift)': 0.1,
  'nginx': 0.1,
  'weui': 0.1,
  'iscroll': 0.1,
  'mobiscroll': 0.1,
  '(mint|mui)': 0.1,
  'cms': 0.1,
};

export default keywords;