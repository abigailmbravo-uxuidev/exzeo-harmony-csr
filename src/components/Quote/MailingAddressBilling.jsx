import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import RadioField from '../Form/inputs/RadioField';
import TextField from '../Form/inputs/TextField';
import SelectField from '../Form/inputs/SelectField';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import QuoteSummaryModal from '../../components/Common/QuoteSummaryModal';


const handleInitialize = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'getQuote' }) ? _.find(taskData.model.variables, { name: 'getQuote' }).value.result : {};
  const values = {};

  return values;
};

const paymentQuarterly = [
  {
    paymentDate: 'Due 03/10/2017',
    amount: '$ 1,030'
  },
  {
    paymentDate: 'Due 06/08/2017',
    amount: '$ 498'
  },
  {
    paymentDate: 'Due 09/06/2017',
    amount: '$ 498'
  },
  {
    paymentDate: 'Due 12/05/2017',
    amount: '$ 498'
  }

];

const paymentSemi = [
  {
    paymentDate: 'Due 03/10/2017',
    amount: '$ 1,524'
  },
  {
    paymentDate: 'Due 09/06/2017',
    amount: '$ 993'
  }

];

const paymentAnnual = [
  {
    paymentDate: 'Due 03/10/2017',
    amount: '$ 2,501'
  }

];

export class MailingAddressBilling extends Component {

  componentDidMount() {
    const workflowId = this.props.appState.instanceId;
    const taskName = 'moveTo';
    const taskData = { key: 'mailing' };
    this.props.actions.cgActions.completeTask(this.props.appState.modelName, workflowId, taskName, taskData);
  }

  state = {
    showQuoteSummaryModal: false,
    sameAsProperty: false
  }

  fillMailForm = () => {
    const { appState, dispatch } = this.props;
    const taskData = this.props.tasks[appState.modelName].data;
    const quoteData = _.find(taskData.model.variables, { name: 'getQuote' }) ? _.find(taskData.model.variables, { name: 'getQuote' }).value.result : {};

    if (!this.state.sameAsProperty) {
      dispatch(change('MailingAddressBilling', 'address1', _.get(quoteData, 'property.physicalAddress.address1')));
      dispatch(change('MailingAddressBilling', 'address2', _.get(quoteData, 'property.physicalAddress.address2')));
      dispatch(change('MailingAddressBilling', 'city', _.get(quoteData, 'property.physicalAddress.city')));
      dispatch(change('MailingAddressBilling', 'state', _.get(quoteData, 'property.physicalAddress.state')));
      dispatch(change('MailingAddressBilling', 'zip', _.get(quoteData, 'property.physicalAddress.zip')));
    } else {
      dispatch(change('MailingAddressBilling', 'address1', ''));
      dispatch(change('MailingAddressBilling', 'address2', ''));
      dispatch(change('MailingAddressBilling', 'city', ''));
      dispatch(change('MailingAddressBilling', 'state', ''));
      dispatch(change('MailingAddressBilling', 'zip', ''));
    }
    this.setState({ sameAsProperty: !this.state.sameAsProperty });
  };


  handleFormSubmit = (data) => {
    const workflowId = this.props.appState.instanceId;

    const submitData = data;

    submitData.agency = String(data.agency);
    submitData.agent = String(data.agent);

    const steps = [{
      name: 'askAdditionalCustomerData',
      data: submitData
    }
    ];

    this.props.actions.cgActions.batchCompleteTask(this.props.appState.modelName, workflowId, steps)
      .then(() => {
        // now update the workflow details so the recalculated rate shows
        this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
          workflowId, { recalc: false, updateWorkflowDetails: true });
        this.context.router.history.push('/quote/congratulations');
      });
  };

  render() {
    const { fieldValues, handleSubmit } = this.props;

    return (
      <QuoteBaseConnect>
        <ClearErrorConnect />
        <div className="route-content">
          <Form id="MailingAddressBilling" onSubmit={handleSubmit(this.handleFormSubmit)} noValidate>
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h1>Mailing Address / Billing</h1>

                <section>
                  <h2>Mailing Address</h2>

                  <RadioField
                    name={'sameAsProperty'} label={'Is the mailing address the same as the property address?'} input={{
                      value: this.state.sameAsProperty,
                      name: 'sameAsProperty',
                      onChange: this.fillMailForm
                    }} segmented answers={[
                      {
                        answer: false,
                        label: 'No'
                      }, {
                        answer: true,
                        label: 'Yes'
                      }
                    ]}
                  />

                  <TextField validations={['required']} label={'Address 1'} styleName={''} name={'address1'} />

                  <TextField label={'Address 2'} styleName={''} name={'address2'} />

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
          { this.state.showQuoteSummaryModal && <QuoteSummaryModal /> }
        </div>
      </QuoteBaseConnect>
    );
  }

}

// ------------------------------------------------
// Property type definitions
// ------------------------------------------------
MailingAddressBilling.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
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
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'MailingAddressBilling' })(MailingAddressBilling));
