import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loader } from '@exzeo/core-ui';
import moment from 'moment';
import axios from 'axios';

import { callService } from '../../utilities/serviceRunner';
import NoteList from './NoteList';
import Footer from './Footer';

const getNotes = async (numbers, type) => {

  const axiosConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: `${process.env.REACT_APP_API_URL}/svc`,
    data: {
      exchangeName: 'harmony', 
      routingKey: 'harmony.note.getNotes', 
      data: {
        data: [
          { number: numbers, numberType: 'agencyCode' }
        ]
      }
    }
  };

  try {
    const response = await axios(axiosConfig);
    return response.data.result;
  } catch (error) {
    console.log('e: ', error)
  }
};

export class Notes extends Component {
  state = {
    isLoading: true,
    notes: []
  }

  componentDidMount() {
    const { agencyCode, entity } = this.props;
    getNotes(agencyCode)

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
