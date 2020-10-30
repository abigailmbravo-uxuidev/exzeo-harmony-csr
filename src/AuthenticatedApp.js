import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReceiptHandler } from '@exzeo/core-ui/src/@Harmony';

import { setAppState } from './state/actions/appState.actions';
import { setAppError, clearAppError } from './state/actions/error.actions';
import { createQuote, retrieveQuote } from './state/actions/quote.actions';
import { useAuth0 } from './context/auth-context';
import { useUser } from './context/user-context';
import NotFoundPage from './components/NotFound';
import Reports from './components/Reports';
import NoteUploader from './components/NoteUploader';
import ErrorModal from './components/ErrorModal';

import { DiaryModal } from './modules/Diaries';
import { QuoteLanding, QuoteWorkflowContainer } from './modules/Quote';
import { Search } from './modules/Search';
import { PolicyWorkflowContainer } from './modules/Policy';
import { FinanceWorkflow } from './modules/Finance';
import { BulkMortgage } from './modules/BulkMortgage';
import Agency from './modules/Agency';
import { useDiaries } from './context/diaries-context';

function AuthenticatedApp({
  ui: { note, minimizeNote },
  setAppError,
  clearAppError,
  error,
  createQuote,
  retrieveQuote
}) {
  const { logout } = useAuth0();
  const userProfile = useUser();
  const { showModal: showDiaryModal, diariesDispatch } = useDiaries();

  return (
    <div>
      <div className="routes">
        <Switch>
          <Route
            exact
            path="/quote/new/:companyCode/:stateCode/:product/:propertyId"
            render={props => (
              <QuoteLanding
                {...props}
                createQuote={createQuote}
                errorHandler={setAppError}
              />
            )}
          />
          <Route
            path="/quote/:quoteNumber/:step"
            render={props => <QuoteWorkflowContainer {...props} />}
          />
          <Route
            path="/policy/:policyNumber/:step"
            render={props => <PolicyWorkflowContainer {...props} />}
          />
          <Route
            path="/agency/:agencyCode/:branchCode"
            render={props => <Agency {...props} />}
          />

          <Route
            path="/finance"
            render={props => (
              <FinanceWorkflow {...props} errorHandler={setAppError} />
            )}
          />
          <Route
            exact
            path="/reports"
            render={props => <Reports {...props} />}
          />
          <Route
            exact
            path="/bulkMortgage"
            render={props => (
              <BulkMortgage {...props} errorHandler={setAppError} />
            )}
          />
          <Route
            path="/receipt"
            render={props => <ReceiptHandler {...props} />}
          />
          <Route
            exact
            path="/logout"
            render={() => {
              logout({ returnTo: window.location.origin });
            }}
          />

          {/* TODO HAR-10251 split up search into main groups. Fixes routing collision*/}
          <Route
            path="/"
            render={props => (
              <Search
                {...props}
                userProfile={userProfile}
                errorHandler={setAppError}
                handleLogout={logout}
                createQuote={createQuote}
                retrieveQuote={retrieveQuote}
              />
            )}
          />
          <Route path="*" render={props => <NotFoundPage {...props} />} />
        </Switch>

        <ErrorModal error={error} handleClose={clearAppError} />

        {showDiaryModal && <DiaryModal errorHandler={setAppError} />}

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
            document={note.entity}
            user={userProfile}
            diariesDispatch={diariesDispatch}
          />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  error: state.error,
  ui: state.ui
});

export default connect(mapStateToProps, {
  clearAppError,
  setAppError,
  setAppState,
  createQuote,
  retrieveQuote
})(AuthenticatedApp);
