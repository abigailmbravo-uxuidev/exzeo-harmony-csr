import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Loader from '@exzeo/core-ui/lib/Loader';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';

const { Input, Select, Date } = Inputs;
const { validation, normalize } = lifecycle;

const typeAnswers = [
  { answer: 'Additional Interest', label: 'Additional Interest' },
  { answer: 'Billing /Payment', label: 'Billing /Payment' }
];

const assigneeAnswers = [
  { answer: 'jsutphin', label: 'jsutphin' },
  { answer: 'jDoe', label: 'jDoe' },
  { answer: 'jSmith', label: 'jSmith' }
];

const reasonAnswers = [
  { answer: 'Follow-up', label: 'Follow-up' },
  { answer: 'Receipt Needed', label: 'Receipt Needed' },
  { answer: 'Some other reason', label: 'Some other reason' }
];

export class DiaryModal extends Component {
  state = { minimize: false }
  minimzeButtonHandler = () => this.setState({ minimize: !this.state.minimize })

  submitDiary = () => {
    this.props.closeHandler();
  }

  render() {
    const { closeHandler, handleSubmit } = this.props;
    return (
      <div className={this.state.minimize ? 'new-note-file minimize' : 'new-note-file'} >
        <div className="title-bar">
          <div className="title title-minimze-button">Diary</div>
          <div className="controls note-file-header-button-group">
            <button type="button" className="btn btn-icon minimize-button" onClick={() => this.minimzeButtonHandler(this.props)}><i className="fa fa-window-minimize" aria-hidden="true" /></button>
            <button type="button" className="btn btn-icon header-cancel-button" onClick={closeHandler}><i className="fa fa-times-circle" aria-hidden="true" /></button>
          </div>
        </div>
        <div className="mainContainer">
          {this.props.submitting && <Loader />}
          <form id="Diary" onSubmit={handleSubmit(this.submitDiary)}>
            <div className="content">
              <Field
                name="type"
                label="Type"
                component={Select}
                validate={validation.isRequired}
                dataTest="type"
                answers={typeAnswers}
              />
              <Field
                name="assignee"
                label="Assignee"
                component={Select}
                validate={validation.isRequired}
                dataTest="assignee"
                answers={assigneeAnswers}
              />
              <Field
                name="dueDate"
                label="Due Date"
                component={Date}
                validate={validation.isDate}
                dataTest="dueDate"
              />
              <Field
                name="reason"
                label="Reason"
                component={Select}
                validate={validation.isRequired}
                dataTest="reason"
                answers={reasonAnswers}
              />
              <Field
                name="message"
                label="Message"
                component={Input}
                validate={validation.isRequired}
                dataTest="message"
              />
            </div>
            <div className="buttons note-file-footer-button-group">
              <button type="button" tabIndex="0" aria-label="cancel-btn form-newNote" className="btn btn-secondary cancel-button" onClick={closeHandler}>Cancel</button>
              <button type="submit" tabIndex="0" aria-label="submit-btn form-newNote" className="btn btn-primary submit-button">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, null)(reduxForm({
  form: 'Diary',
  destroyOnUnmount: false,
  enableReinitialize: true
})(DiaryModal));
