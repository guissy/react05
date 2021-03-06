import * as React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table/Column';
// import './ScoreTable.css';

export default class ScoreTable extends React.PureComponent<ScoreTableProps, {}> {
  columns: ColumnProps<SkillItem>[];

  constructor(props: ScoreTableProps) {
    super();
    this.state = {};
    this.columns = [
      { title: '关键字', dataIndex: 'kw' },
      { title: '时长', dataIndex: 'age', render(val: number) {return val + '月'} },
      { title: '得分', dataIndex: 'score', render(val: number){ return val.toFixed(1)} },
    ];
  }

  public render() {
    const data = this.props;
    return (
      <div className="site-description">
        <p className="tops">
          总分：<span className="scores">
            <strong style={{ color: data.scores > data.lines.slice().pop() ? '#F00' : '#808080' }}>
              {data.scores.toFixed(1)}
            </strong>
          </span>
        </p>
        <div>
          {data.scores > 0 ?
            <Table
              size="small"
              columns={this.columns}
              dataSource={data.skills as SkillItem[]}
              pagination={false}
              rowKey={(v, i) => i.toString()}
              bordered={true}
            /> :
            <p>很遗憾，没匹配到关键字！</p>
          }
        </div>
        <small>{data.article}</small>
      </div>

    );
  }
}

export interface ScoreTableProps {
  article: string;
  scores: number; // 总分
  lines: number[]; // 分级从高到低为A,B,C
  skills: SkillItem[];
}

export interface SkillItem {
  kw: string;
  age: number;
  score: number;
}
