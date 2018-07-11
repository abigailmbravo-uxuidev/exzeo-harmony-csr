import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';
import { Input, Date, Select } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';
import CheckBoxGroup from '../CheckBoxGroup';

export const ContractsModal = (props) => {
  const {
    toggleModal, saveContract, handleSubmit, editType, contractIndex, removeAgentFromList, initialValues, listOfAgents, addAgentFromList
  } = props;
  return (
    <div className="modal contract-crud">
      <Form noValidate onSubmit={handleSubmit(saveContract)}>
        <div className="card">
          <div className="card-header">
            <h4><i className="fa fa-file" /> {editType} Contract</h4>
          </div>
          <div className="card-block">
            <section className="contract-details">
              <div className="flex-form">
                <Field
                  label="Company Code"
                  styleName="companyCode"
                  name={`license[${contractIndex}].companyCode`}
                  dataTest={`license[${contractIndex}].companyCode`}
                  component={Input}
                  validate={validation.isRequired}
                />
                <Field
                  label="State"
                  styleName="state"
                  name={`license[${contractIndex}].stateLicense`}
                  dataTest={`license[${contractIndex}].stateLicense`}
                  component={Input}
                  validate={validation.isRequired}
                />
              </div>
              <div className="flex-form">
                <Field
                  label="License Number"
                  styleName="licenseNumber"
                  name={`license[${contractIndex}].licenseNumber`}
                  dataTest={`license[${contractIndex}].licenseNumber`}
                  component={Input}
                  validate={validation.isRequired}
                />
                <Field
                  label="License Effective Date"
                  styleName="licenseEffectiveDate"
                  name={`license[${contractIndex}].licenseEffectiveDate`}
                  dataTest={`license[${contractIndex}].licenseEffectiveDate`}
                  component={Date}
                  validate={[validation.isRequired, validation.isDate]}
                />
              </div>
              <Field
                label="Contract"
                styleName="contract"
                name={`license[${contractIndex}].contract`}
                dataTest={`license[${contractIndex}].contract`}
                component={Input}
                validate={validation.isRequired}
              />
              <Field
                label="Addendum"
                styleName="addendum"
                name={`license[${contractIndex}].addendum`}
                dataTest={`license[${contractIndex}].addendum`}
                component={Input}
              />
              <Field
                label="EO Expiration Date"
                styleName="eoExpirationDate"
                name={`license[${contractIndex}].eoExpirationDate`}
                dataTest={`license[${contractIndex}].eoExpirationDate`}
                component={Date}
                validate={[validation.isRequired, validation.isDate]}
              />
            </section>
            <section className="product-details">
              <label>Products</label>
              <div className="product-wrapper">
                <Field
                  name={`license[${contractIndex}].product`}
                  dataTest={`license[${contractIndex}].product`}
                  id="product"
                  type="checkbox"
                  options={[{ label: 'HO3', value: 'HO3' }, { label: 'AF3', value: 'AF3' }]}
                  component={CheckBoxGroup}
                  validate={validation.isRequiredArray}
                />
              </div>
            </section>
            <section className="agent-details">
              {/* Combo box/Tupe ahead component listing all agents that are associated with this agency and are not currently in list below */}

              <Field
                label="Add Agents"
                styleName="selectedAgent"
                name="selectedAgent"
                dataTest="selectedAgent"
                component={Select}
                answers={listOfAgents}
                onChange={addAgentFromList}
              />

              {/* list of added agents with the ability to check appointed and/or agent of record to apply those attributes */}
              <div>
                <ul className="contract-agent-list">
                  {/* list headers */}
                  <li className="header">
                    <span className="agent-name label">Agent Name</span>
                    <span className="appointed label">Appointed</span>
                    <span className="aor label">AOR</span>
                    <span className="actions label" />
                  </li>
                  {/* LOOP OF AGENTS ASSIGNED TO CONTRACT */}
                  {/* Agent 1 */}
                  {initialValues.license[contractIndex].agent.map((a, index) =>
                    (<li className="agent-detail" key={`license[${contractIndex}].agent[${index}].agentCode`}>
                      <span className="agent-name display">{`${a.agentInfo.firstName} ${a.agentInfo.lastName}`}</span>
                      <span className="appointed display">
                        <Field
                          name={`license[${contractIndex}].agent[${index}].appointed`}
                          dataTest={`license[${contractIndex}].agent[${index}].appointed`}
                          id="appointed"
                          component="input"
                          type="checkbox"
                        />
                      </span>
                      <span className="aor display">
                        <Field
                          name={`license[${contractIndex}].agent[${index}].agentOfRecord`}
                          dataTest={`license[${contractIndex}].agent[${index}].agentOfRecord`}
                          id="agentOfRecord"
                          component="input"
                          type="checkbox"
                        />
                      </span>
                      <span className="actions display">
                        <button tabIndex="0" className="btn btn-link btn-sm" onClick={e => removeAgentFromList(e, a.agencyCode)}><i className="fa fa-times-rectangle" />Remove</button>
                      </span>
                    </li>))}
                </ul>
              </div>
            </section>
          </div>
          <div className="card-footer">
            <div className="btn-footer">
              <button tabIndex="0" className="btn btn-secondary" type="button" onClick={toggleModal('Edit')}>Cancel</button>
              <button tabIndex="0" className="btn btn-primary" type="submit">Save</button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

ContractsModal.propTypes = {
  initialValues: PropTypes.shape().isRequired,
  toggleModal: PropTypes.func.isRequired,
  editType: PropTypes.string.isRequired,
  saveContract: PropTypes.func.isRequired
};

export default reduxForm({ form: 'ContractsModal', enableReinitialize: true })(ContractsModal);
