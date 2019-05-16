import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Notes from './Notes';
import DiaryTable from './DiaryTable';

const NOTE_TABS = ['notes', 'files'];
const DIARY_TAB = 'diaries';

export class NoteList extends Component {
  state = { historyTab: 'notes' };
  setHistoryTab = name => this.setState({ historyTab: name });

  render() {
    const { historyTab } = this.state;
    const { customHandlers, diaries, notes } = this.props;
    return (
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3>History</h3>
            <section>
              <div className="notes-list">
                <div className="note-grid-wrapper btn-tabs">
                  <div className="filter-tabs">
                    <button type="button" className={`btn btn-tab ${historyTab === 'notes' ? 'selected' : ''}`} onClick={() => this.setHistoryTab('notes')}>Notes</button>
                    <button type="button" className={`btn btn-tab ${historyTab === 'files' ? 'selected' : ''}`} onClick={() => this.setHistoryTab('files')}>Files</button>
                    <button type="button" className={`btn btn-tab ${historyTab === 'diaries' ? 'selected' : ''}`} onClick={() => this.setHistoryTab('diaries')}>Diaries</button>
                  </div>
                  {NOTE_TABS.includes(this.state.historyTab) && <Notes notes={notes} customHandlers={customHandlers} attachmentStatus={this.state.historyTab === 'files'} />}
                  {this.state.historyTab === DIARY_TAB && <DiaryTable customHandlers={customHandlers} diaries={diaries} />}
                </div>
              </div>
            </section>
          </div>
        </div>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.array,
  diaries: PropTypes.array
};

NoteList.defaultProps = {
  notes: [],
  diaries: []
};

export default NoteList;
