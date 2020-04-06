import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from './containers/Login';
import AccessDenied from './containers/AccessDenied';
import LoggedOut from './containers/LoggedOut';
import Callback from './containers/Callback';
import NotFoundPage from './containers/NotFound';
import Reports from './containers/Reports';
import NoteUploader from './components/NoteUploader';
import DiaryModal from './components/DiaryModal';
import Bootstrap from './components/Bootstrap';
import ErrorModal from './components/ErrorModal';

import AgencyWorkflow from './modules/Agency';
import FinanceWorkflow from './modules/Finance';
import { QuoteLanding, QuoteWorkflow } from './modules/Quote';
import { PolicyWorkflow } from './modules/Policy';

// TODO convert searches to react-final-form
import SearchAgency from './containers/SearchAgency';
import SearchPolicy from './containers/SearchPolicy';
import SearchDiaries from './containers/SearchDiaries';
import { QuotePolicySearch } from './modules/QuotePolicySearch';

const Routes = ({
  auth,
  userProfile,
  ui: { diary, note, minimizeNote, minimizeDiary }
}) => {
  return (
    <div>
      <ErrorModal />

      <Router>
        <div className="routes">
          {userProfile && <Bootstrap userProfile={userProfile} />}
          <Switch>
            <Route
              exact
              path="/"
              render={props => <QuotePolicySearch auth={auth} {...props} />}
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
              render={props => <AgencyWorkflow auth={auth} {...props} />}
            />
            <Route
              path="/finance"
              render={props => <FinanceWorkflow auth={auth} {...props} />}
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
              render={() => auth.logout() && <Callback />}
            />

            <Route exact path="/callback" render={() => <Callback />} />
            <Route path="*" render={() => <NotFoundPage />} />
          </Switch>
        </div>
      </Router>

      {diary && diary.resourceType && (
        <DiaryModal
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
};

const mapStateToProps = state => {
  return {
    appState: state.appState,
    userProfile: state.authState.userProfile,
    ui: state.ui
  };
};

export default connect(mapStateToProps)(Routes);
