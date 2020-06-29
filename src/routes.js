import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import * as appStateActions from './state/actions/appState.actions';
import * as errorActions from './state/actions/error.actions';
import * as authActions from './state/actions/auth.actions';
import LoginPage from './containers/Login';
import AccessDenied from './containers/AccessDenied';
import LoggedOut from './containers/LoggedOut';
import Callback from './containers/Callback';
import SearchBase from './containers/SearchBase';
import NotFoundPage from './containers/NotFound';
import Reports from './containers/Reports';
import NoteUploader from './components/NoteUploader';
import ConfirmPopup from './components/Common/ConfirmPopup';
import DiaryModal from './components/DiaryModal';
import Bootstrap from './components/Bootstrap';
import Agency from './modules/Agency';
import { QuoteLanding, QuoteWorkflow } from './modules/Quote';
import { PolicyWorkflow, ReceiptHandler } from './modules/Policy';
import Finance from './modules/Finance';
import BulkMortgage from './modules/BulkMortgage';
import { userResources } from './utilities/userResources';
import { BULK_MORTGAGE_TYPE } from './modules/BulkMortgage/constants';

class Routes extends Component {
  setBackStep = (goToNext, callback) => {
    this.props.actions.appStateActions.setAppState(
      this.props.appState.modelName,
      this.props.appState.instanceId,
      {
        ...this.props.appState.data,
        activateRedirect: false
      }
    );
    callback(goToNext);
  };

  handleClearError = () => this.props.actions.errorActions.clearAppError();

  modalStyles = {
    content: {
      top: '20%',
      left: '20%'
    }
  };

  /* eslint-disable max-len */
  render() {
    const {
      ui: { diary, note, minimizeNote, minimizeDiary },
      actions: { errorActions },
      auth,
      authState: { userProfile },
      diaryOptions
    } = this.props;

    const { enableBulkMortgage } = userResources(userProfile);

    return (
      <div>
        <Modal
          isOpen={this.props.error.message !== undefined}
          contentLabel="Error Modal"
          style={this.modalStyles}
          className="card"
          appElement={document.getElementById('root')}
        >
          <div className="card-header">
            <h4>
              <i className="fa fa-exclamation-circle" />
              &nbsp;Error
            </h4>
          </div>
          <div className="card-block">
            <p>{String(this.props.error.message)}</p>
          </div>
          <div className="card-footer">
            {this.props.error.requestId && (
              <div className="footer-message">
                <p>Request ID: {this.props.error.requestId}</p>
              </div>
            )}
            <button className="btn-primary" onClick={this.handleClearError}>
              close
            </button>
          </div>
        </Modal>
        {diary && diary.resourceType && (
          <DiaryModal
            diaryOptions={diaryOptions}
            minimizeDiary={minimizeDiary}
            user={userProfile}
            diaryId={diary.selectedDiary ? diary.selectedDiary.diaryId : null}
            resourceType={diary.resourceType}
            resourceId={diary.resourceId}
            sourceNumber={
              diary.entity && diary.entity.sourceNumber
                ? diary.entity.sourceNumber
                : null
            }
            entity={diary.entity}
          />
        )}
        {note && note.documentId && (
          <NoteUploader
            minimizeNote={minimizeNote}
            companyCode={note.companyCode}
            state={note.state}
            product={note.product}
            noteType={note.noteType}
            documentId={note.documentId}
            sourceId={note.sourceNumber}
            resourceType={note.resourceType}
            entity={note.entity}
          />
        )}
        <Router
          getUserConfirmation={(message, callback) => {
            ReactDOM.render(
              <ConfirmPopup
                {...this.props}
                message={message}
                setBackStep={this.setBackStep}
                callback={callback}
              />,
              document.getElementById('modal')
            );
          }}
        >
          <div className="routes">
            {userProfile && <Bootstrap userProfile={userProfile} />}
            <Switch>
              <Route
                path="/receipt"
                render={props => <ReceiptHandler {...props} />}
              />

              <Route
                exact
                path="/quote/new/:companyCode/:stateCode/:product/:propertyId"
                render={props => <QuoteLanding auth={auth} {...props} />}
              />
              <Route
                path="/quote/:quoteNumber"
                render={props => <QuoteWorkflow auth={auth} {...props} />}
              />
              <Route
                path="/policy/:policyNumber"
                render={props => <PolicyWorkflow auth={auth} {...props} />}
              />
              <Route
                path="/agency/:agencyCode/:branchCode"
                render={props => <Agency auth={auth} {...props} />}
              />
              <Route
                path="/finance"
                render={props => (
                  <Finance
                    auth={auth}
                    errorHandler={errorActions.setAppError}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/reports"
                render={props => <Reports auth={auth} {...props} />}
              />
              {enableBulkMortgage && (
                <Route
                  exact
                  path="/bulkMortgage"
                  render={props => (
                    <BulkMortgage
                      {...props}
                      userProfile={userProfile}
                      errorHandler={errorActions.setAppError}
                      auth={auth}
                    />
                  )}
                />
              )}
              {enableBulkMortgage && (
                <Route
                  exact
                  path="/bulkMortgage/byJob"
                  render={props => (
                    <BulkMortgage
                      tab={BULK_MORTGAGE_TYPE.job}
                      errorHandler={errorActions.setAppError}
                      auth={auth}
                      {...props}
                    />
                  )}
                />
              )}
              <Route
                exact
                path="/login"
                render={props => <LoginPage auth={auth} {...props} />}
              />
              <Route
                exact
                path="/accessDenied"
                render={props => <AccessDenied auth={auth} {...props} />}
              />
              <Route
                exact
                path="/loggedOut"
                render={props => <LoggedOut auth={auth} {...props} />}
              />
              <Route
                exact
                path="/logout"
                render={() => {
                  auth.logout();
                  return <Callback />;
                }}
              />
              <Route exact path="/callback" render={() => <Callback />} />

              <Route
                path="/"
                render={props => (
                  <SearchBase
                    userProfile={userProfile}
                    errorHandler={errorActions.setAppError}
                    auth={auth}
                    {...props}
                  />
                )}
              />

              <Route
                path="*"
                render={props => <NotFoundPage auth={auth} {...props} />}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  appState: state.appState,
  authState: state.authState,
  ui: state.ui,
  diaryOptions: state.list.diaryOptions
});

const mapDispatchToProps = dispatch => ({
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
