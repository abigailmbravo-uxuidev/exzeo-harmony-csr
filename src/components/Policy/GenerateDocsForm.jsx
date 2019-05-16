import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { http } from '@exzeo/core-ui';
import { Select, Loader, Button, Form, Field, validation } from '@exzeo/core-ui';

const validate = values => (!values.documentType ? { documentType: 'Required' } : null);
const documentTypeAnswers = [
  { label: 'Full Policy Packet', answer: 'generateFullPolicyPacket' },
  { label: 'Dec Page', answer: 'generateDecPage' },
  { label: 'Policy Invoice', answer: 'policyInvoiceGenerator' }
];

export class GenerateDocsForm extends Component {
  generateDoc = (values) => {
    const {
      errorHandler, policyNumber, policyID, updateNotes, startWorkflow
    } = this.props;
    const model = values.documentType;

    return startWorkflow(model, { policyNumber, policyID }, false)
      .then((result) => {
        if (window.location.pathname.includes('/notes')) updateNotes();
        if (!result.workflowData || !result.workflowData[model] || !result.workflowData[model].data) {
          const documentName = documentTypeAnswers.find(doc => doc.answer === values.documentType).label;
          errorHandler({ message: `There was an error generating the ${documentName}` });
        }
        const fileUrl = result.workflowData[model].data.previousTask.value.result[0].fileUrl;
        const proxyUrl = `${process.env.REACT_APP_API_URL}/download`;
        const params = { url: fileUrl };
        return http.get(proxyUrl, { responseType: 'blob', params });
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
        <Form
          onSubmit={this.generateDoc}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              {submitting && <Loader />}
              <Field
                name="documentType"
                label="Document"
                component={Select}
                answers={documentTypeAnswers}
                validate={validation.isRequired}
                dataTest="documentType" />

              <Button
                className={Button.constants.classNames.primary}
                size={Button.constants.sizes.small}
                customClass="btn-block"
                type="submit"
                dataTest="doc-submit">Generate Doc
              </Button>
            </form>
          )}
        />
      </div>
    );
  }
}

GenerateDocsForm.propTypes = {
  policyNumber: PropTypes.string.isRequired,
  policyID: PropTypes.string.isRequired,
  updateNotes: PropTypes.func.isRequired,
  startWorkflow: PropTypes.func.isRequired,
  errorHandler: PropTypes.func.isRequired
};

export default GenerateDocsForm;
