import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import Loader from '@exzeo/core-ui/lib/Loader';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
import * as appStateActions from '../../state/actions/appStateActions';
import * as serviceActions from '../../state/actions/serviceActions';
import * as uiActions from '../../state/actions/uiActions';
import * as errorActions from '../../state/actions/errorActions';
import * as serviceRunner from '../../utilities/serviceRunner';

const { Date, Select } = Inputs;
const { validation } = lifecycle;

const validate = values => !values.message ? { message: 'Message Required' } : false;

export const renderMessage = ({ input, label, type, meta: { touched, error } }) => (
  <div className={`${touched && error ? 'error' : ''} text-area-wrapper`}>
    <textarea {...input} placeholder={label} rows="10" cols="40" />
    { touched && error && <span className="error-message">{ error }</span> }
  </div>
);

export class CreateDiary extends Component {
  state = { minimize: false }

  minimzeButtonHandler = () => this.setState({ minimize: !this.state.minimize })

  closeButtonHandler = () => this.props.actions.uiActions.toggleDiary({})

  submitDiary = async (data, dispatch, props) => {
    const { user, resourceType, resourceId } = props;

    const createRequest = {
      service: 'diaries',
      method: 'POST',
      path: 'create',
      data: {
        resource: { type: resourceType, id: resourceId },
        entry: data,
        user: { userId: user.userId, userName: user.userName }
      }
    };

    try {
      const response = await serviceRunner.callService(createRequest);
      console.log(response)
      this.closeButtonHandler();
    } catch (error) {
      console.log(error)
      this.closeButtonHandler();
    }
  }

  componentDidMount() {
    const { actions, user } = this.props;
    if (!user.profile || !user.profile.given_name || !user.profile.family_name) {
      const message = 'There was a problem with your user profile. Please logout of Harmony and try logging in again.';
      this.closeButtonHandler();
      actions.errorActions.setAppError({ message });
      return false;
    }
  }

  users = [
    { userId: '59419e3a43e76f16f68c3349', userName: 'tticcsr' }
  ].map(user => ({ answer: user.userId, label: user.userName }))

  diaryTypes = [
    'Additional Interest',
    'Billing',
    'Cancellation',
    'Coverage Endorsement',
    'Estate',
    'Follow-up',
    'Home/Location Endorsement',
    'Inspection',
    'Mailing Address',
    'Needs Security',
    'New Policy',
    'Occupancy',
    'Ownership Change',
    'Policyholder Endorsement',
    'Property Address',
    'Reinstatement',
    'Wind Mitigation'
  ].map(type => ({ answer: type, label: type }))

  diaryReasons = [
    'N/A',
    'Billing',
    'DocuSign Expiring',
    'Estate',
    'Follow-up',
    'Inspection',
    'Needs Security',
    'New Policy',
    'No response',
    'Occupancy',
    'Order Inspection',
    'Other',
    'Ownership Change',
    'Reinstatement',
    'Underwriting Condition Letter',
    'Vacant'
  ].map(reason => ({ answer: reason, label: reason }))

  render() {
    return (
      <div className={this.state.minimize ? 'new-note-file minimize' : 'new-note-file new-diary-file'} >
        <div className="title-bar">
          <div className="title title-minimze-button" onClick={() => this.minimzeButtonHandler()}>Diary</div>
          <div className="controls note-file-header-button-group">
            <button className="btn btn-icon minimize-button" onClick={() => this.minimzeButtonHandler()}><i className="fa fa-window-minimize" aria-hidden="true" /></button>
            <button className="btn btn-icon header-cancel-button" onClick={this.closeButtonHandler} type="submit"><i className="fa fa-times-circle" aria-hidden="true" /></button>
          </div>
        </div>
        <div className="mainContainer">
          {this.props.submitting && <Loader />}
          <Form id="CreateDiary" onSubmit={this.props.handleSubmit(this.submitDiary)} noValidate>
            <div className="content">
              <Field
                name="type"
                label="Type"
                component={Select}
                answers={this.diaryTypes}
                validate={validation.isRequired}
                dataTest="diaryType"
              />
              <Field
                name="assignee"
                label="Assignee"
                component={Select}
                answers={this.users}
                validate={validation.isRequired}
                dataTest="assignee"
              />
              <Field
                name="due"
                label="Due Date"
                component={Date}
                validate={[validation.isRequired, validation.isDate]}
                dataTest="due"
              />
              <Field
                name="reason"
                label="Reason"
                component={Select}
                answers={this.diaryReasons}
                validate={validation.isRequired}
                dataTest="reason"
              />
              <label>Message</label>
              <Field name="message" component={renderMessage} label="Message" />
            </div>
            <div className="buttons note-file-footer-button-group">
              <button tabIndex="0" aria-label="cancel-btn form-newNote" className="btn btn-secondary cancel-button" onClick={this.closeButtonHandler}>Cancel</button>
              <button tabIndex="0" aria-label="submit-btn form-newNote" className="btn btn-primary submit-button">Save</button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

CreateDiary.propTypes = {
  documentId: PropTypes.string
};

const mapStateToProps = state => ({
  user: state.authState.userProfile
});

const mapDispatchToProps = dispatch => ({
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    uiActions: bindActionCreators(uiActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'CreateDiary',
  validate
})(CreateDiary));
