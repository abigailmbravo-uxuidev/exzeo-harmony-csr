import React from 'react';
import Footer from '../Common/Footer';

const ThankYou = () => (
<div className="route-content">
    <div id="thanks">
        <div className="scroll">
            <div className="detail-wrapper form-group" role="article">
                <div className="detail-group">
                    <h3 className="section-group-header"><i className="fa fa-smile-o" /> Congrats!</h3>
                    <h4 className="error-message">You have completed the online application for a TypTap Homeowners Policy.</h4>
                    <p>
                        Thanks for choosing TypTap. We have sent your client all required documents to sign electronically. Once we receive their signature, we will notify you via email.
                    </p>
                    <ul>
                        <li>
                            Policyholder 1 will be receiving an e-mail (to the e-mail address you provided), containing the insurance application. Once policyholder 1 has signed the application, it will then be routed to any other additional policyholders for their signature.
                        </li>
                        <li>A copy of the application will also be sent to your email address (the one we have on file for you).</li>
                        <li>Once all policyholders have signed, the policy will be issued.</li>
                        <li>
                            <strong>Signatures on the application must be complete within 10 days to create the policy</strong>
                            , otherwise the application will expire, and you will be required to complete a new application.
                        </li>
                        <li>
                            A copy of the policy, and required documents will then be e-mailed to the primary insured. A copy of the Dec page and invoice will also be e-mailed to you.
                        </li>
                    </ul>
                    <p>Thank you for your business! If you have any questions or concerns, please contact us.</p>
                </div>
            </div>
            <div className="workflow-steps">
                <a href="../" className="btn btn-primary">Return to Dashboard</a>
            </div>
            <Footer />
        </div>
    </div>
</div>
);

export default ThankYou;
