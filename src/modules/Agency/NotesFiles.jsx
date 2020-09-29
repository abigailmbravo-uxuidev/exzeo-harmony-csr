import React from 'react';
import { connect } from 'react-redux';

import { fetchNotes } from '../../state/actions/notes.actions';
import { setAppError } from '../../state/actions/error.actions';
import Notes from '../../modules/NotesFiles';
import Footer from '../../components/Footer';

const NotesFiles = ({ agencyCode, notesSynced, setAppError }) => {
  return (
    <React.Fragment>
      <div className="route-content">
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3>History</h3>
            <section>
              <Notes
                customHandlers={{ setAppError, notesSynced }}
                initialValues={{
                  sourceType: 'agencyCode',
                  sourceNumbers: [agencyCode]
                }}
              />
            </section>
          </div>
        </div>
      </div>
      <div className="basic-footer">
        <Footer />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  notes: state.notes,
  policy: state.policyState.policy,
  notesSynced: state.ui.notesSynced
});

export default connect(mapStateToProps, {
  fetchNotes,
  setAppError
})(NotesFiles);
