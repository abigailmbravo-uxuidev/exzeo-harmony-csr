import React from 'react';
import axios from 'axios';

export const reqConfig = data => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  url: `${process.env.REACT_APP_API_URL}/generate-document`,
  data
});

export const onSubmit = id => ev => {
  ev.preventDefault();
  const documentType = ev.target.elements.docType.value;
  const effectiveDate = ev.target.elements.effectiveDate.value;
  const form = reqConfig({ 
    id,
    documentType,
    effectiveDate 
  });
  console.log(form);    

  /*axios.post(req)
  .then(res => {
    console.log(res)
  })
  .catch((error) => {
    console.log(error)
  });*/
};

const GenerateDocsForm = (props) => (
  <form onSubmit={onSubmit(props.policy.policyNumber)}>
    <div>policy: {props.policy.policyNumber}</div>
    <select name="docType">
      <option value="policyInvoice">Policy Invoice</option>
    </select>
    <label>Date: <input name="effectiveDate" type="text" /></label>
    <button type="submit">Submit</button>
  </form>
);

export default GenerateDocsForm;