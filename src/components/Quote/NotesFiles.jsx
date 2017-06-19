import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, Form, propTypes } from 'redux-form';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const handleGetQuote = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }) ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result : {};
  return quoteData;
};

const SearchPanel = (props) => {
  return (
    <div className="toolbar">
    <div className='input-group'>
      <div className="btn btn-notes">Notes</div>
      <div className="btn btn-files">Files</div>
    </div>
    { props.searchField }
    </div>
  );
}

const BSTable = (props) => {
  return props.notes ?
    (
      <BootstrapTable data={ props.notes }>
        <TableHeaderColumn dataField='fileList' isKey={ true }>Attachment List</TableHeaderColumn>
      </BootstrapTable>
    ) : (<p>?</p>)
}

const NoteList = (props) => {
  const { notes } = props;

  const isExpandableRow = (row) => {
    if (row.id < 2) return true;
    else return true;
  };

  const expandComponent = (row) => {
    return (
      <BSTable data={ row.expand } />
    );
  };

  const options = { searchPanel: (props) => (<SearchPanel { ...props }/>) };

  return (
    <BootstrapTable data={ notes ? notes : [] }
      options={ options }
      expandableRow={ isExpandableRow }
      expandComponent={ expandComponent }
      search>
      <TableHeaderColumn dataField='_id'isKey hidden>ID</TableHeaderColumn>
      <TableHeaderColumn dataField='attachmentCount' className="attachmentCount" dataSort={ true } dataAlign="center" width='7%'><i className="fa fa-paperclip" aria-hidden="true"></i></TableHeaderColumn>
      <TableHeaderColumn dataField='createdAt' dataSort={ true } width='10%'>Created</TableHeaderColumn>
      <TableHeaderColumn dataField='createdBy' dataSort={ true } width='13%'>Author</TableHeaderColumn>
      <TableHeaderColumn dataField='noteContent' dataSort={ true } tdStyle={ { whiteSpace: 'normal' } } width='45%'>Note</TableHeaderColumn>
    </BootstrapTable>
  );
}

const Files = (props) => {
  const options = { searchPanel: (props) => (<SearchPanel { ...props }/>) };
  return (
    <BootstrapTable data={ [] } options={ options } search>
      <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
      <TableHeaderColumn dataField='format' dataSort={ true } width='10%'>Format</TableHeaderColumn>
      <TableHeaderColumn dataField='type' dataSort={ true } width='20%'>Type</TableHeaderColumn>
      <TableHeaderColumn dataField='fileName' dataSort={ true } tdStyle={ { whiteSpace: 'normal' } } width='30%'>File Name</TableHeaderColumn>
      <TableHeaderColumn dataField='created' dataSort={ true } width='15%'>Created</TableHeaderColumn>
      <TableHeaderColumn dataField='author' dataSort={ true } width='15%'>Author</TableHeaderColumn>
    </BootstrapTable>
  );
}

const handleFormSubmit = (data, dispatch, props) => alert('submit');

export class NotesFiles extends Component {
  componentWillMount() {
    if (this.props.quoteData && this.props.quoteData.quoteNumber) {
      const quoteNumber = this.props.quoteData.quoteNumber;
      this.props.actions.serviceActions.getNotes('quoteNumber', quoteNumber);
    }   
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <QuoteBaseConnect>
        <ClearErrorConnect/>
        <div className="route-content">
          <Form id="NotesFiles" onSubmit={ handleSubmit(handleFormSubmit) } noValidate>
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h3>History</h3>
                <section>
                  <div className="notes-list">
                    <NoteList  {...this.props} />
                  </div>
                  <div className="file-list" hidden>
                    <Files />
                  </div>
                </section>
              </div>
            </div>
          </Form>
        </div>
      </QuoteBaseConnect>
    );
  }
};

NotesFiles.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({submitting: PropTypes.boolean})
  })
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = (state) => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'NotesFiles.values', {}),
  quoteData: handleGetQuote(state),
  notes: state.service.notes
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'NotesFiles'
})(NotesFiles));
