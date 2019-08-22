import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  http,
  Select,
  Loader,
  Button,
  Form,
  Field,
  validation
} from '@exzeo/core-ui';
import { callService } from '@exzeo/core-ui/src/@Harmony';

const validate = values =>
  !values.documentType ? { documentType: 'Required' } : null;

const documentTypeAnswers = [
  { label: 'Full Policy Packet', answer: 'fullPolicyPacket' },
  { label: 'Dec Page', answer: 'decPage' },
  { label: 'Policy Invoice', answer: 'invoice' }
];

const customTransactionTypes = ['invoice', 'decPage'];

export class GenerateDocsForm extends Component {
  generateDoc = async values => {
    const {
      policy: { companyCode, state, product, policyID },
      updateNotes,
      errorHandler
    } = this.props;

    const transactionType = customTransactionTypes.includes(values.documentType)
      ? values.documentType
      : undefined;
    const packetName = values.documentType;

    const config = {
      exchangeName: 'harmony',
      routingKey: 'harmony.documents.getDocumentPacketFiles',
      data: {
        packetName,
        companyCode,
        state,
        product,
        args: {
          policyTransactionId: policyID,
          ...(transactionType && { transactionType })
        }
      }
    };

    try {
      // Create the file
      const {
        data: { result }
      } = await callService(config, 'getDocumentPacketFiles');
      if (window.location.pathname.includes('/notes')) updateNotes();
      const { fileName, fileUrl } = result[0];

      // GET the file
      const res = await http.get(`${process.env.REACT_APP_API_URL}/download`, {
        responseType: 'blob',
        params: { url: fileUrl }
      });

      // Download the BLOB
      const blobUrl = window.URL.createObjectURL(res.data);
      const link = window.document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      errorHandler({
        message: `There was an error generating the ${packetName}`
      });
    }
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
                dataTest="documentType"
              />

              <Button
                className={Button.constants.classNames.primary}
                size={Button.constants.sizes.small}
                customClass="btn-block"
                type="submit"
                dataTest="doc-submit"
              >
                Generate Doc
              </Button>
            </form>
          )}
        />
      </div>
    );
  }
}

GenerateDocsForm.propTypes = {
  policy: PropTypes.object.isRequired,
  updateNotes: PropTypes.func.isRequired,
  errorHandler: PropTypes.func.isRequired
};

export default GenerateDocsForm;
