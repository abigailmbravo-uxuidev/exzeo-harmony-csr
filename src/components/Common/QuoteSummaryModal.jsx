import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import moment from 'moment';
import { Loader } from '@exzeo/core-ui';

import * as cgActions from '../../state/actions/cg.actions';
import * as appStateActions from '../../state/actions/appState.actions';

const QuoteSummary = ({
  appState,
  handleSubmit,
  verify,
  showQuoteSummaryModal,
  quoteData,
  submitting
}) => (
  <div className="modal quote-summary">
    <Form noValidate onSubmit={handleSubmit(verify)}>
      {appState.data.applicationSubmitting && <Loader />}
      <div className="card">
        <div className="card-header">
          <h4>
            <i className="fa fa-envelope" /> Congratulations
          </h4>
        </div>
        <div className="card-block user-script">
          <p className="script margin bottom">
            I need to confirm a few more items prior to sending the application
          </p>
          <ul>
            <li className="script">
              Do you have a pool or similar structure on the property?
              <ul>
                <li className="script">
                  Is it completely fenced, walled, or screened?
                </li>
                <li className="script margin bottom">
                  Are there any slides or diving boards?
                </li>
              </ul>
            </li>
            {quoteData.property &&
              (quoteData.property.floodZone === 'A' ||
                quoteData.property.floodZone === 'V') && (
                <li className="script">
                  Do you maintain a separate flood policy?
                </li>
              )}
            {quoteData.property &&
              (quoteData.property.floodZone === 'A' ||
                quoteData.property.floodZone === 'V') && (
                <li className="scriptInfo margin bottom">
                  Home is in flood zone: {quoteData.property.floodZone}
                </li>
              )}
            <li className="script margin bottom">
              Does the property have any existing unrepaired damage?
            </li>
            {quoteData.property &&
              quoteData.property.yearBuilt &&
              quoteData.property.yearBuilt <
                Number(moment.utc(quoteData.effectiveDate).format('YYYY')) -
                  20 && (
                <li className="script">
                  What is the roof covering on the home?
                  <ul>
                    <li className="scriptInfo">
                      Asphalt, Fiberglass, Composition/Wood Shake Shingles,
                      Built-up Tar and Gravel
                    </li>
                    <li className="script">Is the roof over 20 years old?</li>
                    <li className="scriptInfo margin bottom">
                      Before:{' '}
                      {Number(
                        moment
                          .utc(quoteData.effectiveDate)
                          .subtract(20, 'years')
                          .format('YYYY')
                      )}
                    </li>
                    <li className="scriptInfo">
                      Tile, Slate, Concrete, or Metal
                    </li>
                    <li className="script">Is the roof over 40 years old?</li>
                    <li className="scriptInfo margin bottom">
                      Before:{' '}
                      {Number(
                        moment
                          .utc(quoteData.effectiveDate)
                          .subtract(40, 'years')
                          .format('YYYY')
                      )}
                    </li>
                  </ul>
                </li>
              )}
          </ul>
          <hr />
          <p className="scriptInfo">If any adverse information</p>
          <p className="script margin bottom">
            Your policy request will be referred to Underwriting for review.
          </p>
          <p className="scriptInfo margin bottom">
            Click &ldquo;CANCEL&rdquo; below.
          </p>
          <hr />
          <p className="scriptInfo">If no adverse information</p>
          <p className="script margin bottom">
            We will generate the Homeowners Application and e-mail it to:
          </p>
          <ul>
            {quoteData.policyHolders && quoteData.policyHolders[0] && (
              <li className="script">
                <strong>{`${quoteData.policyHolders[0].firstName} ${quoteData.policyHolders[0].lastName}  (${quoteData.policyHolders[0].emailAddress})`}</strong>
              </li>
            )}
            {quoteData.policyHolders && quoteData.policyHolders[1] && (
              <li className="script">
                <strong>{`${quoteData.policyHolders[1].firstName} ${quoteData.policyHolders[1].lastName} (${quoteData.policyHolders[1].emailAddress})`}</strong>
              </li>
            )}
          </ul>
          <p className="script margin bottom">
            {quoteData.policyHolders &&
              quoteData.policyHolders.length === 1 &&
              'Is this the correct email address?'}
            {quoteData.policyHolders &&
              quoteData.policyHolders.length > 1 &&
              'Are these the correct email addresses?'}
          </p>
          <p className="script margin bottom">
            Once all electronic signatures have been received, the policy will
            automatically be bound and the policy documents will be emailed to
            you.
          </p>
          <p className="script margin bottom">
            PLEASE NOTE: All signatures must be completed within 10 days, or the
            application will expire.
          </p>
          <p className="script margin bottom">
            All properties are inspected within 30 days of the effective date.
            One of our representatives will be in contact with you to schedule
            it. Please plan to have someone present at the inspection as the
            inspector will need to enter the home.
          </p>
          <p className="scriptInfo margin bottom">
            Click &ldquo;SEND&rdquo; below to generate the Homeowners
            Application. Once you click &ldquo;SEND&rdquo; no changes can be
            made to this quote.
          </p>
        </div>
        <div className="card-footer">
          <button
            tabIndex="0"
            className="btn btn-secondary"
            type="button"
            onClick={() => showQuoteSummaryModal(false)}
          >
            Cancel
          </button>
          <button
            tabIndex="0"
            className="btn btn-primary"
            type="submit"
            disabled={submitting}
          >
            Send
          </button>
        </div>
      </div>
    </Form>
  </div>
);

QuoteSummary.propTypes = {
  ...propTypes,
  showQuoteSummaryModal: PropTypes.func,
  verify: PropTypes.func,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.bool,
      submitting: PropTypes.bool
    })
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  quoteData: state.quoteState.quote || {}
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'QuoteSummary'
  })(QuoteSummary)
);
