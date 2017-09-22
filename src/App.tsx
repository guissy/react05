import * as React from 'react';
import ScoreTable, { ScoreTableProps, SkillItem } from './ScoreTable';
import ext from './utils/ext';

class App extends React.Component<{}, ScoreTableProps> {
  constructor() {
    super();
    this.state = {
      article: 'loading...',
      skills: [] as SkillItem[],
      scores: 0,
      lines: [80],
    };
    ext.tabs.query({active: true, currentWindow: true}, (tabs: {id: number}[]) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'process-page' }, (data) => {
        if (data) {
          this.setState(data);
        } else {
          this.setState({ article: 'Ooops, 需要重新刷新此页面！' });
        }
      });
    });
  }
  render() {
    return (
      <div className="app">
        <h3 className="app-header">简历筛选神器</h3>

        <main>
          <ScoreTable
            article={this.state.article}
            skills={this.state.skills}
            scores={this.state.scores}
            lines={this.state.lines}
          />
        </main>

        <footer>
          <p>
            <small>
              v 1.0
              <a href="#" className="js-options" style={{display: 'none'}}>
                Options
              </a>
            </small>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
