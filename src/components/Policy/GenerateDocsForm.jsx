import React , { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment-timezone';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
import Loader from '@exzeo/core-ui/lib/Loader';
import DateField from '../Form/inputs/DateField';

const { Select } = Inputs;
const { validation } = lifecycle;
const validate = values => !values.documentType ? { documentType: 'Required' } : null;

export class GenerateDocsForm extends Component {
  state = {
    showDate: false
  };

  fieldsWithDate = [];

  generateDoc = (data, dispatch, props) => {
    const { errorHandler, policyNumber, updateNotes, startWorkflow } = props;
    return startWorkflow('policyInvoiceGenerator', { documentNumber: policyNumber }, false)
      .then(result => {
        if (window.location.pathname === '/policy/notes') updateNotes();
        const fileUrl = result.workflowData.policyInvoiceGenerator.data.previousTask.value.result[0].fileUrl;
        const proxyUrl = `${process.env.REACT_APP_API_URL}/download`;
        const params = { url: fileUrl };
        return axios.get(proxyUrl, { responseType: 'blob', params });
      })
      .then(res => {
        const contentDisposition = res.headers['content-disposition'];
        const filename = contentDisposition.match(/filename="(.+)"/)[1] || policyNumber;
        const blobUrl = window.URL.createObjectURL(res.data);
        const link = window.document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return true;
      })
      .catch((err) => {
        return errorHandler({ message: err.message });
      });
  }

  toggleDate = (_, value) => this.setState({ showDate: value && this.fieldsWithDate.includes(value) })

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="fade-in">
        {submitting && <Loader />}
        <form onSubmit={handleSubmit(this.generateDoc)}>
          <Field
            name="documentType"
            label="Document"
            component={Select}
            answers={[{label: 'Policy Invoice', answer: 'policyInvoice'}]}
            validate={validation.isRequired}
            onChange={this.toggleDate}
          />
          {this.state.showDate &&
            <DateField
              validations={['date']}
              label="Effective Date"
              name="effectiveDate"
            />
          }
          <button type="submit" className="btn btn-sm btn-primary btn-block">Generate Doc</button>
        </form>
      </div>
    );
  }
};

GenerateDocsForm.propTypes = {
  policyNumber: PropTypes.string.isRequired,
  updateNotes: PropTypes.func.isRequired,
  startWorkflow: PropTypes.func.isRequired,
  errorHandler: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'GenerateDocsForm',
  initialValues: {
    effectiveDate: moment.utc().format('YYYY-MM-DD')
  },
  validate: validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(GenerateDocsForm)
