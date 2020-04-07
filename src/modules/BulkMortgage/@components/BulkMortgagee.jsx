import React, { useState } from 'react';
import classNames from 'classnames';
import {
  DIARY_TAB,
  FILES_TAB,
  NOTE_TAB,
  NOTE_TYPE
} from '../../NotesFiles/constants';
import Notes from '../../NotesFiles/@components/Notes';
import DiaryTable from '../../NotesFiles/@components/DiaryTable';
import { BULK_TYPE, BULK_TYPE_LABEL } from '../constants';
import MortgageeForm from './MortgageeForm';
import { noop } from '@exzeo/core-ui';

const style = {
  display: 'flex',
  overflowX: 'hidden',
  overflowY: 'auto'
};

const BulkMortgagee = props => {
  const [selectedTab, setSelectedTab] = useState(BULK_TYPE.policy);
  return (
    <div className="content-wrapper">
      <div className="scroll view-grid" style={style}>
        <h3>Bulk Mortgagee</h3>
        <div className="form-group survey-wrapper" role="group">
          <section className="section-select-type view-col-4">
            <div className="bulk-mortgagee-wrapper btn-tabs">
              <div className="filter-tabs">
                <button
                  type="button"
                  className={classNames('btn btn-tab', {
                    selected: selectedTab === BULK_TYPE.policy
                  })}
                  onClick={() => setSelectedTab(BULK_TYPE.policy)}
                >
                  {BULK_TYPE_LABEL.policy}
                </button>
                <button
                  type="button"
                  className={classNames('btn btn-tab', {
                    selected: selectedTab === BULK_TYPE.mortgagee
                  })}
                  onClick={() => setSelectedTab(BULK_TYPE.mortgagee)}
                >
                  {BULK_TYPE_LABEL.mortgagee}
                </button>
              </div>
              {selectedTab === BULK_TYPE.policy && (
                <section className="section-select-type view-col-12">
                  <MortgageeForm handleFormSubmit={noop} />
                </section>
              )}
              {selectedTab === BULK_TYPE.mortgagee && (
                <div>{BULK_TYPE_LABEL.mortgagee}</div>
              )}
            </div>
          </section>
          <section className="section-select-type view-col-8">
            Search Filter By Policy
          </section>
        </div>
      </div>
    </div>
  );
};

export default BulkMortgagee;
