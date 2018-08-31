import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Loader from '@exzeo/core-ui/lib/Loader';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';

import { fetchDiaries } from '../state/actions/diaryActions';
import * as appStateActions from '../state/actions/appStateActions';
import * as serviceActions from '../state/actions/serviceActions';
import * as uiActions from '../state/actions/uiActions';
import * as errorActions from '../state/actions/errorActions';
import * as serviceRunner from '../utilities/serviceRunner';
import { REASONS, TYPES, USERS } from '../constants/diaries';

const { Date, Select } = Inputs;
const { validation } = lifecycle;

const validate = values => (!values.message ? { message: 'Message Required' } : false);

export const TextArea = ({
  input, label, type, meta: { touched, error }
}) => (
  <div className={`${touched && error ? 'error' : ''} text-area-wrapper`}>
    <textarea {...input} placeholder={label} rows="10" cols="40" />
    {touched && error && <span className="error-message">{error}</span>}
  </div>
);

export class DiaryModal extends Component {
  state = { minimize: false };

  componentDidMount() {
    const { actions, user } = this.props;
    if (!user.profile || !user.profile.given_name || !user.profile.family_name) {
      const message = 'There was a problem with your user profile. Please logout of Harmony and try logging in again.';
      this.closeButtonHandler();
      actions.errorActions.setAppError({ message });
    }
  }

  handleMinimize = () => this.setState({ minimize: !this.state.minimize });

  handleClose = () => this.props.actions.uiActions.toggleDiary({});

  submitDiary = async (data, dispatch, props) => {
    const {
      user, resourceType, resourceId, initialValues, fetchDiariesAction
    } = props;

    const assignee = data.assignee.value;

    // TODO: Get Users from collection and select based on userId
    data.assignee.userName = 'tticcsr';

    // TODO: Move this logic into diary actions / utils
    let createRequest = {};

    if (initialValues && initialValues.diaryId) {
      createRequest = {
        service: 'diaries',
        method: 'POST',
        path: `update/${initialValues.diaryId}`,
        data: {
          resource: { type: resourceType, id: resourceId },
          entry: data,
          user: { userId: user.userId, userName: user.userName }
        }
      };
    } else {
      createRequest = {
        service: 'diaries',
        method: 'POST',
        path: 'create',
        data: {
          resource: { type: resourceType, id: resourceId },
          entry: data,
          user: { userId: user.userId, userName: user.userName }
        }
      };
    }

    try {
      await serviceRunner.callService(createRequest);
      await fetchDiariesAction({ userName: user.userName, resourceType, resourceId });
      this.handleClose();
    } catch (error) {
      this.handleClose();
    }
  }

  render() {
    return (
      <div className={this.state.minimize ? 'new-note-file minimize' : 'new-note-file new-diary-file'} >
        <div className="title-bar">
          <div className="title title-minimize-button" onClick={this.handleMinimize}>Diary</div>
          <div className="controls note-file-header-button-group">
            <button
              className="btn btn-icon minimize-button"
              type="button"
              onClick={this.handleMinimize}>
              <i className="fa fa-window-minimize" aria-hidden="true" />
            </button>
            <button
              className="btn btn-icon header-cancel-button"
              type="submit"
              onClick={this.handleMinimize} >
              <i className="fa fa-times-circle" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="mainContainer">
          {this.props.submitting && <Loader />}
          <form id="DiaryModal" onSubmit={this.props.handleSubmit(this.submitDiary)} >
            <div className="content">
              <Field
                name="type"
                label="Type"
                component={Select}
                answers={TYPES}
                validate={validation.isRequired}
                dataTest="diaryType" />
              <Field
                name="assignee"
                label="Assignee"
                component={Select}
                answers={USERS}
                validate={validation.isRequired}
                dataTest="assignee" />
              <Field
                name="due"
                label="Due Date"
                component={Date}
                validate={[validation.isRequired, validation.isDate]}
                dataTest="due" />
              <Field
                name="reason"
                label="Reason"
                component={Select}
                answers={REASONS}
                validate={validation.isRequired}
                dataTest="reason" />
              <label>Message</label>
              <Field
                name="message"
                component={TextArea}
                label="Message" />
            </div>
            <div className="buttons note-file-footer-button-group">
              <button
                tabIndex="0"
                aria-label="cancel-btn form-newNote"
                className="btn btn-secondary cancel-button"
                onClick={this.handleClose}>
                Cancel
              </button>
              <button
                tabIndex="0"
                aria-label="submit-btn form-newNote"
                className="btn btn-primary submit-button">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

DiaryModal.propTypes = {
  documentId: PropTypes.string
};

const mapStateToProps = state => ({
  user: state.authState.userProfile
});

const mapDispatchToProps = dispatch => ({
  fetchDiariesAction: fetchDiaries,
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    uiActions: bindActionCreators(uiActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'DiaryModal',
  validate
})(DiaryModal));
