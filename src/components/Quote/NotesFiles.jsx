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
import RadioField from '../Form/inputs/RadioField';
import Downloader from '../Common/Downloader';

const handleGetQuote = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const quoteEnd = _.find(taskData.model.variables, { name: 'retrieveQuote' }) ? _.find(taskData.model.variables, { name: 'retrieveQuote' }).value.result : {};
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }) ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result : quoteEnd;
  return quoteData;
};

const handleInitialize = state => ({});

const SearchPanel = props => (
  <div className="search">
    <label>Search by Note Text</label>
    { props.searchField }
  </div>
);

export const NoteList = (props) => {
  const { notes } = props;
  const options = { searchPanel: props => (<SearchPanel {...props} />) };
  const showCreatedBy = createdBy => createdBy ? `${createdBy.userName}` : '';
  const attachmentCount = attachments => attachments ? `${attachments.length}` : 0;
  
  const formatCreateDate = createDate => moment.utc(createDate).format('MM/DD/YYYY');

  const attachmentUrl = attachments => (
    <span>
      { attachments.map((attachment, i) => 
        <Downloader 
          filename={attachment.fileName} 
          fileUrl={attachment.fileUrl} 
          fileType={attachment.fileType} 
          key={i}
        />
      )}
    </span>
  )

  return (
    <div className="note-grid-wrapper">
      <div className="filter-tabs">

        {/*TODO: Eric, just need 2 buttons with an onClick event to filter the grid by attachment count. I added the radio group component because it can have a default selected and user can only choose 1*/}

        <RadioField
          name={'attachmentStatus'} styleName={''} label={''} onChange={ () => {} } segmented answers={[
            {
              answer: false,
              label: 'All Notes'
            }, 
            {
              answer: true,
              label: 'Attachments'
            }
          ]}
        />
      </div>
      <BootstrapTable
        data={Array.isArray(notes) ? notes : []}
        options={options}
        search
      >
        <TableHeaderColumn dataField="_id"isKey hidden>ID</TableHeaderColumn>
        <TableHeaderColumn className='created-date' columnClassName='created-date' dataField="createdDate" dataSort dataFormat={formatCreateDate} >Created</TableHeaderColumn>
        <TableHeaderColumn className='created-by' columnClassName='created-by' dataField="createdBy" dataSort dataFormat={showCreatedBy} >Author</TableHeaderColumn>
        {/*TODO: Hide note-type and note column when users filters grid to show only notes with attachments*/}
        <TableHeaderColumn className='note-type' columnClassName='note-type' dataField="contactType" dataSort >Note Type</TableHeaderColumn>
        <TableHeaderColumn className='note' columnClassName='note' dataField="content" dataSort >Note</TableHeaderColumn>
        {/*TODO:

          Eric, below is the attachment count that we need to filter grid on - basically want to show eveything (count >= 0) or show only attachements (count > 0)

          I added a hidden attribute to this field so it does not show in the UI

          We'll want to default showing all (count >= 0)

          example here: http://allenfang.github.io/react-bootstrap-table/example.html#column-filter   "Programmatically Number Filter"

          ultimate goal would be to add a class to the grid wrapper div (currently has class "note-grid-wrapper") when filtered. I can handle hiding the columns and hide the search with CSS. If added class is named "filter-attachments" css will be ready.

          thanks!

          */}
        <TableHeaderColumn className='count' columnClassName='count' dataField="attachments" dataFormat={attachmentCount} filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden ></TableHeaderColumn>
        <TableHeaderColumn className='attachments' columnClassName='attachments' dataField="attachments" dataFormat={attachmentUrl} dataSort >Attachments</TableHeaderColumn>
      </BootstrapTable>
    </div>
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
