import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SelectTypeAhead,
  validation,
  Button,
  Form,
  Field,
  Loader
} from '@exzeo/core-ui';

import { verifyTransaction } from '../../../state/actions/agency.actions';

import AgencyChangeWatcher from './AgencyChangeWatcher';
import { groupPolicyByAgentCode } from './utilities';

export const TransferModal = ({
  selectedPolicies,
  closeModal,
  transferPoliciesToAgent,
  setRefresh,
  clearSelectedPolicies
}) => {
  const [agencySearchTerm, setAgencySearchTerm] = useState('');
  const [agencies, setAgencies] = useState([]);
  const [agents, setAgents] = useState([]);

  const submitTransfer = async data => {
    try {
      const { agentCodeTo, agencyCodeTo } = data;
      const groupedPolices = groupPolicyByAgentCode(selectedPolicies);
      const transfers = [];
      Object.keys(groupedPolices).forEach(p => {
        const policies = groupedPolices[p] || [];
        const {
          agencyCode: agencyCodeFrom,
          agentCode: agentCodeFrom
        } = policies[0];
        transfers.push({
          policyNumbers: policies.map(p => p.policyNumber),
          agencyCodeTo,
          agentCodeTo: Number(agentCodeTo),
          agencyCodeFrom,
          agentCodeFrom
        });
      });
      const response = await transferPoliciesToAgent(transfers);
      await verifyTransaction(response.result.transactionId);
      clearSelectedPolicies();
      setRefresh(Date.now());
      closeModal();
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error in submitTransfer (TransferModal): ', err);
      }
    }
  };

  return (
    <div className="modal bob-transfer" data-test="transfer-modal">
      <div className="card ">
        <Form onSubmit={submitTransfer} subscription={{ submitting: true }}>
          {({ submitting, handleSubmit }) => (
            <form
              id="TransferPolicies"
              className="Transfer"
              onSubmit={handleSubmit}
            >
              {submitting && <Loader />}
              <div className="card-header">
                <h4>Agent Receiving Selected Policy</h4>
              </div>
              <div className="card-block">
                <Field
                  label="Agency"
                  name="agencyCodeTo"
                  styleName="agencyCode"
                  dataTest="agencyCodeTo"
                  component={SelectTypeAhead}
                  answers={agencies}
                  inputValue={agencySearchTerm}
                  onInputChange={value => setAgencySearchTerm(value)}
                  validate={validation.isRequired}
                />
                <Field
                  label="Agent"
                  styleName="agentCode"
                  name="agentCodeTo"
                  dataTest="agentCodeTo"
                  component={SelectTypeAhead}
                  answers={agents}
                  validate={validation.isRequired}
                />
                <AgencyChangeWatcher
                  setAgents={setAgents}
                  setAgencies={setAgencies}
                  searchTerm={agencySearchTerm}
                  selectedPolicies={selectedPolicies}
                />
              </div>
              <div className="card-footer">
                <div className="btn-group">
                  <Button
                    tabIndex="0"
                    className={Button.constants.classNames.secondary}
                    type="button"
                    label="Cancel"
                    onClick={closeModal}
                    disabled={submitting}
                    data-test="cancel"
                  />
                  <Button
                    tabIndex="0"
                    className={Button.constants.classNames.primary}
                    type="submit"
                    label="Transfer"
                    disabled={submitting}
                    data-test="submit"
                  />
                </div>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

TransferModal.propTypes = {
  toggleModal: PropTypes.func,
  selectedPolicies: PropTypes.array,
  activeAgencyCode: PropTypes.string,
  transferPoliciesToAgent: PropTypes.func,
  getPoliciesForAgency: PropTypes.func,
  clearSelectedPolicies: PropTypes.func
};

export default TransferModal;
