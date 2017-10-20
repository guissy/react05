import { sum, values } from 'lodash';
import ext from './utils/ext';
import { SkillItem } from './ScoreTable';
import keywords, { Calc, db, KeywordItem } from './keywords';

type T = () => TableData;

export function extractTags(): TableData {
  const url = document.location.href;
  if (!url || !url.match(/^http/)) {
    return {} as TableData;
  }

  const data: TableData = {
    title: '',
    url: document.location.href,
    scores: 0,
    skills: [] as SkillItem[],
    article: '',
    error: null,
  };

  const ogTitle = document.querySelector('meta[property=\'og:title\']');
  if (ogTitle) {
    data.title = ogTitle.getAttribute('content');
  } else {
    data.title = document.title;
  }

  parse51job(data, keywords, db);
  parseLagou(data, keywords, db);

  const descriptionTag = document.querySelector('meta[property*=description]');
  if (descriptionTag) {
    data.article = descriptionTag.getAttribute('content');
  }

  return data;
}

function parse51job(data: TableData, kw: {[k in string]: number}, dbs: KeywordItem[]) {
  if (!document.URL.includes('51job.com')) {
    return {};
  }
  const tds = Array.from(document.querySelectorAll('.plate1'));
  if (tds) {
    const scores = Object.keys(kw).reduce((o, k) => (o[k] = 0, o), {});
    const mouths = Object.keys(kw).reduce((o, k) => (o[k] = 0, o), {});
    let article = '';
    let counter = 0;
    tds.forEach((td: HTMLTableDataCellElement) => {
      const tdTxt = td.textContent ? td.textContent.trim() : '';
      if (tdTxt === '工作经验' || tdTxt === '项目经验') {
        let foundCounter = false;
        const table = td.parentElement.nextElementSibling as HTMLElement;
        if (table) {
          Array.from(table.querySelectorAll('.tbb>table>tbody>tr')).forEach((tr: HTMLTableRowElement) => {
            const time = tr.querySelector('.time') as HTMLSpanElement;
            let [start, end] = time ? time.textContent.split('-') : ['0', '0'];
            if (end === '至今') {
              end = new Date().toLocaleDateString();
            }
            const t = new Date(end).valueOf() - new Date(start).valueOf();
            const d = new Date(t);
            let y = 0; // 年
            let m = 0; // 月
            let mm = 0;
            if (d) {
              y = d.getFullYear() - 1970;
              m = d.getMonth() + 1;
              mm = y * 12 + m; // 总月数
            }
            const str = tr.textContent;
            let found = false;
            Object.keys(kw).forEach(k => {
              const v = kw[k];
              const arr = str.match(new RegExp(`\\b${k}\\b`, 'gi'));
              if (arr && arr.length > 0) {
                if (mm > 0) {
                  let _mm = mm;
                  if (v <= 0.5) {
                    _mm = Math.min(mm, 6);
                  } else if (v <= 1) {
                    _mm = Math.min(mm, 10);
                  } else if (v <= 2) {
                    _mm = Math.min(mm, 12);
                  } else if (v <= 3) {
                    _mm = Math.min(mm, 15);
                  } // tslint:disable-line
                  if (k.includes('vue')) {
                    _mm = Math.min(mm, 12);
                  } // tslint:disable-line
                  scores[k] = Math.max(scores[k], v * _mm / 6);
                  mouths[k] = Math.max(mouths[k], mm);
                  // words.push(k+' '+mm+'月'+'\n');
                  // console.log('\u2714 contentscript  110', k, v, mm);
                  found = true;
                  foundCounter = true;
                }
              }
            });
            if (found) {
              const tb1 = Array.from(tr.querySelectorAll('.txt1')).pop() as HTMLTableCellElement;
              article += tb1 ? tb1.textContent : '';
            }
          });
        }
        if (foundCounter) {
          counter += 1;
        }
      }
    });
    data.scores = sum(values(scores));
    data.skills = Object.keys(kw).filter(k => mouths[k] > 0).map((k) => ({
        kw: k.replace(/\(|\)/, '').split('|').shift(),
        age: Number(mouths[k]),
        score: Number(scores[k]),
      }));
    if (scores === 0) {
      data.skills = [];
      data.error = '很遗憾，没匹配到关键字！';
    }
    data.article = article;
  } else {
    data.scores = -1;
    data.skills = [];
    data.error = '此网站已更新，插件过时';
  }
  return data;
}

