import React from 'react';

const QuoteSummaryModal = () =>
  <div className="modal quote-summary">
    <div className="card">

      <div className="card-header"><h4><i className="fa fa-envelope" /> Send Application</h4>
         </div>
         <div className="card-block">
           <h3>Congratulations</h3>
           <p>You have completed the required information for the online Homeowners Quoting
             Process.</p>
           <p>Are you ready to send e-mail Application out for policyholder signature(s) to bind
             the policy?</p>
           <p>All signatures must be complete within 10 days, or application will expire. Once you
             select this , no changes to the application can be made. </p>
         </div>


      <div className="card-footer">

        <div className="btn-footer">

            <button className="btn btn-primary" type="submit">
                Close
            </button>
        </div>

      </div>

    </div>


  </div>

export default QuoteSummaryModal;
