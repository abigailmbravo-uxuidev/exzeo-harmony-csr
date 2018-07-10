import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';
import { Input, Date, AutocompleteChips } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';
import CheckBoxGroup from '../CheckBoxGroup';

export const ContractsModal = (props) => {
  const {
    toggleModal, saveContract, handleSubmit, editType, contractIndex, agencyAgentsList, existsInAgentsList
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
              <div className="form-group">
              <label>Add Agent</label>
                {/*Combo box/Tupe ahead component listing all agents that are associated with this agency and are not currently in list below*/}
                <select>
                  <option>AGENT ID <span>AGENT NAME</span> [AGENT LICENSE | AGENT LICENSE | AGENT LICENSE]</option>
                  <option>AGENT ID <span>AGENT NAME</span> [AGENT LICENSE | AGENT LICENSE | AGENT LICENSE]</option>
                  <option>AGENT ID <span>AGENT NAME</span> [AGENT LICENSE | AGENT LICENSE | AGENT LICENSE]</option>
                  <option>AGENT ID <span>AGENT NAME</span> [AGENT LICENSE | AGENT LICENSE | AGENT LICENSE]</option>
                </select>
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
