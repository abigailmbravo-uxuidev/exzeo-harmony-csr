import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import { Input, Date, SelectTypeAhead } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';
import CheckBoxGroup from '../CheckBoxGroup';
import Agents from './Agents';

export const productOptions = [{ label: 'HO3', value: 'HO3' }, { label: 'AF3', value: 'AF3' }];

export class LicenseModal extends Component {
handleAddAgent = (e, agentValue) => {
  const { array } = this.props;
  e.preventDefault();
  array.push('agent', agentValue.value);
};

handleRemoveAgent = (agentIndex) => {
  const { array } = this.props;
  array.remove('agent', agentIndex);
};

render() {
  const {
    isEditing, handleSubmit, agentValue, listOfAgents, handleCloseModal, handleSaveLicense, initialValues
  } = this.props;
  return (
    <div className="modal contract-crud">
      <div className="card">
        <form onSubmit={handleSubmit(handleSaveLicense)}>
          <div className="card-header">
            <h4><i className="fa fa-file" /> {isEditing ? ' Edit' : ' New'} Contract</h4>
          </div>
          <div className="card-block">
            <section className="contract-details">
              <div className="flex-form">
                <Field
                  label="Company Code"
                  styleName="companyCode"
                  name="companyCode"
                  dataTest="companyCode"
                  component={Input}
                  validate={validation.isRequired}
                />
                <Field
                  label="State"
                  styleName="state"
                  name="stateLicense"
                  dataTest="stateLicense"
                  component={Input}
                  validate={validation.isRequired}
                />
              </div>
              <div className="flex-form">
                <Field
                  label="License Number"
                  styleName="licenseNumber"
                  name="licenseNumber"
                  dataTest="licenseNumber"
                  component={Input}
                  validate={validation.isRequired}
                />
                <Field
                  label="License Effective Date"
                  styleName="licenseEffectiveDate"
                  name="licenseEffectiveDate"
                  dataTest="licenseEffectiveDate"
                  component={Date}
                  validate={[validation.isRequired, validation.isDate]}
                />
              </div>
              <Field
                label="Contract"
                styleName="contract"
                name="contract"
                dataTest="contract"
                component={Input}
                validate={validation.isRequired}
              />
              <Field
                label="Addendum"
                styleName="addendum"
                name="addendum"
                dataTest="addendum"
                component={Input}
              />
              <Field
                label="EO Expiration Date"
                styleName="eoExpirationDate"
                name="eoExpirationDate"
                dataTest="eoExpirationDate"
                component={Date}
                validate={[validation.isRequired, validation.isDate]}
              />
            </section>
            <section className="product-details">
              <label>Products</label>
              <div className="product-wrapper">
                <Field
                  name="product"
                  dataTest="product"
                  id="product"
                  type="checkbox"
                  options={productOptions}
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
                component={SelectTypeAhead}
                answers={listOfAgents}
                onChange={this.handleAddAgent}
              />

              {/* list of added agents with the ability to check appointed and/or agent of record to apply those attributes */}
              <div>
                {agentValue.length > 0 &&
                  <FieldArray
                    name="agent"
                    primaryAgentCode={initialValues.primaryAgent}
                    component={Agents}
                    agent={agentValue}
                    handleRemoveAgent={this.handleRemoveAgent}
                  />
                }
              </div>
            </section>
          </div>
          <div className="card-footer">
            <div className="btn-footer">
              <button tabIndex="0" className="btn btn-secondary" type="button" onClick={handleCloseModal}>Cancel</button>
              <button tabIndex="0" className="btn btn-primary" type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
}

LicenseModal.propTypes = {
  initialValues: PropTypes.shape().isRequired
};

const licenseFormSelector = formValueSelector('LicenseModal');
const defaultArray = [];
const mapStateToProps = state => ({
  agentValue: licenseFormSelector(state, 'agent') || defaultArray
});


export default connect(mapStateToProps)(reduxForm({
  form: 'LicenseModal',
  enableReinitialize: true
})(LicenseModal));
