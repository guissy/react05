import * as React from 'react';
import { Button } from 'antd';
// import './App.css';
import ScoreTable from './ScoreTable';
import ext from './utils/ext';

class App extends React.Component<{}, {article: string}> {
  constructor() {
    super();
    this.state = {
      article: 'loading...',
    };
    ext.tabs.query({active: true, currentWindow: true}, (tabs: any[]) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'process-page' }, (data) => {
        var displayContainer = document.getElementById('display-container');
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
          <ScoreTable article={this.state.article} lines={[80]} scores={90} />
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
