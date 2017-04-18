import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import { Redirect } from 'react-router';

import Loader from '../components/Common/Loader';
import FieldGenerator from '../components/Form/FieldGenerator';
import * as userActions from '../actions/userActions';
import * as appStateActions from '../actions/appStateActions';
import BaseConnect from './Base';

const handleLoginSubmit = (data, dispatch, props) => {
  const workflowId = props.appState.instanceId;
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true, loginSubmitting: true });
  props.actions.user.login(data)
  .then(() => {
    props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: false, loginSubmitting: false });
  });
};

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

const formQuestions = [
  {
    description: 'Please enter your user name or email address',
    question: 'User Name',
    answerType: 'text',
    name: 'username'
  },
  {
    description: 'Please enter your password',
    question: 'Password',
    answerType: 'password',
    type: 'password',
    name: 'password'
  }
];


export const Login = (props) => {
  const errorResult = (props.user.error) ?
  (<div className="form-group error"><span>
    <i className="fa fa-exclamation-triangle" /> User name or password is incorrect
  </span></div>) : null;

  const loggedOutResult = (props.user.loggedOut) ?
  (<div className="form-group info"><span>
    <i className="fa fa-sign-out" /> You have been logged out
  </span></div>) : null;

  const isAuthenticatedResult = (props.user.isAuthenticated) ?
  (<Redirect to={props.redirectUrl} />) : null;

  const { fieldValues, handleSubmit } = props;
  if (props.appState.data && props.appState.data.loginSubmitting) {
    return <Loader />;
  }
  return (<BaseConnect>
    <div className="login" role="article">
      <div className="card">
        <div className="card-header">
          <h5>Enter your user name and password to login</h5>
        </div>
        <Form
          className="card-block"
          id="Login"
          onSubmit={handleSubmit(handleLoginSubmit)}
          noValidate
        >
          { isAuthenticatedResult }
          { errorResult }
          { loggedOutResult }

          {formQuestions.map((question, index) =>
            <FieldGenerator
              question={question}
              values={fieldValues}
              key={index}
            />
          )}
        </Form>
        <div className="card-footer">
          <button
            className="btn btn-success"
            type="submit"
            form="Login"
            disabled={props.loginSubmitting}
          >
            <i className="fa fa-sign-in" /> Login
          </button>
        </div>
      </div>
      <div className="modal" />
    </div>
  </BaseConnect>);
};

Login.propTypes = {
  ...propTypes,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.boolean,
    error: PropTypes.object,
    loggedOut: PropTypes.boolean
  }),
  redirectUrl: PropTypes.string
};

const mapStateToProps = state => ({
  user: state.user,
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    user: bindActionCreators(userActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'Login',
  validate
})(Login));
