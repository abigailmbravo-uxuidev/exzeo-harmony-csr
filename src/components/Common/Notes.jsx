import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loader } from '@exzeo/core-ui';
import moment from 'moment';

import { callService } from '../../utilities/serviceRunner';
import NoteList from './NoteList';
import Footer from './Footer';

const getNotes = async (agencyCode) => {
  const data = { service: 'notes', method: 'GET', path: `v1/notes/?agencyCode=${agencyCode}` }
  try {
   const response = await callService(data);
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error
  }
};

export class Notes extends Component {
  state = {
    isLoading: true,
    notes: []
  }

  async componentDidMount() {
    const { agencyCode, entity } = this.props;
    await getNotes(agencyCode)
      .catch(err => {
        console.log(err)
      });

    this.setState({ isLoading: false });
  }

  render() {
    const { error } = this.props;
    const { isLoading, notes } = this.state;

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
