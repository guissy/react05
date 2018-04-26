import { sum, values } from 'lodash';
import ext from './utils/ext';
import { SkillItem } from './ScoreTable';
import { KeywordItem, Tree, WorkDate } from './keywords';
import { db } from './keywords.data';

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

  parse51job(data, new Tree<KeywordItem>(db));
  // parseLagou(data, keywords, db);

  const descriptionTag = document.querySelector('meta[property*=description]');
  if (descriptionTag) {
    data.article = descriptionTag.getAttribute('content');
  }

  return data;
}

function calcWorkDate(start: string, end: string): WorkDate {
  let startDate = new Date(start);
  let endDate = end === '至今' ? new Date() : new Date(end);
  endDate.setDate(30);
  return {
    startDate,
    endDate,
  };
}

function parse51job(data: TableData, keywords: Tree<KeywordItem>): TableData {
  if (!document.URL.includes('51job.com')) {
    data.error = '目标网址不是 51job.com ';
    data.scores = 0;
    data.skills = [];
  } else {
    // 目录：工作经验、项目经验等
    const dir = Array.from(document.querySelectorAll('.plate1'));
    let scores = 0;
    if (dir) {
      Array.from(document.querySelectorAll('.tbb>table>tbody>tr'))
        .forEach((tr: HTMLTableRowElement) => {
          const time = tr.querySelector('.time') as HTMLSpanElement;
          // 时间段
          let [start, end] = time ? time.textContent.split('-') : ['0', '0'];
          const workDate = calcWorkDate(start, end);

          // 内容
          const elm = Array.from(tr.querySelectorAll('.txt1')).pop() as HTMLTableCellElement;
          workDate.workContent = elm ? elm.textContent : '';
          keywords.work(workDate);
        });
      scores = keywords.calc(keywords.items);
      data.scores = scores;
      data.skills = Array.from(keywords)
        .filter(({ gained }) => gained > 0)
        .map(({ gained, months }) => ({
          age: months,
          score: gained,
          kw: name,
        }));
    }

    if (data.scores === 0) {
      data.error = '很遗憾，没匹配到关键字！';
    }
    data.article = '...';
  }
  return data;
}
function parseLagou(data: TableData, keywords: Tree<KeywordItem>): TableData {
  if (!document.URL.includes('lagou')) {
    data.error = '目标网址不是 lagou ';
    data.scores = 0;
    data.skills = [];
  } else {
    // 目录：工作经验、项目经验等
    const dir = document.querySelectorAll('.mr_jobe_list');
    let scores = 0;
    if (dir) {
      Array.from(dir).forEach((td: HTMLTableCellElement) => {
        const content = td.querySelector('.mr_content_m');
        if (content) {
          const time = td.querySelector('.mr_content_r') as HTMLSpanElement;
          let timeStr = time.textContent;
          timeStr = timeStr.replace(/\s/g, '');
          timeStr = timeStr.replace(/\./g, '/');
          timeStr = timeStr.replace(/-/g, '—');
          // 时间段
          let [start, end] = time ? timeStr.split('-') : ['0', '0'];
          const workDate = calcWorkDate(start, end);

          // 内容
          const elm = Array.from(td.querySelectorAll('.mr_content_m')).pop() as HTMLTableCellElement;
          workDate.workContent = elm ? elm.textContent : '';
          keywords.work(workDate);
        }
      });
      scores = keywords.calc(keywords.items);
      data.scores = scores;
      data.skills = Array.from(keywords)
        .filter(({ gained }) => gained > 0)
        .map(({ gained, months }) => ({
          age: months,
          score: gained,
          kw: name,
        }));
    }

    if (data.scores === 0) {
      data.error = '很遗憾，没匹配到关键字！';
    }
    data.article = '...';
  }
  return data;
}
function parseLagouPdf(data: TableData, keywords: Tree<KeywordItem>): TableData {
  if (!document.URL.includes('lagou')) {
    data.error = '目标网址不是 lagou ';
    data.scores = 0;
    data.skills = [];
  } else {
    // 目录：工作经验、项目经验等
    const pdf = document.querySelector('.preview-doc') as HTMLElement;
    let scores = 0;
    if (pdf) {
      const timeReg = /(20\d{2}.\d{1,2})[\s\n-—]*(20\d{2}.\d{1,2}|至今)/gi;
      const str = pdf.textContent;
      let timeMatch;
      let workDateIndex = [] as [WorkDate, number][];
      while ((timeMatch = timeReg.exec(str)) != null)  {
        let [timeStr, start, end] = timeMatch;
        const workDate = calcWorkDate(start, end);
        workDateIndex.push([workDate, timeMatch.index + timeStr.length]);
      }
      workDateIndex.reduce(
        ([workDatePrev, indexPrev], [workDate, index]) => {
          if (workDatePrev) {
            // 内容
            workDate.workContent = str.slice(indexPrev, index);
            keywords.work(workDate);
          }
          return [workDate, index];
        },
        [null, null]
      );

      scores = keywords.calc(keywords.items);
      data.scores = scores;
      data.skills = Array.from(keywords)
        .filter(({ gained }) => gained > 0)
        .map(({ gained, months }) => ({
          age: months,
          score: gained,
          kw: name,
        }));
    }

    if (data.scores === 0) {
      data.error = '很遗憾，没匹配到关键字！';
    }
    data.article = '...';
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
