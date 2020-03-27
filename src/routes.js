import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as errorActions from './state/actions/error.actions';
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
import DiaryModal from './components/DiaryModal';
import Bootstrap from './components/Bootstrap';
import ErrorModal from './components/ErrorModal';
import Agency from './modules/Agency';
import { QuoteLanding, QuoteWorkflow } from './modules/Quote';
import { PolicyWorkflow } from './modules/Policy';
import Finance from './modules/Finance';

class Routes extends Component {
  handleClearError = () => this.props.actions.errorActions.clearAppError();

  render() {
    const {
      auth,
      diaryOptions,
      error,
      actions: { errorActions },
      authState: { userProfile },
      ui: { diary, note, minimizeNote, minimizeDiary }
    } = this.props;

    return (
      <div>
        <ErrorModal error={error} handleClose={this.handleClearError} />

        <Router>
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
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
