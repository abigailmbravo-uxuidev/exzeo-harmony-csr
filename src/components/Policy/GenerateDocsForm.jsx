import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment-timezone';
import { Select, Loader, Button, validation } from '@exzeo/core-ui';


const validate = values => (!values.documentType ? { documentType: 'Required' } : null);
const documentTypeAnswers = [{ label: 'Policy Invoice', answer: 'policyInvoice' }];

export class GenerateDocsForm extends Component {
  generateDoc = (data, dispatch, props) => {
    const {
      errorHandler, policyNumber, updateNotes, startWorkflow
    } = props;
    return startWorkflow('policyInvoiceGenerator', { documentNumber: policyNumber }, false)
      .then((result) => {
        if (window.location.pathname.includes('/notes')) updateNotes();
        const fileUrl = result.workflowData.policyInvoiceGenerator.data.previousTask.value.result[0].fileUrl;
        const proxyUrl = `${process.env.REACT_APP_API_URL}/download`;
        const params = { url: fileUrl };
        return axios.get(proxyUrl, { responseType: 'blob', params });
      })
      .then((res) => {
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
      .catch(err => errorHandler({ message: err.message }));
  };

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
            answers={documentTypeAnswers}
            validate={validation.isRequired}
            dataTest="documentType" />

          <Button
            baseClass="primary"
            size="small"
            customClass="btn-block"
            type="submit"
            dataTest="doc-submit">Generate Doc
          </Button>
        </form>
      </div>
    );
  }
}

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
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(GenerateDocsForm);
