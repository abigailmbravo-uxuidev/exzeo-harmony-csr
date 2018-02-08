import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as serviceActions from '../../actions/serviceActions';
import QuoteBaseConnect from '../../containers/Quote';
import * as errorActions from '../../actions/errorActions';
import NoteList from '../Common/NoteList';
import Footer from '../Common/Footer';

export class NotesFiles extends Component {

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps)) {
      if (nextProps.quoteData && nextProps.quoteData.quoteNumber) {
        const quoteNumber = nextProps.quoteData.quoteNumber;
        this.props.actions.serviceActions.getNotes(quoteNumber);
      }
    }
  }

  render() {

    return (
      <QuoteBaseConnect>
        <div className="route-content">
          <div className="scroll">
            <NoteList {...this.props} />
          </div>
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </QuoteBaseConnect>
    );
  }
}

NotesFiles.propTypes = {
  quoteData: PropTypes.shape(),
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  notes: state.service.notes,
  quoteData: state.service.quote || {},
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesFiles);
