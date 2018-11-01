import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import LoginPage from './containers/Login';
import AccessDenied from './containers/AccessDenied';
import LoggedOut from './containers/LoggedOut';
import Callback from './containers/Callback';
import SearchAgency from './containers/SearchAgency';
import SearchPolicy from './containers/SearchPolicy';
import SearchDiaries from './containers/SearchDiaries';
import NotFoundPage from './containers/NotFound';
import QuoteCoverage from './components/Quote/Coverage';
import QuoteLanding from './components/Quote/QuoteLanding';
import QuoteUnderwriting from './components/Quote/Underwriting';
import AdditionalInterests from './components/Quote/AdditionalInterests';
import QuoteMailingAddressBilling from './components/Quote/MailingAddressBilling';
import QuoteNotesFiles from './components/Quote/NotesFiles';
import QuoteSummary from './components/Quote/Summary';
import QuoteApplication from './components/Quote/Application';
import Reports from './containers/Reports';
import PolicyModule from './modules/Policy';
import Agency from './modules/Agency';
import NoteUploader from './components/Common/NoteUploader';
import ConfirmPopup from './components/Common/ConfirmPopup';
import DiaryModal from './components/DiaryModal';
import Bootstrap from './components/Bootstrap';
import * as appStateActions from './state/actions/appState.actions';
import * as errorActions from './state/actions/error.actions';
import * as authActions from './state/actions/auth.actions';

class Routes extends Component {
  setBackStep = (goToNext, callback) => {
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
      ...this.props.appState.data,
      activateRedirect: false
    });
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
    const { ui: { diary, note }, auth, authState: { userProfile } } = this.props;
    return (
      <div>
        <Modal
          isOpen={this.props.error.message !== undefined}
          contentLabel="Error Modal"
          style={this.modalStyles}
          className="card"
          appElement={document.getElementById('root')}>
          <div className="card-header"><h4><i className="fa fa-exclamation-circle" />&nbsp;Error</h4></div>
          <div className="card-block"><p>{this.props.error.message}</p></div>
          <div className="card-footer">
            {this.props.error.requestId &&
              <div className="footer-message"><p>Request ID: {this.props.error.requestId}</p></div>
            }
            <button className="btn-primary" onClick={this.handleClearError}>close</button>
          </div>
        </Modal>

        {diary && diary.resourceType &&
          <DiaryModal
            user={userProfile}
            initialValues={diary.selectedDiary}
            resourceType={diary.resourceType}
            resourceId={diary.resourceId} />
        }

        {note && note.documentId &&
          <NoteUploader
            noteType={note.noteType}
            documentId={note.documentId}
            sourceId={note.sourceNumber}
            resourceType={note.resourceType} />
        }
        <Router
          getUserConfirmation={(message, callback) => {
            ReactDOM.render(
              <ConfirmPopup
                {...this.props}
                message={message}
                setBackStep={this.setBackStep}
                callback={callback} />,
              document.getElementById('modal')
            );
          }}>

          <div className="routes">
            <Bootstrap userProfile={userProfile} />
            <Switch>
              <Route exact path="/" render={props => <SearchPolicy auth={auth} {...props} />} />
              <Route exact path="/agency" render={props => <SearchAgency auth={auth} {...props} />} />
              <Route exact path="/diaries" render={props => <SearchDiaries auth={auth} {...props} />} />
              <Route path="/policy/:policyNumber" render={props => <PolicyModule auth={auth} {...props} />} />
              <Route path="/agency/:agencyCode/:branchCode" render={props => <Agency auth={auth} {...props} />} />
              <Route exact path="/quote/new/:stateCode/:propertyId" render={props => <QuoteLanding auth={auth} {...props} />} />
              <Route exact path="/quote/:quoteId/coverage" render={props => <QuoteCoverage auth={auth} {...props} />} />
              <Route exact path="/quote/:quoteId/billing" render={props => <QuoteMailingAddressBilling auth={auth} {...props} />} />
              <Route exact path="/quote/:quoteId/notes" render={props => <QuoteNotesFiles auth={auth} {...props} />} />
              <Route exact path="/quote/:quoteId/summary" render={props => <QuoteSummary auth={auth} {...props} />} />
              <Route exact path="/quote/:quoteId/additionalInterests" render={props => <AdditionalInterests auth={auth} {...props} />} />
              <Route exact path="/quote/:quoteId/underwriting" render={props => <QuoteUnderwriting auth={auth} {...props} />} />
              <Route exact path="/quote/:quoteId/application" render={props => <QuoteApplication auth={auth} {...props} />} />
              <Route exact path="/reports" render={props => <Reports auth={auth} {...props} />} />
              <Route exact path="/login" render={props => <LoginPage auth={auth} {...props} />} />
              <Route exact path="/accessDenied" render={props => <AccessDenied auth={auth} {...props} />} />
              <Route exact path="/loggedOut" render={props => <LoggedOut auth={auth} {...props} />} />
              <Route
                exact
                path="/logout"
                render={() => {
                  auth.logout();
                  return <Callback />;
                }} />
              <Route
                exact
                path="/callback"
                render={() => <Callback />} />
              <Route path="*" render={props => <NotFoundPage auth={auth} {...props} />} />
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
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
