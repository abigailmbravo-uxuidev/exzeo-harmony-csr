import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import {reduxForm, Form, propTypes} from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import RadioField from '../Form/inputs/RadioField';
import TextField from '../Form/inputs/TextField';
import SelectField from '../Form/inputs/SelectField';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import QuoteSummaryModal from '../../components/Common/QuoteSummaryModal';

const handleFormSubmit = (data, dispatch, props) => {
    alert('submit');
};

const handleInitialize = (state) => {
    const formValues = {
        textField1: '',
        billTo: 'Mortgagee',
        billPlan: 'Annual',
        textField2: '5000',
        isActive: true,
        deductible: 200000,
        disabled: true
    };
    return formValues;

};

const paymentQuarterly = [
  {
    paymentDate: 'Due 03/10/2017',
    amount: '$ 1,030',
  },
  {
    paymentDate: 'Due 06/08/2017',
    amount: '$ 498',
  },
  {
    paymentDate: 'Due 09/06/2017',
    amount: '$ 498',
  },
  {
    paymentDate: 'Due 12/05/2017',
    amount: '$ 498',
  }

];

const paymentSemi = [
  {
    paymentDate: 'Due 03/10/2017',
    amount: '$ 1,524',
  },
  {
    paymentDate: 'Due 09/06/2017',
    amount: '$ 993',
  }

];

const paymentAnnual = [
  {
    paymentDate: 'Due 03/10/2017',
    amount: '$ 2,501',
  }

];

// ------------------------------------------------
// The render is where all the data is being pulled
//  from the props.
// The quote data data comes from the previous task
//  which is createQuote / singleQuote. This might
//  not be the case in later calls, you may need
//  to pull it from another place in the model
// ------------------------------------------------
export const MailingAddressBilling = (props) => {
    const {handleSubmit} = props;
    return (
        <QuoteBaseConnect>
            <ClearErrorConnect/>
            <div className="route-content">
                <Form id="MailingAddressBilling" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
                    <div className="scroll">
                        <div className="form-group survey-wrapper" role="group">
                          <h1>Mailing Address / Billing</h1>

                          <section>
                            <h2>Mailing Address</h2>

                              <RadioField validations={['required']} name={'addressSame'} styleName={''} label={'Is mailing address same as risk (property) address?'} onChange={function() {}} segmented answers={[
                                    {
                                        answer: 'Yes',
                                        label: 'Yes'
                                    }, {
                                        answer: 'No',
                                        label: 'No'
                                    }
                                ]}/>


                              <TextField validations={['required']} label={'Address 1'} styleName={''} name={'address1'} />

                            <TextField validations={['required']} label={'Address 2'} styleName={''} name={'address2'} />

                              <div className="flex-parent">
                                <div className="flex-child">
                                  <TextField validations={['required']} label={'City'} styleName={''} name={'city'} />
                                </div>
                                <div className="flex-child">
                                  <SelectField
                                    name="state" component="select" styleName={''} label="State" onChange={function () {}} validations={['required']} answers={[
                                      {
                                        answer: 'FL',
                                        label: 'FL'
                                      }, {
                                        answer: 'PA',
                                        label: 'PA'
                                      }
                                    ]} validate={[value => (value
                                                                ? undefined
                                                                : 'Field Required')]}
                                  />
                                </div>
                                <div className="flex-child">
                                    <TextField validations={['required']} label={'Zip'} styleName={''} name={'zip'} />
                                </div>
                              </div>



                          </section>

                          <section>
                            <h2>Billing</h2>

                              <div className="flex-parent">
                                <div className="flex-child">

                                  <SelectField
                                    name="billTO" component="select" styleName={''} label="Bill To" onChange={function () {}} validations={['required']} answers={[
                                      {
                                        answer: 'Bill to Insured',
                                        label: 'Bill to Insured'
                                      }, {
                                        answer: 'Bill to Policy Holder',
                                        label: 'Bill to Policy Holder'
                                      }
                                    ]} validate={[value => (value
                                                                ? undefined
                                                                : 'Field Required')]}
                                                                />
                                    </div>
                                    <div className="flex-child">

                                      <SelectField
                                        name="paymentSchedule" component="select" styleName={''} label="Payment Schedule" onChange={function () {}} validations={['required']} answers={[
                                          {
                                            answer: 'Quarterly',
                                            label: 'Quarterly'
                                          }, {
                                            answer: 'Monthly',
                                            label: 'Monthly'
                                          }
                                        ]} validate={[value => (value
                                                                    ? undefined
                                                                    : 'Field Required')]}
                                                                    />
                                        </div>
                              </div>



                              <div className="flex-parent responsive-tables">
                                <div className="table-view">
                                    <BootstrapTable data={paymentQuarterly} striped hover>
                                      <TableHeaderColumn isKey className="date" columnClassName="date" dataField="paymentDate">Payment Date</TableHeaderColumn>
                                      <TableHeaderColumn className="amount" columnClassName="amount" dataField="amount" dataAlign="right">Amount</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                                <div className="table-view">
                                  <BootstrapTable data={paymentSemi} striped hover>
                                    <TableHeaderColumn isKey className="date" columnClassName="date" dataField="paymentDate">Payment Date</TableHeaderColumn>
                                    <TableHeaderColumn className="amount" columnClassName="amount" dataField="amount" dataAlign="right">Amount</TableHeaderColumn>
                                  </BootstrapTable>
                                </div>
                                <div className="table-view">
                                  <BootstrapTable data={paymentAnnual} striped hover>
                                    <TableHeaderColumn isKey className="date" columnClassName="date" dataField="paymentDate">Payment Date</TableHeaderColumn>
                                    <TableHeaderColumn className="amount" columnClassName="amount" dataField="amount" dataAlign="right">Amount</TableHeaderColumn>
                                  </BootstrapTable>
                                </div>
                              </div>



                          </section>





                            <div className="btn-footer">
                                <button className="btn btn-primary" type="submit" form="MailingAddressBilling">
                                    Save
                                </button>
                            </div>

                        </div>



                    </div>
                </Form>
                <QuoteSummaryModal />
            </div>
        </QuoteBaseConnect>
    );
};

// ------------------------------------------------
// Property type definitions
// ------------------------------------------------
MailingAddressBilling.propTypes = {
    ...propTypes,
    tasks: PropTypes.shape(),
    appState: PropTypes.shape({
        modelName: PropTypes.string,
        instanceId: PropTypes.string,
        data: PropTypes.shape({submitting: PropTypes.boolean})
    })
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
    tasks: state.cg,
    appState: state.appState,
    fieldValues: _.get(state.form, 'MailingAddressBilling.values', {}),
    initialValues: handleInitialize(state)
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
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'MailingAddressBilling'})(MailingAddressBilling));
