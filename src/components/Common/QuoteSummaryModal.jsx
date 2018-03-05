import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';

import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as quoteStateActions from '../../actions/quoteStateActions';
import Loader from './Loader';

const QuoteSummary = ({
  appState, handleSubmit, verify, showQuoteSummaryModal, quoteData
}) => (
  <div className="modal quote-summary">
    <Form noValidate onSubmit={handleSubmit(verify)}>
      {appState.data.applicationSubmitting && <Loader />}
      <div className="card">
        <div className="card-header">
          <h4><i className="fa fa-envelope" /> Congratulations</h4>
        </div>
        <div className="card-block">
          <p>&ldquo;<em>I need to confirm a few more items prior to sending the application</em>.&rdquo;</p>
          <br />
          <ol start="1">
            <li><em>Do you have a pool or similar structure on the property? Is it completely fenced, walled, or screened? Are there any slides or diving boards?</em></li>
            <li><em>Do you maintain a separate flood policy? </em>
              <ul>
                <li>This question would only be asked if the property is in flood zone (A or V).</li>
              </ul>
            </li>
            <li><em>Does the property have any existing unrepaired damage?</em></li>
            <li><em>What is the roof covering on the home? What is the roof&rsquo;s age? </em>
              <ul>
                <li>Roof cannot be over 20 years old: Asphalt, Fiberglass, Composition/Wood Shake Shingles, Built-up Tar and Gravel</li>
                <li>Roof cannot be over 40 years old: Tile, Slate, Concrete, or Metal</li>
              </ul>
            </li>
          </ol>
          <p>If any adverse information, advise <em>&ldquo;Your policy </em><em>request</em><em> will be referred to Underwriting for review.&rdquo;</em> Do not send application until approved by Underwriting.</p>
          <br />
          <p>If no adverse information, advise<em>&ldquo;We will generate the Homeowners Application and e-mail it to:</em></p>
          { quoteData.policyHolders && quoteData.policyHolders[0] && <p>{`${quoteData.policyHolders[0].firstName} (${quoteData.policyHolders[0].emailAddress})`}</p>}
          { quoteData.policyHolders && quoteData.policyHolders[1] && <p>{`${quoteData.policyHolders[1].firstName} (${quoteData.policyHolders[1].emailAddress})`}</p>}
          <br />
          <p><em>Is this/Are these the correct email address(es)?&rdquo;</em></p>
          <br />
          <p><em>&ldquo;Once all electronic signatures have been received, the policy will automatically be bound and the policy documents will be emailed to you.&rdquo;</em></p>
          <br />
          <p><em>&ldquo;NOTE: All signatures must be completed within 10 days, or the application will expire.&rdquo;</em></p>
          <br />
          <p><em>&ldquo;All </em><em>properties are inspected within 30 days of the effective date. One of our representatives will be in contact with you to schedule it. Please plan to have someone present at the inspection as the inspector will need to enter the home.&rdquo;</em></p>
          <br />
          <p>Click &ldquo;SEND&rdquo; below to generate the Homeowners Application. Once you click &ldquo;SEND&rdquo; no changes can be made to this quote.</p>
        </div>
        <div className="card-footer">
          <div className="btn-footer">
            <button tabIndex="0" className="btn btn-secondary" type="button" onClick={() => showQuoteSummaryModal(false)}>Cancel</button>
            <button tabIndex="0" className="btn btn-primary" type="submit" disabled={appState.data.submitting}>Send</button>
          </div>
        </div>
      </div>
    </Form>
  </div>);

QuoteSummary.propTypes = {
  ...propTypes,
  showQuoteSummaryModal: PropTypes.func,
  verify: PropTypes.func,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    })
  })
};


const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  quoteData: state.service.quote || {}
});

const mapDispatchToProps = dispatch => ({
  actions: {
    quoteStateActions: bindActionCreators(quoteStateActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'QuoteSummary'
})(QuoteSummary));
