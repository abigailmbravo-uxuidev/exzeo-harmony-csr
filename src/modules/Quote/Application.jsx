import React from 'react'

const Application = ({ initialValues }) => {
  return (
    <div className="detail-wrapper">
    {Array.isArray(initialValues.underwritingExceptions) &&
     initialValues.underwritingExceptions.filter(uw => !uw.overridden).length > 0 &&
      <div className="messages" >
        <div className="message error">
          <i className="fa fa-exclamation-circle" aria-hidden="true" />&nbsp;Application cannot be sent due to Underwriting Validations.
        </div>
      </div>
    }
   </div>
  )
};

export default Application;
