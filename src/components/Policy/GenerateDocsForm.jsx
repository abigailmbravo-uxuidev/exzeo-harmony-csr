import React , { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment-timezone'
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
import DateField from '../Form/inputs/DateField';
import Loader from '../Common/Loader';

const { Select } = Inputs;
const { validation } = lifecycle;
const validate = values => !values.documentType ? { documentType: 'Required' } : null;

export class GenerateDocsForm extends Component {
  state = {
    showDate: false
  };

  fieldsWithDate = []

  reqConfig = data => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'blob',
    url: `${process.env.REACT_APP_API_URL}/generate-document`,
    data
  })

  generateDoc = (data, dispatch, props) => {
    const { documentType, effectiveDate } = data;
    const { errorHandler, policyNumber, updateNotes, startWorkflow } = props;
    const req = this.reqConfig({
      documentNumber: policyNumber,
      documentType,
      effectiveDate
    });

    return startWorkflow('policyInvoiceGenerator', { documentNumber: policyNumber }, false)
      .then(result => {
        if (window.location.pathname === '/policy/notes') updateNotes();
        const fileUrl = result.workflowData.policyInvoiceGenerator.data.previousTask.value.result[0].fileUrl;
        const fileName = result.workflowData.policyInvoiceGenerator.data.previousTask.value.result[0].fileName;
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
        const error = err.response ? err.response.statusText : err;
        return errorHandler({ message: error });
      });

    /*
    return axios(req)
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
      this.setState({ isSubmitting: false });
      if (window.location.pathname === '/policy/notes') updateNotes();
      return true;
    })
    .catch((err) => {
      const error = err.response ? err.response.statusText : err;
      return errorHandler({ message: error });
    });
    */
  }

  toggleDate = (event, value) => this.setState({ showDate: value && this.fieldsWithDate.includes(value) })

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
