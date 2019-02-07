import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loader } from '@exzeo/core-ui';
import moment from 'moment';

import * as serviceRunner from '../../utilities/serviceRunner';
//import { getNotes } from '../../../state/actions/service.actions';
import NoteList from './NoteList';
import Footer from './Footer';

async function getNotes(noteId, sourceId) {
  //{ quoteNumber, policyNumber, sourceNumber, agencyId, agentId }
  const reduceId = id => id.replace(/(\d{2}-\d{7})-\d{2}/g, (_, group) => group);
  const query = sourceId ? reduceId(`${noteId},${sourceId}`) : reduceId(noteId);

  try {
    const [notes, docsResult] = await Promise.all([
      fetch({ service: 'transaction-logs', path: `history?number=${noteId}` }),
      fetch({ service: 'file-index', path: `v1/fileindex/${noteId}` })
    ]);

    const fileList = notes.reduce((list, note) => [...list, ...note.attachments], []).map(n => n.fileUrl);

    docsResult.forEach((doc) => {
      if (!fileList.includes(doc.fileUrl)) {
        const newNote = {
          _id: doc.envelopeId ? doc.envelopeId : doc.fileUrl,
          contactType: 'system',
          createdBy: { userName: 'System', userId: doc.createdBy },
          createdDate: moment.unix(doc.createdDate),
          attachments: [
            {
              fileType: 'System',
              fileName: doc.fileName,
              fileUrl: doc.fileUrl
            }
          ]
        };
        notes.push(newNote);
      }
    });
    return notes;
  } catch (error) {
    throw error
  }
};

const fetch = async ({ service, method = 'GET', path }) => {
  const opts = { service, method, path };

  try {
    const response = await serviceRunner.callService(opts);
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}

export class Notes extends Component {
  state = {
    isLoading: true,
    notes: []
  }

  async componentDidMount() {
    const { agencyCode, entity } = this.props;
    const n = await getNotes(agencyCode)
      .catch(err => {
        console.log(err)
      });
    console.log('all done:', n)
    this.setState({ isLoading: false });
  }

  render() {
    const { error } = this.props;
    const { isLoading, notes } = this.state;
    console.log('rendering...')
    return (
      <React.Fragment>
        <div className="route-content">

          {isLoading && <Loader />}

          <div className="scroll">
            <NoteList {...this.props} />
          </div>
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

Notes.propTypes = {
  errorActions: PropTypes.shape({
    setAppError: PropTypes.func.isRequired
  }),
  query: PropTypes.object
};

export default Notes;
