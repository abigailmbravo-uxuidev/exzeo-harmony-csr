import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Prompt } from 'react-router-dom';
import moment from 'moment';
import { reduxForm, Form, propTypes } from 'redux-form';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as cgActions from '../../actions/cgActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const handleGetQuote = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName])
    ? state.cg[state.appState.modelName].data
    : null;
  if (!taskData) return {};
  const quoteEnd = _.find(taskData.model.variables, { name: 'retrieveQuote' })
    ? _.find(taskData.model.variables, { name: 'retrieveQuote' }).value.result
    : {};
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' })
    ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result
    : quoteEnd;
  return quoteData;
};

const handleInitialize = state => ({});

const SearchPanel = props => (
  <div className="toolbar">
    <div className="input-group">
      <div className="btn btn-notes">Notes</div>
      <div className="btn btn-files">Files</div>
    </div>
    { props.searchField }
  </div>
);

/*
TODO:
This will be used to display attachments
Need to set expandableRow in the BootstrapTable component
*/
export const BSTable = props => props.notes ?
    (
      <BootstrapTable data={props.notes}>
        <TableHeaderColumn dataField="fileList" isKey>Attachment List</TableHeaderColumn>
      </BootstrapTable>
    ) : (<p>?</p>);

export const isExpandableRow = (row) => {
  if (row.id < 2) return true;
  return true;
};

export const NoteList = (props) => {
  const { notes } = props;

  const expandComponent = row => (<BSTable data={row.expand} />);
  const options = { searchPanel: props => (<SearchPanel {...props} />) };
  const showCreatedBy = createdBy => createdBy ? `${createdBy.userName}` : '';
  const attachmentCount = attachments => attachments ? `${attachments.length}` : 0;
  const formatCreateDate = createDate => moment.utc(createDate).format('MM/DD/YYYY');

  return (
    <BootstrapTable
      data={Array.isArray(notes) ? notes : []}
      options={options}
      expandableRow={false}
      expandComponent={expandComponent}
      search
    >
      <TableHeaderColumn dataField="_id"isKey hidden>ID</TableHeaderColumn>
      <TableHeaderColumn dataField="attachments" dataFormat={attachmentCount} className="attachmentCount" dataSort dataAlign="center" width="7%"><i className="fa fa-paperclip" aria-hidden="true" /></TableHeaderColumn>
      <TableHeaderColumn dataField="createdDate" dataSort width="10%" dataFormat={formatCreateDate}>Created</TableHeaderColumn>
      <TableHeaderColumn dataField="createdBy" dataSort width="13%" dataFormat={showCreatedBy}>Author</TableHeaderColumn>
      <TableHeaderColumn dataField="content" dataSort tdStyle={{ whiteSpace: 'normal' }} width="45%">Note</TableHeaderColumn>
    </BootstrapTable>
  );
};

export const Files = (props) => {
  const options = { searchPanel: props => (<SearchPanel {...props} />) };
  return (
    <BootstrapTable data={[]} options={options} search>
      <TableHeaderColumn dataField="id" isKey hidden>ID</TableHeaderColumn>
      <TableHeaderColumn dataField="format" dataSort width="10%">Format</TableHeaderColumn>
      <TableHeaderColumn dataField="type" dataSort width="20%">Type</TableHeaderColumn>
      <TableHeaderColumn dataField="fileName" dataSort tdStyle={{ whiteSpace: 'normal' }} width="30%">File Name</TableHeaderColumn>
      <TableHeaderColumn dataField="created" dataSort width="15%">Created</TableHeaderColumn>
      <TableHeaderColumn dataField="author" dataSort width="15%">Author</TableHeaderColumn>
    </BootstrapTable>
  );
};

const handleFormSubmit = (data, dispatch, props) => alert('submit');

export class NotesFiles extends Component {

  componentDidMount() {
    if (this.props.appState.instanceId) {
      this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
        ...this.props.appState.data,
        submitting: true
      });
      const steps = [
    { name: 'hasUserEnteredData', data: { answer: 'No' } },
    { name: 'moveTo', data: { key: 'notes' } }
      ];
      const workflowId = this.props.appState.instanceId;

      this.props.actions.cgActions.batchCompleteTask(this.props.appState.modelName, workflowId, steps)
    .then(() => {
      this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
        ...this.props.appState.data,
        selectedLink: 'notes'
      });
    });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps)) {
      if (nextProps.quoteData && nextProps.quoteData.quoteNumber) {
        const quoteNumber = nextProps.quoteData.quoteNumber;
        this.props.actions.serviceActions.getNotes(quoteNumber);
      }
    }
  }

  render() {
    const { handleSubmit, dirty } = this.props;

    return (
      <QuoteBaseConnect>
        <ClearErrorConnect />
        <Prompt when={dirty} message="Are you sure you want to leave with unsaved changes?" />
        <div className="route-content">
          <div className="scroll">
            <Form id="NotesFiles" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
              <div className="scroll">
                <div className="form-group survey-wrapper" role="group">
                  <h3>History</h3>
                  <section>
                    <div className="notes-list">
                      <NoteList {...this.props} />
                    </div>
                    <div className="file-list" hidden>
                      <Files />
                    </div>
                  </section>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </QuoteBaseConnect>
    );
  }
}

NotesFiles.propTypes = {
  ...propTypes,
  quoteData: PropTypes.shape(),
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  })
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'NotesFiles.values', {}),
  initialValues: handleInitialize(state),
  notes: state.service.notes,
  quoteData: handleGetQuote(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'NotesFiles', enableReinitialize: true })(NotesFiles));
