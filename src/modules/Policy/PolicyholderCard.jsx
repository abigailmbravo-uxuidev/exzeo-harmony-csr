import React from 'react';
import { normalize } from '@exzeo/core-ui';

import ContactAddress from '../../components/ContactAddress';

function PolicyholderCard({
  label,
  policyHolder,
  policyHolderMailingAddress,
  mailToSubject
}) {
  return (
    <div className="primary-policyholder contact card">
      <div className="contact-title">
        <i className="fa fa-address-card-o" />
        <label>{label}</label>
      </div>
      <div className="contact-details">
        <h4>{`${policyHolder.firstName} ${policyHolder.lastName}`}</h4>
        <ContactAddress mailingAddress={policyHolderMailingAddress} />
        <div className="additional-contacts">
          <ul>
            <li>
              <div className="contact-methods">
                <p className="primary-phone">
                  <i className="fa fa-phone-square" />
                  <a href={`tel: ${policyHolder.primaryPhoneNumber}`}>
                    {normalize.phone(policyHolder.primaryPhoneNumber)}
                  </a>
                </p>
                {policyHolder.secondaryPhoneNumber && (
                  <p className="secondary-phone">
                    <small>
                      2<sup>ND</sup>
                      <i className="fa fa-phone" />
                    </small>
                    <a href={`tel: ${policyHolder.secondaryPhoneNumber}`}>
                      {normalize.phone(policyHolder.secondaryPhoneNumber)}
                    </a>
                  </p>
                )}
                <p className="email">
                  <i className="fa fa-envelope" />
                  <a
                    href={`mailto: ${policyHolder.emailAddress}?subject=${mailToSubject}`}
                  >
                    {policyHolder.emailAddress}
                  </a>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="electronic-delivery">
        <label>Electronic Delivery: </label>{' '}
        {policyHolder.electronicDelivery ? 'Yes' : 'No'}
      </div>
    </div>
  );
}

export default PolicyholderCard;
