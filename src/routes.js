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
import SearchAgency from './containers/SearchAgency';
import SearchPolicy from './containers/SearchPolicy';
import SearchDiaries from './containers/SearchDiaries';
import NotFoundPage from './containers/NotFound';
import Reports from './containers/Reports';
import NoteUploader from './components/NoteUploader';
import ConfirmPopup from './components/Common/ConfirmPopup';
import DiaryModal from './components/DiaryModal';
import Bootstrap from './components/Bootstrap';
import Agency from './modules/Agency';
import { QuoteLanding, QuoteWorkflow } from './modules/Quote';
import { PolicyWorkflow } from './modules/Policy';
import Finance from './modules/Finance';

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
      policyState: { policy }
    } = this.props;
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
            minimizeDiary={minimizeDiary}
            companyCode={diary.companyCode}
            state={diary.state}
            product={diary.product}
            user={userProfile}
            diaryId={diary.selectedDiary ? diary.selectedDiary.diaryId : null}
            resourceType={diary.resourceType}
            resourceId={diary.resourceId}
            sourceNumber={
              policy && policy.sourceNumber ? policy.sourceNumber : null
            }
            entityEndDate={diary.entityEndDate}
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
                exact
                path="/"
                render={props => <SearchPolicy auth={auth} {...props} />}
              />
              <Route
                exact
                path="/agency"
                render={props => <SearchAgency auth={auth} {...props} />}
              />
              <Route
                exact
                path="/diaries"
                render={props => <SearchDiaries auth={auth} {...props} />}
              />
              <Route
                exact
                path="/quote/new/:stateCode/:product/:propertyId"
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
  policyState: state.policyState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