function parseLagou(data: TableData, keywords: {[k in string]: number}, dbs: KeywordItem[]) {
  if (!document.URL.includes('lagou')) {
    return {};
  }
  const tds = Array.from(document.querySelectorAll('.mr_jobe_list'));
  const pdf = document.querySelector('.preview-doc') as HTMLElement;
  if (tds && tds.length > 0) {
    const scores = Object.keys(keywords).reduce((o, k) => (o[k] = 0, o), {});
    const mouths = Object.keys(keywords).reduce((o, k) => (o[k] = 0, o), {});
    let article = '';
    let counter = 0;
    tds.forEach((td: HTMLTableCellElement) => {
      let foundCounter = false;
      const content = td.querySelector('.mr_content_m');
      if (content) {
        // Array.from(td.querySelectorAll('.tbb>table>tbody>tr')).forEach((tr)=>{
        const time = td.querySelector('.mr_content_r') as HTMLSpanElement;
        let timeStr = time.textContent;
        timeStr = timeStr.replace(/\s/g, '');
        timeStr = timeStr.replace(/\./g, '/');
        timeStr = timeStr.replace(/-/g, '—');

        let [start, end] = time ? timeStr.split('—') : [0, 0];
        // console.log('\u2714 contentscript  227', timeStr, start, end);
        if (end === '至今') {
          end = Date.now();
        }
        const t = new Date(end as number).valueOf() - new Date(start as number).valueOf();
        const d = new Date(t);
        let y = 0; // 年
        let m = 0; // 月
        let mm = 0;
        if (d) {
          y = d.getFullYear() - 1970;
          m = d.getMonth() + 1;
          mm = y * 12 + m; // 总月数
        }
        const str = td.textContent;
        let found = false;
        Object.keys(keywords).forEach(k => {
          const v = keywords[k];
          const arr = str.match(new RegExp(`\\b${k}\\b`, 'gi'));
          if (arr && arr.length > 0) {
            if (mm > 0) {
              let _mm = mm;
              if (v <= 0.5) {
                _mm = Math.min(mm, 6);
              } else if (v <= 1) {
                _mm = Math.min(mm, 10);
              } else if (v <= 2) {
                _mm = Math.min(mm, 12);
              } else if (v <= 3) {
                _mm = Math.min(mm, 15);
              }
              if (k.includes('vue')) {
                _mm = Math.min(mm, 12);
              }
              scores[k] = Math.max(scores[k], v * _mm / 6);
              mouths[k] = Math.max(mouths[k], mm);
              // words.push(k+' '+mm+'月'+'\n');
              // console.log('\u2714 contentscript  110', k, v, mm);
              found = true;
              foundCounter = true;
            }
          }
        });
        if (found) {
          const tb1 = Array.from(td.querySelectorAll('.mr_content_m')).pop() as HTMLTableCellElement;
          article += tb1 ? tb1.textContent : '';
        }
        // });
      }
      if (foundCounter) {
        counter += 1;
      }
    });
    data.scores = sum(values(scores));
    data.skills = Object.keys(keywords).filter(k => mouths[k] > 0).map((k) => ({
      kw: k.replace(/\(|\)/, '').split('|').shift(),
      age: Number(mouths[k]),
      score: Number(scores[k]),
    }));
    if (scores === 0) {
      data.skills = [];
      data.error = '很遗憾 ，没匹配到关键字！';
    }
    data.article = article;
  } else if (pdf) {
    const scores = Object.keys(keywords).reduce((o, k) => (o[k] = 0, o), {});
    const mouths = Object.keys(keywords).reduce((o, k) => (o[k] = 0, o), {});
    const w = Object.keys(keywords).map(v => v.replace(/\(|\)/g, '')).join('|');
    const wordReg = new RegExp('\\b(' + w + ')\\b', 'gi');
    const timeReg = /(20\d{2}.\d{1,2})[\s\n-—]*(20\d{2}.\d{1,2}|至今)/gi;
    const str = pdf.textContent;
    const timeRange = [] as number[][];
    for (let i = 0; i < 50; i++) {
      const o1 = timeReg.exec(str);
      if (o1 === null) {
        break;
      } else {
        let [, start, end] = o1;
        if (end === '至今') {
          end = new Date().toLocaleDateString();
        }
        const t = new Date(end).valueOf() - new Date(start).valueOf();
        const d = new Date(t);
        let y = 0; // 年
        let m = 0; // 月
        let mm = 0;
        if (d) {
          y = d.getFullYear() - 1970;
          m = d.getMonth() + 1;
          mm = y * 12 + m; // 总月数
        }
        timeRange.push([mm, o1.index]);
      }
    }

    for (let i = 0; i < 50; i++) {
      const o2 = wordReg.exec(str);
      if (o2 === null) {
        break;
      } else {
        let [_k] = o2;
        timeRange.find(([mm, index0], j) => {
          const next = timeRange[j + 1] ? timeRange[j + 1][1] : str.length;
          if (o2.index > index0 && o2.index < next) {
            let _mm = mm;
            const k = Object.keys(keywords).find(kw => new RegExp('\\b' + kw + '\\b', 'gi').test(_k));
            const v = keywords[k];
            if (v <= 0.5) {
              _mm = Math.min(mm, 6);
            } else if (v <= 1) {
              _mm = Math.min(mm, 10);
            } else if (v <= 2) {
              _mm = Math.min(mm, 12);
            } else if (v <= 3) {
              _mm = Math.min(mm, 15);
            }
            if (k.includes('vue')) {
              _mm = Math.min(mm, 12);
            }
            scores[k] = Math.max(scores[k], v * _mm / 6);
            mouths[k] = Math.max(mouths[k], mm);
            return true;
          } else {
            return false;
          }
        });

      }
    }

    data.scores = sum(values(scores));
    data.skills = Object.keys(keywords).filter(k => mouths[k] > 0).map((k) => ({
      kw: k.replace(/\(|\)/, '').split('|').shift(),
      age: Number(mouths[k]),
      score: Number(scores[k]),
    }));
    if (scores === 0) {
      data.skills = [];
      data.error = '很遗憾 ，没匹配到关键字！';
    }

  } else {
    data.scores = -1;
    data.skills = [];
    data.error = '此网站已更新，插件过时';
  }
  return data;
}

function onRequest(request: { action: string }, sender: number, sendResponse: (p: TableData) => void) {
  if (request.action === 'process-page') {
    // console.log('☞☞☞ 9527 contentscript 395', extractTags());
    sendResponse(extractTags());
  }
}

ext.runtime.onMessage.addListener(onRequest);

export interface TableData {
  title: string;
  url: string;
  scores: number;
  skills: SkillItem[];
  error: string;
  article: string;
}
