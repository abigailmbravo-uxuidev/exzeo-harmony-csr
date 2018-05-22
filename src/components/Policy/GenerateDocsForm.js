import React from 'react';
import axios from 'axios';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment-timezone'
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
import DateField from '../Form/inputs/DateField';
import Loader from '../Common/Loader';

export const reqConfig = data => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'blob',
  url: `${process.env.REACT_APP_API_URL}/generate-document`,
  data
});

const { Select } = Inputs;
const { validation } = lifecycle;

export class GenerateDocsForm extends React.Component {
  constructor(props) {
    super(props);

    this.fieldsWithDate = [];
    this.state = {
      showDate: false,
      isSubmitting: false
    };
  }

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
    const { policyNumber } = props;
    const req = reqConfig({
      documentNumber: policyNumber,
      documentType,
      effectiveDate
    });

    this.setState({ isSubmitting: true });
    axios(req)
    .then(res => {
      const blobUrl = window.URL.createObjectURL(res.data);
      const link = window.document.createElement('a');
      link.href = blobUrl;
      link.download = policyNumber;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.setState({ isSubmitting: false });
      return true;
    })
    .catch((error) => {
      this.setState({ isSubmitting: false });
    });
  }

  toggleDate = (event, value) => this.setState({ showDate: value && this.fieldsWithDate.includes(value) });

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        {this.state.isSubmitting && <Loader />}
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

export default reduxForm({
  form: 'GenerateDocsForm',
  initialValues:{
    documentType: 'policyInvoice',
    effectiveDate: moment.utc().format('YYYY-MM-DD')
  },
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(GenerateDocsForm)
