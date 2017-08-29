import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { reduxForm, Form, propTypes } from 'redux-form';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import PolicyBaseConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import RadioField from '../Form/inputs/RadioField';
import Footer from '../Common/Footer';

const handleGetPolicyData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const policyData = _.find(taskData.model.variables, { name: 'retrievePolicy' }) ? _.find(taskData.model.variables, { name: 'retrievePolicy' }).value[0] : {};
  return policyData;
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
  const attachmentUrl = attachments =>
    attachments.map((attachment) => `<a target="_blank" href="${attachment.fileUrl}">${attachment.fileType}</a>`).join('<br>');
  const formatCreateDate = createDate => moment.utc(createDate).format('MM/DD/YYYY');

  return (
    <div className="note-grid-wrapper">
      <div className="filter-tabs">

        {/*TODO: Eric, just need 2 buttons with an onClick event to filter the grid by attachment count. I added the radio group component because it can have a default selected and user can only choose 1*/}

        <RadioField
          name={'attachmentStatus'} styleName={''} label={''} onChange={function () {}} segmented answers={[
            {
              answer: false,
              label: 'All Notes'
            }, {
              answer: true,
              label: 'Notes With Attachment'
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
        <TableHeaderColumn columnClassName='created-date' dataField="createdDate" dataSort dataField="createdDate" dataFormat={ formatCreateDate } >Created</TableHeaderColumn>
        <TableHeaderColumn className='created-by' columnClassName='created-by' dataField="createdBy" dataSort dataFormat={ showCreatedBy } >Author</TableHeaderColumn>
        <TableHeaderColumn className='note' columnClassName='note' dataField="content" dataSort >Note</TableHeaderColumn>
          {/*TODO:

            Eric, below is the attachment count that we need to filter grid on - basically want to show eveything (count >= 0) or show only attachements (count > 0)

            I added a hidden attribute to this field so it does not show in the UI

            We'll want to default showing all (count >= 0)

            example here: http://allenfang.github.io/react-bootstrap-table/example.html#column-filter   "Programmatically Number Filter"

            */}
        <TableHeaderColumn className='count' columnClassName='count' dataField="attachments" dataFormat={attachmentCount} filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } } hidden ></TableHeaderColumn>
        <TableHeaderColumn className='attachments' columnClassName='attachments' dataField="attachments" dataFormat={attachmentUrl} >Attachments</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

const handleFormSubmit = (data, dispatch, props) => alert('submit');

export class NotesFiles extends Component {

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps)) {
      if (nextProps.policyData && nextProps.policyData.policyNumber) {
        const ids = [nextProps.policyData.policyNumber, nextProps.policyData.sourceNumber];
        this.props.actions.serviceActions.getNotes(ids.toString());
      }
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <PolicyBaseConnect>
        <ClearErrorConnect />
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
        <div className="basic-footer">
          <Footer />
        </div>
      </PolicyBaseConnect>
    );
  }
}

NotesFiles.propTypes = {
  ...propTypes,
  policyData: PropTypes.shape(),
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
  appState: state.appState,
  fieldValues: _.get(state.form, 'NotesFiles.values', {}),
  initialValues: handleInitialize(state),
  notes: state.service.notes,
  policyData: handleGetPolicyData(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'NotesFiles', enableReinitialize: true })(NotesFiles));
